echo off
set bdir=..\blijs\libjsprod\

echo .
echo ------------------
echo update playground:
echo ==================
xcopy ..\mini_basic\playground\web\*.* .\mini_basic\pg\ /i /y /s

pause