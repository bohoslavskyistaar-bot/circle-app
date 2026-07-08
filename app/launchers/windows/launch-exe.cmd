@echo off
setlocal
set "EXTRACT_DIR=%TEMP%\ChordCircle"
if not exist "%EXTRACT_DIR%" mkdir "%EXTRACT_DIR%"
powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '%~dp0app.zip' -DestinationPath '%EXTRACT_DIR%' -Force"
start "" "%EXTRACT_DIR%\index.html"
endlocal
