import { BrowserWindow, ipcMain } from 'electron';
import EventEmitter from 'node:events';
import log from 'electron-log';

interface MessageCenter {
    mainWindow: BrowserWindow;
}

class MessageCenter extends EventEmitter {
    constructor(mainWindow: BrowserWindow) {
        super();
        this.mainWindow = mainWindow;
    }
    async setupMessageCenter() {
        ipcMain.removeAllListeners('toMain');
        ipcMain.on('toMain', (event, args) => {
            let source = args["source"];
            switch (source) {
                case "main":
                    let type = args["type"];
                    switch (type) {
                        case "accessURL":
                            let url = args["data"]["url"];
                            log.info(`Access URL requested: ${url}`);
                            this.emit("accessURL", url);
                            break;
                        case "refreshInfo":
                            log.info(`Check history requested for UUID: ${args["data"]["uuid"]}`);
                            this.emit("refreshInfo", args["data"]["uuid"]);
                            break;
                        case "downloadAccessHistory":
                            log.info(`Download access history requested for UUID: ${args["data"]["uuid"]}`);
                            this.emit("downloadAccessHistory", args["data"]["uuid"]);
                            break;
                        case "terminateSession":
                            log.info(`Close window requested for UUID: ${args["data"]["uuid"]}`);
                            this.emit("terminateSession", args["data"]["uuid"]);
                            break;
                        default:
                            log.warn(`Unknown type: ${type}`);
                    }
                    break;
                default:
                    log.warn(`Unknown source: ${source}`);

            }
        });
    }
    async sendMessageToRenderer(message: any) {
        this.mainWindow.webContents.send('fromMain', message);
    }
}

export { MessageCenter };
