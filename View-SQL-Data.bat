@echo off
title View Glory of the Past SQL Database Data
color 0B
:menu
cls
echo ========================================================
echo   GLORY OF THE PAST - SQL SERVER DATABASE VIEWER
echo ========================================================
echo Database: HistoricalExplorerDb (Server: localhost\SQLEXPRESS)
echo.
echo [1] View Historical Events (HistoricalEvents)
echo [2] View Historical Personalities (HistoricalPersons)
echo [3] View Historical Places & Forts (HistoricalPlaces)
echo [4] View Quiz Questions & Answers (QuizQuestions)
echo [5] View All Categories (Categories)
echo [6] View Registered Users (AspNetUsers)
echo [7] Open SQL Server Management Studio (SSMS GUI)
echo [8] Exit
echo.
set /p opt="Select an option (1-8): "

if "%opt%"=="1" (
    cls
    echo --- HISTORICAL EVENTS (TOP 10) ---
    echo.
    sqlcmd -S "localhost\SQLEXPRESS" -d "HistoricalExplorerDb" -E -C -Q "SET NOCOUNT ON; SELECT Id, Title, Year, Location FROM HistoricalEvents;"
    echo.
    pause
    goto menu
)
if "%opt%"=="2" (
    cls
    echo --- HISTORICAL PERSONALITIES ---
    echo.
    sqlcmd -S "localhost\SQLEXPRESS" -d "HistoricalExplorerDb" -E -C -Q "SET NOCOUNT ON; SELECT Id, Name, Title, Era, Nationality FROM HistoricalPersons;"
    echo.
    pause
    goto menu
)
if "%opt%"=="3" (
    cls
    echo --- HISTORICAL PLACES & FORTS ---
    echo.
    sqlcmd -S "localhost\SQLEXPRESS" -d "HistoricalExplorerDb" -E -C -Q "SET NOCOUNT ON; SELECT Id, Name, ArchitecturalStyle, BuiltYear, Location FROM HistoricalPlaces;"
    echo.
    pause
    goto menu
)
if "%opt%"=="4" (
    cls
    echo --- QUIZ QUESTIONS ---
    echo.
    sqlcmd -S "localhost\SQLEXPRESS" -d "HistoricalExplorerDb" -E -C -Q "SET NOCOUNT ON; SELECT Id, QuestionText, QuizCategoryId, Points FROM QuizQuestions;"
    echo.
    pause
    goto menu
)
if "%opt%"=="5" (
    cls
    echo --- CATEGORIES ---
    echo.
    sqlcmd -S "localhost\SQLEXPRESS" -d "HistoricalExplorerDb" -E -C -Q "SET NOCOUNT ON; SELECT Id, Name, Description FROM Categories;"
    echo.
    pause
    goto menu
)
if "%opt%"=="6" (
    cls
    echo --- REGISTERED USERS ---
    echo.
    sqlcmd -S "localhost\SQLEXPRESS" -d "HistoricalExplorerDb" -E -C -Q "SET NOCOUNT ON; SELECT Id, UserName, Email FROM AspNetUsers;"
    echo.
    pause
    goto menu
)
if "%opt%"=="7" (
    echo.
    echo Opening SQL Server Management Studio (SSMS)...
    start "" "C:\Program Files\Microsoft SQL Server Management Studio 22\Release\Common7\IDE\SSMS.exe"
    pause
    goto menu
)
if "%opt%"=="8" exit /b
goto menu
