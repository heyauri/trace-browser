import { app, BrowserWindow, Menu, globalShortcut } from 'electron';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url'
import log from 'electron-log';
import { Controller } from './lib/controller';

// 配置 electron-log
log.transports.file.level = 'info';
log.transports.console.level = 'debug';
log.transports.file.maxSize = 10 * 1024 * 1024; // 10MB

log.info('Application starting...');

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

const currentDir = fileURLToPath(new URL('.', import.meta.url));

let mainWindow: BrowserWindow | undefined;

async function init() {
    Menu.setApplicationMenu(null);
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        icon: path.resolve(currentDir, 'icons/icon.png'), // tray icon
        width: 1000,
        height: 600,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
            preload: path.resolve(
                currentDir,
                path.join(process.env.QUASAR_ELECTRON_PRELOAD_FOLDER, 'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION)
            ),
        },
    });

    if (process.env.DEV) {
        await mainWindow.loadURL(process.env.APP_URL);
    } else {
        await mainWindow.loadFile('index.html');
    }

    if (process.env.DEBUGGING) {
        // if on DEV or Production with debug enabled
        mainWindow.webContents.openDevTools();
    } else {
        // we're on production; no access to devtools pls
        mainWindow.webContents.on('devtools-opened', () => {
            mainWindow?.webContents.closeDevTools();
        });
    }

    mainWindow.on('closed', () => {
        mainWindow = undefined;
        app.quit();
    });

    let controller = new Controller(mainWindow);

    globalShortcut.register('CommandOrControl+Shift+I', () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools();
        } else if (mainWindow) {
            mainWindow.webContents.toggleDevTools();
        }
    });

}

void app.whenReady().then(init);

app.on('window-all-closed', () => {
    globalShortcut.unregisterAll();
    if (platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === undefined) {
        void init();
    }
});
