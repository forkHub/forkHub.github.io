echo off
set bdir=..\blijs\libjsprod\

echo .
echo -----------
echo update lib:
echo ===========
xcopy %bdir%*.js js\ /i /y
xcopy %bdir%*.d.ts dts /i /y

echo .
echo ------------
echo update demo:
echo ============
xcopy ..\blijs\demo\collision\web\*.* .\demo\collision /i /y /s
xcopy ..\blijs\demo\tile\web\*.* .\demo\tile /i /y /s
xcopy ..\blijs\demo\snow\web\*.* .\demo\snow /i /y /s
xcopy ..\blijs\demo\expl\web\*.* .\demo\expl /i /y /s

echo .
echo ------------------
echo update playground:
echo ==================
xcopy ..\blijs\playground\web\*.* .\pg\ /i /y /s
xcopy ..\blijs\libjsprod\*.* .\pg\js\ /i /y /s
copy ..\halib\web\libjs\*.* .\pg\js

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