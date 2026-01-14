import { ipcMain } from 'electron';
import { openWindow } from './processor';

async function setupMessageCenter() {
    ipcMain.on('toMain', (event, args) => {
        let source = args["source"];
        switch (source) {
            case "main":
                let type = args["type"];
                switch (type) {
                    case "accessURL":
                        let url = args["data"]["url"];
                        console.log(`Access URL requested: ${url}`);
                        openWindow(url);
                        break;
                    default:
                        console.log(`Unknown source: ${source}`);
                }
        }
    });
}

export { setupMessageCenter };
