from django.db import models
from uuid import uuid4
from django.utils.timezone import now
from django.core.exceptions import ValidationError
from PIL import Image


class ApplicationModelSetup:
    ICON_WIDTH = 64
    ICON_HEIGHT = 64
    PREVIEW_IMAGE_SIZE_LIMIT = 500  # KB

    @staticmethod
    def icon_path(instance, filename):
        return "application/icons/%s.%s" % (uuid4().hex, filename.split(".")[-1])

    @staticmethod
    def icon_dimension_validator(image):
        width = ApplicationModelSetup.ICON_WIDTH
        height = ApplicationModelSetup.ICON_HEIGHT

        im = Image.open(image)
        (im_width, im_height) = im.size

        if im_width != width and im_height != height:
            raise ValidationError("Image should be \"%d X %d\"" % (width, height))

    @staticmethod
    def preview_image_path(instance, filename):
        return "application/preview_images/%s.%s" % (uuid4().hex, filename.split(".")[-1])

    @staticmethod
    def preview_image_size_validator(image):
        size = ApplicationModelSetup.PREVIEW_IMAGE_SIZE_LIMIT * 1024

        if image.file.size > size:
            raise ValidationError("Preview image must be smaller than %d byte" % size)


class ApplicationModel(models.Model):
    app_id = models.CharField(max_length=50, default=uuid4, editable=False, unique=True, verbose_name="앱 번호")

    name = models.CharField(max_length=50, unique=True, verbose_name="이름")

    description = models.TextField(verbose_name="설명")

    url = models.CharField(max_length=200, unique=True, verbose_name="앱 주소")

    icon = models.ImageField(default=None, null=True, verbose_name="아이콘 경로",
                             upload_to=ApplicationModelSetup.icon_path,
                             validators=[ApplicationModelSetup.icon_dimension_validator])

    preview_image = models.ImageField(default=None, null=True, blank=True, verbose_name="미리보기 경로",
                                      upload_to=ApplicationModelSetup.preview_image_path,
                                      validators=[ApplicationModelSetup.preview_image_size_validator])

    public_option = models.BooleanField(default=False, verbose_name="공개 여부")
    publish_date = models.DateTimeField(default=now, verbose_name="배포 날짜")

    class Meta:
        db_table = "application"
        verbose_name = "어플리케이션"
        verbose_name_plural = "어플리케이션들"
        indexes = [
            models.Index(fields=["app_id"]),
        ]

    def __str__(self):
        return "%s [%s] ( %s )" % (self.name, self.app_id, self.url)

    @property
    def icon_url(self):
        try:
            return self.icon.url
        except ValueError:
            return None

    @property
    def preview_image_url(self):
        try:
            return self.preview_image.url
        except ValueError:
            return None
