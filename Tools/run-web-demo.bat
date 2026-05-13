@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
set "PROJECT_ROOT=%SCRIPT_DIR%.."

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Please install Node.js or add it to PATH.
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$root = (Resolve-Path '%PROJECT_ROOT%').Path; " ^
  "$port = 4173; " ^
  "while ((Test-NetConnection -ComputerName 127.0.0.1 -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue)) { $port++ } " ^
  "$args = @('Tools/web-demo-server.mjs', '.', [string]$port); " ^
  "Start-Process -FilePath 'node' -ArgumentList $args -WorkingDirectory $root -WindowStyle Hidden | Out-Null; " ^
  "$url = 'http://127.0.0.1:' + $port + '/Builds/web-demo/'; " ^
  "$ready = $false; " ^
  "for ($i = 0; $i -lt 30; $i++) { " ^
  "  try { Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 1 | Out-Null; $ready = $true; break } catch { Start-Sleep -Milliseconds 300 } " ^
  "} " ^
  "if ($ready) { Start-Process $url } else { Write-Host 'Server did not become ready:' $url; Read-Host 'Press Enter to exit' }"

endlocal
