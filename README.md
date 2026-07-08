#Circle of Chords
First MVP of an interactive circle of chords.

##Features
- SVG circle of fifths with major, minor, and diminished chords.
- Chord popup on sector click.
- MIDI keyboard key highlighting.
- Chord playback via Web Audio.
- Responsive UI for desktop and small screens.

##Running
Without a server: open index.html in your browser.

With a local server:

```bash
npm run start
```
If PowerShell blocks npm, run:

```powershell
npm.cmd run start
```
Then open http://localhost:4173.

##Next step for desktop
This web base can be wrapped with Tauri 2, allowing the same UI to run on Windows, Linux, and macOS, and later serve as a base for Android and iOS. This will require adding a Tauri project, app icons, app naming, build signing, and CI pipelines.

