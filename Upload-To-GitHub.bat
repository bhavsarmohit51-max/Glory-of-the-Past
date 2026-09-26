@echo off
title Upload Glory of the Past to GitHub
color 0A
echo =======================================================
echo    GLORY OF THE PAST - 1-CLICK GITHUB UPLOADER
echo =======================================================
echo.
echo Is script ke zariye aapka All-In-One single folder
echo 100% direct GitHub par push ho jayega!
echo.
set /p REPO_URL="Apna GitHub Repo URL paste karein (e.g. https://github.com/username/repo.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] Koi URL enter nahi kiya gaya! Dobara run karein.
    pause
    exit /b
)

echo.
echo [1/2] Connecting remote origin...
"C:\Users\bhavs\.gemini\antigravity\scratch\git\cmd\git.exe" -C "C:\Users\bhavs\OneDrive\Desktop\GloryOfThePast-AllInOne" remote remove origin 2>nul
"C:\Users\bhavs\.gemini\antigravity\scratch\git\cmd\git.exe" -C "C:\Users\bhavs\OneDrive\Desktop\GloryOfThePast-AllInOne" remote add origin %REPO_URL%

echo [2/2] Pushing all files to GitHub (main branch)...
"C:\Users\bhavs\.gemini\antigravity\scratch\git\cmd\git.exe" -C "C:\Users\bhavs\OneDrive\Desktop\GloryOfThePast-AllInOne" push -u origin main --force

if %errorlevel% equ 0 (
    echo.
    echo =======================================================
    echo  [SUCCESS] Saari files safely GitHub par upload ho gayi!
    echo =======================================================
    echo.
    echo Ab Vercel automatically 30 seconds me live update kar dega!
) else (
    echo.
    echo [INFO] Agar push fail hua, URL check karein aur browser me GitHub authorize karein.
)
echo.
pause
