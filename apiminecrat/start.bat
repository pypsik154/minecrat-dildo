@echo off

echo Запуск Minecraft сервера...
start "Minecraft" "C:\xeno\minecraft\minecrat.bat"

echo Запуск логов...
start "Логи" "C:\xeno\minecraft\log.bat"

echo Запуск API...
start "API" "C:\xeno\minecraft\api.bat"

echo Запуск сайта...

cd C:\xeno\webminecraft

start "Сайт" "C:\xeno\webminecraft\start.bat"

echo Всё запущено!
pause