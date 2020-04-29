const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        titleBarStyle: 'hidden'
    })

    // and load the index.html of the app.
    win.loadFile('index.html')
    win.removeMenu();
    // Open the DevTools.
    win.webContents.openDevTools();
    //Set and create app folder
    global.appFolder = app.getPath('userData');
    if (!fs.existsSync(global.appFolder)) {
        fs.mkdirSync(global.appFolder);
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
