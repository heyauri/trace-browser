import { BrowserWindow, ipcMain } from 'electron';
import EventEmitter from 'node:events';

interface MessageCenter {
    mainWindow: BrowserWindow;
}

class MessageCenter extends EventEmitter {
    constructor(mainWindow: BrowserWindow) {
        super();
        this.mainWindow = mainWindow;
    }
    async setupMessageCenter() {
        ipcMain.on('toMain', (event, args) => {
            let source = args["source"];
            switch (source) {
                case "main":
                    let type = args["type"];
                    switch (type) {
                        case "accessURL":
                            let url = args["data"]["url"];
                            console.log(`Access URL requested: ${url}`);
                            this.emit("accessURL", url);
                            break;
                        case "checkHistory":
                            let uuid = args["data"]["uuid"];
                            console.log(`Check history requested for UUID: ${uuid}`);
                            this.emit("checkHistory", uuid);
                            break;
                        default:
                            console.log(`Unknown type: ${type}`);
                    }
                    break;
                default:
                    console.log(`Unknown source: ${source}`);

            }
        });
    }
    async sendMessageToRenderer(message: any) {
        this.mainWindow.webContents.send('fromMain', message);
    }
}

export { MessageCenter };
