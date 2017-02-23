@echo OFF

call start4.bat
cd %~dp0\FTC-Live-Scoring\src\
reg Query "HKLM\Hardware\Description\System\CentralProcessor\0" | find /i "x86" > NUL && set OS=32BIT || set OS=64BIT

start "" http://localhost:4444

if %OS%==32BIT (node32.exe index4.js)
if %OS%==64BIT (node64.exe index4.js)

node32.exe index3.js