const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'app', 'icon.png'), // за бажанням, можна прибрати рядок
    autoHideMenuBar: true, // ховає стандартне меню File/Edit/View
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Шлях до вашого index.html всередині папки app/
  win.loadFile(path.join(__dirname, 'app', 'index.html'));

  // Розкоментуйте для дебагу під час розробки:
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
