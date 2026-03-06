import { BrowserWindow, WebContentsView } from "electron";
import * as utils from "../utils";
import path from "path";
import { fileURLToPath } from 'url';

// Get current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('Current directory:', __dirname);

interface Tab {
    id: string;
    url: string;
    title: string;
    view: WebContentsView;
}

interface WindowInfo {
    id: number;
    window: BrowserWindow;
    status: boolean;
    uuid: string;
    create_time: string;
    entry_url: string;
    access_record: any;
    tabs: Tab[];
    activeTabId: string;
    tabBarView: WebContentsView;
}

class TabManager {
    private windows: Record<string, WindowInfo>;

    constructor() {
        this.windows = {};
    }

    setWindows(windows: Record<string, WindowInfo>) {
        this.windows = windows;
    }

    createTabBar(window: BrowserWindow, windowUUID: string): WebContentsView {
        const tabBarView = new WebContentsView({
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        window.contentView.addChildView(tabBarView);
        tabBarView.setBounds({ x: 0, y: 0, width: window.getBounds().width, height: 40 });
        console.log('Tab bar bounds:', tabBarView.getBounds());

        // Create inline HTML for tab bar
        const tabBarHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Tab Bar</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: #f0f0f0;
                        font-family: Arial, sans-serif;
                    }
                    .tab-bar {
                        display: flex;
                        height: 40px;
                        border-bottom: 1px solid #ccc;
                    }
                    .tab {
                        padding: 0 15px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        border-right: 1px solid #ccc;
                    }
                    .tab.active {
                        background-color: #e0e0e0;
                    }
                    .tab:hover {
                        background-color: #f5f5f5;
                    }
                    .tab-close {
                        margin-left: 10px;
                        font-size: 12px;
                        color: #999;
                    }
                    .tab-close:hover {
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <div class="tab-bar" id="tabBar"></div>
                <script>
                    console.log('Tab bar script loaded');
                    // Receive tab updates from main process
                    window.onTabUpdate = function(tabs, activeTabId) {
                        console.log('onTabUpdate called with tabs:', tabs, 'activeTabId:', activeTabId);
                        updateTabBar(tabs, activeTabId);
                    };

                    function updateTabBar(tabs, activeTabId) {
                        console.log('updateTabBar called');
                        const tabBar = document.getElementById('tabBar');
                        console.log('Tab bar element:', tabBar);
                        if (!tabBar) {
                            console.error('Tab bar element not found');
                            return;
                        }
                        tabBar.innerHTML = '';

                        console.log('Tabs to display:', tabs);
                        tabs.forEach(tab => {
                            console.log('Creating tab for:', tab.title);
                            const tabElement = document.createElement('div');
                            tabElement.className = 'tab ' + (tab.id === activeTabId ? 'active' : '');
                            tabElement.textContent = tab.title || 'Loading...';

                            const closeButton = document.createElement('span');
                            closeButton.className = 'tab-close';
                            closeButton.textContent = '×';
                            closeButton.onclick = (e) => {
                                e.stopPropagation();
                                console.log('Close tab clicked for:', tab.id);
                                window.closeTab('${windowUUID}', tab.id);
                            };

                            tabElement.appendChild(closeButton);
                            tabElement.onclick = () => {
                                console.log('Switch tab clicked for:', tab.id);
                                window.switchTab('${windowUUID}', tab.id);
                            };

                            tabBar.appendChild(tabElement);
                        });
                    }

                    // Expose tab methods
                    window.switchTab = function(windowUUID, tabId) {
                        console.log('switchTab called:', windowUUID, tabId);
                        require('electron').ipcRenderer.send('toMain', {
                            source: "browser",
                            type: "switchTab",
                            data: {
                                windowUUID: windowUUID,
                                tabId: tabId
                            }
                        });
                    };
                    window.closeTab = function(windowUUID, tabId) {
                        console.log('closeTab called:', windowUUID, tabId);
                        require('electron').ipcRenderer.send('toMain', {
                            source: "browser",
                            type: "closeTab",
                            data: {
                                windowUUID: windowUUID,
                                tabId: tabId
                            }
                        });
                    };
                    console.log('Tab bar initialized');
                </script>
            </body>
            </html>
        `;

        // Load inline HTML
        tabBarView.webContents.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(tabBarHTML)}`);

        // Wait for the page to load before executing JavaScript
        tabBarView.webContents.on('did-finish-load', () => {
            console.log('Tab bar HTML loaded');
            // Update tab bar
            const winInfo = this.windows[windowUUID];
            if (winInfo) {
                console.log('Updating tab bar with tabs:', winInfo.tabs);
                tabBarView.webContents.executeJavaScript(`
                    if (window.onTabUpdate) {
                        window.onTabUpdate(${JSON.stringify(winInfo.tabs)}, "${winInfo.activeTabId}");
                    } else {
                        console.error('window.onTabUpdate is not defined');
                    }
                `);
            }
        });

        // Handle window resize
        window.on('resize', () => {
            const bounds = window.getBounds();
            tabBarView.setBounds({ x: 0, y: 0, width: bounds.width, height: 40 });
            console.log('Tab bar bounds updated:', tabBarView.getBounds());
        });

        return tabBarView;
    }

    createTab(window: BrowserWindow, session: any, url: string, tabId: string): Tab {
        const view = new WebContentsView({
            webPreferences: {
                session: session,
                nodeIntegration: false,
                contextIsolation: true
            }
        });

        window.contentView.addChildView(view); // 将标签视图添加到内容视图，默认置于最底层（在标签栏后面）
        view.setBounds({ x: 0, y: 40, width: window.getBounds().width, height: window.getBounds().height - 40 });
        view.webContents.loadURL(url);

        // Get window UUID
        const windowUUID = Object.keys(this.windows).find(uuid =>
            this.windows[uuid] && this.windows[uuid].window === window
        );

        // Handle new window creation (open in new tab)
        if (windowUUID) {
            view.webContents.setWindowOpenHandler((details) => {
                this.createNewTab(windowUUID, details.url);
                return { action: 'deny' };
            });
        }

        // Update tab title when page title changes
        view.webContents.on('page-title-updated', (event, title) => {
            const winInfo = Object.values(this.windows).find(win =>
                win.tabs.some(tab => tab.id === tabId)
            );
            if (winInfo) {
                const tab = winInfo.tabs.find((t: Tab) => t.id === tabId);
                if (tab) {
                    tab.title = title;
                    this.updateTabBar(winInfo.uuid);
                }
            }
        });

        // Handle tab load finish
        view.webContents.on('did-finish-load', () => {
            console.log('Tab finished loading:', url);
            const winInfo = Object.values(this.windows).find(win =>
                win.tabs.some(tab => tab.id === tabId)
            );
            if (winInfo) {
                // Ensure window status is true
                winInfo.status = true;
                // Update tab bar
                this.updateTabBar(winInfo.uuid);
            }
        });

        // Handle window resize
        window.on('resize', () => {
            const bounds = window.getBounds();
            view.setBounds({ x: 0, y: 40, width: bounds.width, height: bounds.height - 40 });
        });

        return {
            id: tabId,
            url: url,
            title: "Loading...",
            view: view
        };
    }

    createNewTab(windowUUID: string, url: string) {
        const winInfo = this.windows[windowUUID];
        if (!winInfo) return;

        const tabId = utils.generateUUID();
        const newTab = this.createTab(winInfo.window, winInfo.window.webContents.session, url, tabId);

        winInfo.tabs.push(newTab);
        this.switchTab(windowUUID, tabId);
        this.updateTabBar(windowUUID);
    }

    switchTab(windowUUID: string, tabId: string) {
        const winInfo = this.windows[windowUUID];
        if (!winInfo) return;

        // Hide all views
        winInfo.tabs.forEach((tab: Tab) => {
            winInfo.window.contentView.removeChildView(tab.view);
        });

        // Show active tab
        const activeTab = winInfo.tabs.find((tab: Tab) => tab.id === tabId);
        if (activeTab) {
            winInfo.window.contentView.addChildView(activeTab.view);
            const bounds = winInfo.window.getBounds();
            activeTab.view.setBounds({ x: 0, y: 40, width: bounds.width, height: bounds.height - 40 });
            winInfo.activeTabId = tabId;
            this.updateTabBar(windowUUID);
        }
    }

    closeTab(windowUUID: string, tabId: string) {
        const winInfo = this.windows[windowUUID];
        if (!winInfo) return;

        const tabIndex = winInfo.tabs.findIndex((tab: Tab) => tab.id === tabId);
        if (tabIndex === -1) return;

        // Remove the view
        const tabView = winInfo.tabs[tabIndex]?.view;
        if (tabView) {
            winInfo.window.contentView.removeChildView(tabView);
        }

        // Remove the tab from array
        winInfo.tabs.splice(tabIndex, 1);

        // If closing active tab, switch to another tab
        if (winInfo.activeTabId === tabId) {
            if (winInfo.tabs.length > 0) {
                const firstTab = winInfo.tabs[0];
                if (firstTab) {
                    this.switchTab(windowUUID, firstTab.id);
                }
            } else {
                // No tabs left, close window
                winInfo.window.close();
            }
        } else {
            this.updateTabBar(windowUUID);
        }
    }

    updateTabBar(windowUUID: string) {
        const winInfo = this.windows[windowUUID];
        if (!winInfo) return;

        // Send tab update to tab bar
        const tabBarView = winInfo.tabBarView;
        if (tabBarView) {
            tabBarView.webContents.executeJavaScript(`
                if (window.onTabUpdate) {
                    window.onTabUpdate(${JSON.stringify(winInfo.tabs)}, "${winInfo.activeTabId}");
                }
            `);
        }
    }
}

export { TabManager };
export type { Tab, WindowInfo };
