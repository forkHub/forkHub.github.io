echo off
set bdir=..\blijs\js\

echo .
echo -----------
echo update lib:
echo ===========
xcopy %bdir%*.js js\ /i /y
xcopy %bdir%*.d.ts dts /i /y

echo .
echo ------------------
echo update playground:
echo ==================
xcopy ..\blijs\playground\web\*.* .\pg\ /i /y /s
xcopy ..\blijs\js\*.* .\pg\js\ /i /y /s
xcopy ..\halib\web\libjs\*.* .\pg\js

echo .
echo ----------------
echo update template:
echo ================
xcopy ..\blijs\template .\template /i /y /s
cd template
call 7z a javacript.zip javascript\
call 7z a typescript.zip typescript\
cd ..

pause