import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {}

// Electron APIs
const electronAPI = {
  ipcRenderer: {
    send: (channel: string, ...args: any[]) =>
      ipcRenderer.send(channel, ...args),
    on: (channel: string, listener: (...args: any[]) => void) =>
      ipcRenderer.on(channel, listener),
    once: (channel: string, listener: (...args: any[]) => void) =>
      ipcRenderer.once(channel, listener),
    removeListener: (channel: string, listener: (...args: any[]) => void) =>
      ipcRenderer.removeListener(channel, listener),
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
