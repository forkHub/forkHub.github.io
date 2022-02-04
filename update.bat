echo off
set bdir=..\blijs\libjsprod\

echo -----------
echo update lib:
echo ===========
xcopy %bdir%*.js js\ /i /y
xcopy %bdir%*.d.ts dts /i /y

echo ------------
echo update demo:
echo ============
xcopy ..\blijs\demo\collision\web\*.* .\demo\collision /i /y /s
xcopy ..\blijs\demo\tile\web\*.* .\demo\tile /i /y /s
xcopy ..\blijs\demo\snow\web\*.* .\demo\snow /i /y /s
xcopy ..\blijs\demo\expl\web\*.* .\demo\expl /i /y /s

echo ------------------
echo update playground:
echo ==================
xcopy ..\blijs\playground\web\*.* .\pg\ /i /y /s
xcopy ..\blijs\libjsprod\*.* .\pg\js\ /i /y /s
copy ..\halib\web\libjs\*.* .\pg\js

pause