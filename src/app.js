const { app, BrowserWindow } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {

  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, '/html/index.html'));

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle settings read write
const filesystem = require('fs');
const settingsPath = path.join(__dirname, '/settings.json');

const readSettings = () => {
  try {
    return JSON.parse(filesystem.readFileSync(settingsPath));
  } catch (error) {
    return {};
  }
}

const writeSettings = (settings) => {
  filesystem.writeFileSync(settingsPath, JSON.stringify(settings));
}

// Handle settings
const settings = readSettings();
const settingsWindow = new BrowserWindow({
  width: 1280,
  height: 720,
  autoHideMenuBar: true,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
  },
  show: false,
});

settingsWindow.loadFile(path.join(__dirname, '/html/settings.html'));