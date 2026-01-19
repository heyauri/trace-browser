import { BrowserWindow, nativeTheme, BrowserView, ipcMain, ipcRenderer, Menu, autoUpdater, dialog, session, shell } from "electron";
import path from "path";
import * as utils from "./utils";
import chalk from "chalk";
import dayjs from "dayjs";
import { config } from "../../common/config";
import { fileURLToPath } from 'url'
import { AccessRecord } from "./access-record";
import { MessageCenter } from "./message-center";
const currentDir = fileURLToPath(new URL('.', import.meta.url));

interface Controller {
    main_window: BrowserWindow;
    windows: any;
    active_window_count: number;
    message_center: MessageCenter;
    sync_info_interval_id: NodeJS.Timeout | undefined;
}

class Controller {
    constructor(main_window: BrowserWindow) {
        this.windows = {};
        this.active_window_count = 0;
        this.sync_info_interval_id = undefined;
        this.main_window = main_window;

        this.message_center = new MessageCenter(main_window);
        this.initMessageCenter();
    }

    async initMessageCenter() {
        this.message_center.removeAllListeners();

        this.message_center.on("accessURL", async (url: string) => {
            await this.openWindowFromRoot(url);
        });

        this.message_center.on("refreshInfo", (uuid: string) => {
            console.log(`Refreshing info for UUID: ${uuid}`);
            this.syncInfo();
        });

        this.message_center.on("downloadAccessHistory", (uuid: string) => {
            this.downloadAccessHistory(uuid);
        });

        await this.message_center.setupMessageCenter();
    }

    async openWindowFromRoot(targetURL: string) {
        /**
         * Initial window options
         */
        let uuid = utils.generateUUID();
        let access_record = new AccessRecord(uuid);
        let new_window_session = session.fromPartition(`persist:${uuid}`);

        new_window_session.webRequest.onBeforeRequest((details, callback) => {
            console.log(`Request: `, chalk.yellow(details.url), `Method: `, chalk.green(details.method));
            access_record.push(details.url);
            callback({});
        });
        new_window_session.webRequest.onCompleted((details) => {
            console.log(`Request done:`, chalk.yellow(details.url), `statusCode:`, chalk.green(details.statusCode));
        });

        let current_window = new BrowserWindow({
            title: "browser window",
            icon: path.resolve(currentDir, 'icons/icon.png'), // tray icon
            width: 1200,
            height: 700,
            minimizable: config.browser.minimizable || false,
            useContentSize: true,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                session: new_window_session,
            },
        });

        let current_window_id = current_window.id;
        current_window.loadURL(targetURL);
        this.windows[uuid] = {
            id: current_window_id,
            window: current_window,
            uuid: uuid,
            create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            entry_url: targetURL,
            access_record
        };

        current_window.on("closed", () => {
            // delete windows[current_window_id];
            this.active_window_count -= 1;
            if (this.active_window_count <= 0) {
                this.stopSyncInfo();
            }
        });

        current_window.webContents.on('did-finish-load', () => {
            this.active_window_count += 1;
            this.syncInfo();
            this.startSyncInfo();
        });
    }
    startSyncInfo() {
        if (this.sync_info_interval_id) {
            return;
        }
        this.sync_info_interval_id = setInterval(() => {
            this.syncInfo();
        }, 5000);
    }

    stopSyncInfo() {
        if (this.sync_info_interval_id) {
            clearInterval(this.sync_info_interval_id);
            this.sync_info_interval_id = undefined;
        }
    }

    syncInfo() {
        let info: any = {};
        for (const win_id in this.windows) {
            let win_info = this.windows[win_id];
            info[win_id] = {
                id: win_info.id,
                uuid: win_info.uuid,
                create_time: win_info.create_time,
                entry_url: win_info.entry_url,
                access_size: win_info.access_record.getSize(),
                access_domain_size: win_info.access_record.getDomainSize(),
                access_domain_history: win_info.access_record.getDomainList(),
            };
        }
        this.message_center.sendMessageToRenderer({
            type: "syncInfo",
            data: info
        });
    }

    async downloadAccessHistory(uuid: string) {
        let win_info = this.windows[uuid];
        if (!win_info) {
            console.log(`No window info found for UUID: ${uuid}`);
            return;
        }
        let { canceled, filePath: savePath } = await dialog.showSaveDialog(this.main_window, {
            title: 'save access history',
            defaultPath: "access_history_" + uuid + ".xlsx",
        });
        if(canceled || !savePath) {
            console.log('User cancelled the save dialog.');
            this.message_center.sendMessageToRenderer({
                type: "downloadAccessHistoryResult",
                data: {
                    uuid: uuid,
                    success: false,
                    message: "User cancelled the save dialog."
                }
            });
            return;
        }
        console.log(savePath);
    }
}

export {
    Controller
}
