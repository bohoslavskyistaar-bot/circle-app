# Native installer notes

This repository currently builds portable packages without external dependencies.

Generated locally on Windows:

- `ChordCircle-Windows.exe`: self-extracting Windows launcher package.
- `ChordCircle-Windows-Portable.zip`: portable Windows folder.
- `ChordCircle-Linux.tar.gz`: portable Linux tarball.
- `ChordCircle-macOS.tar.gz`: portable macOS tarball.

For true native installers, use Tauri 2 after installing the required toolchains:

- Windows: `.msi` / `.exe`
- Linux: `.AppImage`, `.deb`, `.rpm`, or `.tar.gz`
- macOS: `.dmg` or `.app`
- Android: `.apk` or `.aab`
- iOS: `.ipa` through Xcode/App Store tooling

Required toolchains:

- Node.js and npm
- Rust and Cargo
- Tauri CLI
- Windows build tools for Windows bundles
- Xcode on macOS for `.dmg`, `.app`, and iOS
- Android Studio, Android SDK, Java, and signing keys for Android `.apk` / `.aab`

Suggested next commands after installing the toolchains:

```bash
npm install
npm create tauri-app@latest
npm run tauri build
npm run tauri android build
```

Do not ship an Android `.apk` without a proper signing key.
