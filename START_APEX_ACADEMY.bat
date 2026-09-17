@echo off
title APEX FOOTBALL ACADEMY - PRODUCTION SERVER
color 0a
cls
echo ============================================================
echo   APEX FOOTBALL ACADEMY - S-TIER CMS & PAYMENT PLATFORM
echo ============================================================
echo [i] Membuka server lokal di http://localhost:3344 ...
echo [i] Admin CMS shortcut: Tekan tombol 'Admin CMS' di navbar atau buka /admin
echo ------------------------------------------------------------

start http://localhost:3344

python -m http.server 3344 --directory "dist"
pause
