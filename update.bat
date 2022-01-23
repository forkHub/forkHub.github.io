echo on
set bdir=..\blijs\libjsprod\

xcopy %bdir%*.js js\ /i /y
xcopy %bdir%*.d.ts dts /i /y

call tsc -p .\tsconfig.json

pause
pause