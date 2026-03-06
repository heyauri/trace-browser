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
            let type = args["type"];
            switch (source) {
                case "main":
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
                        case "switchTab":
                            log.info(`Switch tab requested for UUID: ${args["data"]["windowUUID"]}, tabId: ${args["data"]["tabId"]}`);
                            this.emit("switchTab", args["data"]["windowUUID"], args["data"]["tabId"]);
                            break;
                        case "closeTab":
                            log.info(`Close tab requested for UUID: ${args["data"]["windowUUID"]}, tabId: ${args["data"]["tabId"]}`);
                            this.emit("closeTab", args["data"]["windowUUID"], args["data"]["tabId"]);
                            break;
                        default:
                            log.warn(`Unknown type: ${type}`);
                    }
                    break;
                case "browser":
                    switch (type) {
                        case "switchTab":
                            log.info(`Switch tab requested for UUID: ${args["data"]["windowUUID"]}, tabId: ${args["data"]["tabId"]}`);
                            this.emit("switchTab", args["data"]["windowUUID"], args["data"]["tabId"]);
                            break;
                        case "closeTab":
                            log.info(`Close tab requested for UUID: ${args["data"]["windowUUID"]}, tabId: ${args["data"]["tabId"]}`);
                            this.emit("closeTab", args["data"]["windowUUID"], args["data"]["tabId"]);
                            break;
                        default:
                            log.warn(`Unknown type: ${type}`);
                    }
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
