@echo off
title Clear Maker 3 - Launcher
chcp 65001 >nul
cd /d "%~dp0"

where python >nul 2>&1
if %errorlevel% neq 0 (
    echo [情報] Pythonが見つかりませんでした。通常のブラウザで開きます。
    start "" "index.html"
    exit /b
)

python launcher.py
