@ECHO off
SET VENV_PATH=/home/seiren87/jellicleSpace.venv
SET SERVER_PATH=server

IF "%1%"=="init" GOTO INIT
IF "%1%"=="manage" GOTO MANAGE
IF "%1%"=="pip" GOTO PIP
IF "%1%"=="startapp" GOTO START_APP
IF "%1%"=="test" GOTO TEST

ECHO init                    : making directories (assets[\dist], media, static)
ECHO manage [instruction]    : python server/manage.py [instruction]
ECHO pip [instruction] [...] : pip instruction
ECHO startapp [name]         : making initial server app

GOTO EOF

: INIT
    if NOT EXIST assets (
        mkdir assets
        mkdir assets\dist
        ECHO 'assets','assets\dist' are made ...
    )

    if NOT EXIST media (
        mkdir media
        ECHO 'media' is made ...
    )

    if NOT EXIST static (
        mkdir static
        ECHO 'static' is made ...
    )

    GOTO EOF

: MANAGE
    SET ALL=%*
    CALL SET REST=%%ALL:*%1=%%

    wsl %VENV_PATH%/bin/python server/manage.py %REST%

    GOTO EOF

: PIP
    SET ALL=%*
    SET INST=%2
    CALL SET REST=%%ALL:*%1=%%

    wsl %VENV_PATH%/bin/pip %REST%

    IF "%INST%"=="install" GOTO PIP_FREEZE
    IF "%INST%"=="uninstall" GOTO PIP_FREEZE

: PIP_NEXT
    ECHO Complete ...
    GOTO EOF

: PIP_FREEZE
    ECHO Making requirements.txt ...
    wsl %VENV_PATH%/bin/pip freeze > requirements.txt

    GOTO PIP_NEXT

: START_APP
    ECHO Making server application on "%SERVER_PATH%"
    python -B init.py startapp %SERVER_PATH% %2

    IF "%ERRORLEVEL%"=="0" (
        ECHO Adding repository
        git add %SERVER_PATH%\%2%\.
    )

    ECHO Complete ...
    GOTO EOF

: TEST
    echo %*%

    set allargs=%*
    set arg1=%1
    CALL SET someargs=%%allargs:*%1=%%
    ECHO allargs  %allargs%
    ECHO arg1     %arg1%
    ECHO someargs %someargs%

    GOTO EOF

: EOF