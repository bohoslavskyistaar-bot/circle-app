$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$Dist = Join-Path $Root "dist"
$Build = Join-Path $Dist "build"
$Packages = Join-Path $Dist "packages"

New-Item -ItemType Directory -Force -Path $Build | Out-Null
New-Item -ItemType Directory -Force -Path $Packages | Out-Null

function Copy-AppFiles {
  param(
    [Parameter(Mandatory = $true)][string]$Destination,
    [Parameter(Mandatory = $true)][string]$LauncherSource,
    [Parameter(Mandatory = $true)][string]$LauncherName,
    [string]$ExtraSource,
    [string]$ExtraName
  )

  New-Item -ItemType Directory -Force -Path $Destination | Out-Null
  Copy-Item -LiteralPath (Join-Path $Root "index.html") -Destination $Destination -Force
  Copy-Item -LiteralPath (Join-Path $Root "src") -Destination $Destination -Recurse -Force
  Copy-Item -LiteralPath (Join-Path $Root "packaging\README-PACKAGE.txt") -Destination $Destination -Force
  Copy-Item -LiteralPath $LauncherSource -Destination (Join-Path $Destination $LauncherName) -Force

  if ($ExtraSource -and $ExtraName) {
    Copy-Item -LiteralPath $ExtraSource -Destination (Join-Path $Destination $ExtraName) -Force
  }
}

$WindowsDir = Join-Path $Build "ChordCircle-Windows"
$LinuxDir = Join-Path $Build "ChordCircle-Linux\chord-circle"
$MacDir = Join-Path $Build "ChordCircle-macOS\Chord Circle"

Copy-AppFiles `
  -Destination $WindowsDir `
  -LauncherSource (Join-Path $Root "launchers\windows\run-windows.cmd") `
  -LauncherName "run-windows.cmd"

Copy-AppFiles `
  -Destination $LinuxDir `
  -LauncherSource (Join-Path $Root "launchers\linux\run-linux.sh") `
  -LauncherName "run-linux.sh" `
  -ExtraSource (Join-Path $Root "launchers\linux\chord-circle.desktop") `
  -ExtraName "chord-circle.desktop"

Copy-AppFiles `
  -Destination $MacDir `
  -LauncherSource (Join-Path $Root "launchers\macos\Chord Circle.command") `
  -LauncherName "Chord Circle.command"

$WindowsZip = Join-Path $Packages "ChordCircle-Windows-Portable.zip"
$AppZip = Join-Path $Build "app.zip"
$LinuxTar = Join-Path $Packages "ChordCircle-Linux.tar.gz"
$MacTar = Join-Path $Packages "ChordCircle-macOS.tar.gz"
$ExePackage = Join-Path $Packages "ChordCircle-Windows.exe"

Compress-Archive -LiteralPath (Join-Path $WindowsDir "*") -DestinationPath $WindowsZip -Force
Compress-Archive -LiteralPath (Join-Path $WindowsDir "*") -DestinationPath $AppZip -Force

tar -czf $LinuxTar -C (Join-Path $Build "ChordCircle-Linux") "chord-circle"
tar -czf $MacTar -C (Join-Path $Build "ChordCircle-macOS") "Chord Circle"

$IExpress = Get-Command iexpress.exe -ErrorAction SilentlyContinue
if ($IExpress) {
  $IExpressDir = Join-Path $Build "iexpress"
  New-Item -ItemType Directory -Force -Path $IExpressDir | Out-Null
  Copy-Item -LiteralPath $AppZip -Destination (Join-Path $IExpressDir "app.zip") -Force
  Copy-Item -LiteralPath (Join-Path $Root "launchers\windows\launch-exe.cmd") -Destination (Join-Path $IExpressDir "launch-exe.cmd") -Force

  $SedPath = Join-Path $IExpressDir "ChordCircle.sed"
  $Sed = @"
[Version]
Class=IEXPRESS
SEDVersion=3
[Options]
PackagePurpose=InstallApp
ShowInstallProgramWindow=0
HideExtractAnimation=1
UseLongFileName=1
InsideCompressed=0
CAB_FixedSize=0
CAB_ResvCodeSigning=0
RebootMode=N
InstallPrompt=%InstallPrompt%
DisplayLicense=%DisplayLicense%
FinishMessage=%FinishMessage%
TargetName=%TargetName%
FriendlyName=%FriendlyName%
AppLaunched=%AppLaunched%
PostInstallCmd=%PostInstallCmd%
AdminQuietInstCmd=%AdminQuietInstCmd%
UserQuietInstCmd=%UserQuietInstCmd%
SourceFiles=SourceFiles
[Strings]
InstallPrompt=
DisplayLicense=
FinishMessage=
TargetName=$ExePackage
FriendlyName=Chord Circle
AppLaunched=launch-exe.cmd
PostInstallCmd=<None>
AdminQuietInstCmd=
UserQuietInstCmd=
FILE0="app.zip"
FILE1="launch-exe.cmd"
[SourceFiles]
SourceFiles0=$IExpressDir\
[SourceFiles0]
%FILE0%=
%FILE1%=
"@
  Set-Content -LiteralPath $SedPath -Value $Sed -Encoding ASCII
  & $IExpress.Source /N /Q $SedPath
}

Copy-Item -LiteralPath (Join-Path $Root "docs\BUILD_NATIVE_INSTALLERS.md") -Destination (Join-Path $Packages "BUILD_NATIVE_INSTALLERS.md") -Force

Get-ChildItem -LiteralPath $Packages | Select-Object Name,Length,LastWriteTime
