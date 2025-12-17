import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
// import { electronApp, optimizer, is } from '@electron-toolkit/utils'

// 手动实现is检查，避免版本兼容性问题
const is = {
  dev: process.env.NODE_ENV === 'development' || !process.env.ELECTRON_IS_PROD,
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // const mainWindow = new BaseWindow({ width: 800, height: 400 })
  // for (let index = 0; index < 4; index++) {
  //   const view = new WebContentsView()
  //   mainWindow.contentView.addChildView(view)
  //   view.webContents.loadURL('https://electronjs.org')
  //   view.setBounds({ x: 400 * index, y: 0, width: 400, height: 400 })
  // }

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows (Windows only)
  if (process.platform === 'win32') {
    app.setAppUserModelId('com.electron')
  }

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    // 开发环境下允许快捷键
    if (is.dev) {
      window.webContents.on('before-input-event', (_, input) => {
        if (input.key === 'F12') {
          window.webContents.toggleDevTools()
        }
        if (input.control && input.key === 'r') {
          window.webContents.reload()
        }
      })
    }
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
