xcopy \code\pustaka\basik\demo\*.* .\basik /i /s /y
del basik\*.d.ts /s /q
del basik\*.ts /s /q
del basik\*.bat /s /q
del basik\tsconfig*.* /s /q
del basik\basik.js /s /q
copy \code\pustaka\basik\demo\lib\*.* .\basik\lib\*.*
pause
