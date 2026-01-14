import { BrowserWindow, nativeTheme, BrowserView, ipcMain, ipcRenderer, Menu, autoUpdater, dialog, session, shell } from "electron";
import path from "path";
import * as utils from "./utils";
import { config } from "../../common/config";

const windows: any = {};

async function openWindow(targetURL: string) {
    /**
     * Initial window options
     */
    let currentWindow = new BrowserWindow({
        title: "browser window",
        // icon: path.resolve(__dirname, "../../public/favicon.png"), // tray icon
        width: 1200,
        height: 700,
        minimizable: config.browser.minimizable || false,
        useContentSize: true,
        webPreferences: {
            contextIsolation: true,
        },
    });

    let current_window_id = currentWindow.id;
    windows[current_window_id] = currentWindow;

    currentWindow.loadURL(targetURL);

    currentWindow.on("closed", () => {
        delete windows[current_window_id];
    });
}


export {
    openWindow
}
