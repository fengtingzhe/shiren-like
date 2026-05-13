@echo off
setlocal

cd /d "%~dp0.."

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or not in PATH.
  pause
  exit /b 1
)

where npx >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npx is not available. Install Node.js with npm/npx support.
  pause
  exit /b 1
)

echo Starting Vite dev server for shiren-like Web Demo...
echo Target page: http://127.0.0.1:5173/Builds/web-demo/
echo.
echo If this is the first run, npx may download Vite before the server starts.
echo Press Ctrl+C to stop the server.
echo.

npx --yes vite . --host 127.0.0.1 --port 5173 --open /Builds/web-demo/
