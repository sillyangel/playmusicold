const { app, BrowserWindow, Tray, nativeImage, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 680,
    icon: './icons/icon.png',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname, 'preload.js'),
    }
})



  mainWindow.setThumbarButtons([
    {
      tooltip: 'play',
      icon: nativeImage.createFromPath('./icons/play-solid.svg'),
      click () { console.log('play') }
    },
    {
      tooltip: 'pause',
      icon: nativeImage.createFromPath('./icons/pause-solid.svg'),
      flags: ['enabled', 'dismissonclick'],
      click () { console.log('pause') }
    },
    {
      tooltip: 'next',
      icon: nativeImage.createFromPath('./icons/forward-step-solid.svg'),
      click () { console.log('next') }
    },
    {
      tooltip: 'prev',
      icon: nativeImage.createFromPath('./icons/backward-step-solid.svg'),
      click () { console.log('prev') }
    }
  ]);
}

let tray;

app.whenReady().then(() => {
  createWindow();
  const icon = nativeImage.createFromPath('./icons/icon.png')
  tray = new Tray(icon)
  tray.setToolTip('this tray icon does nothing but, show up when app is open')
  tray.setTitle('music player')

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

});
