
const {app, BrowserWindow, globalShortcut} = require('electron')

let win

function createWindow () {
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 500

    })

    win.loadURL('file://' + __dirname + '/index.html')
    // import globalShortcut in line 2
    globalShortcut.register('CmdOrCtrl+Shift+d', ()=> {
        win.webContents.toggleDevTools()
    });
    win.on('closed', () => {
        win = null
    })
}
app.on('will-quit', () => {
   globalShortcut.unregisterAll()
})

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
