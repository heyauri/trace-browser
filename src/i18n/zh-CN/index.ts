// Chinese translations
export default {
    title: 'Trace Browser',
    failed: '操作失败',
    success: '操作成功',
    home: {
        title: 'Trace Browser',
        name: "主页",
        access: '访问',
        label: '网址',
        hint: '网站 URL: 以 "http://" 或 "https://" 开头',
        entryUrl: '入口 URL:',
        currentStatus: '当前状态:',
        active: '活跃',
        closed: '已关闭',
        createdAt: '创建时间:',
        uniqueDomainCount: '唯一域名数:',
        uniqueUrlCount: '唯一 URL 数:',
        requestCount: '请求数:',
        showDomains: '显示域名',
        actions: '操作',
        downloadDetail: '下载详情',
        refreshInfos: '刷新信息',
        terminateSession: '终止会话',
        domains: '域名',
        domain: '域名',
        count: '数量'
    },
    help: {
        title: '帮助页面',
        name: '帮助页面',
        description: '这是一个用于记录和分析从特定入口点开始的网站交互行为的应用。',
        features: {
            title: '主要功能',
            recording: '记录网站发出的所有 HTTP/HTTPS 请求',
            analysis: '提供实时统计信息，包括唯一域名、URL 和请求数量',
            export: '将访问记录导出为包含协议信息的 Excel 文件',
            multiSession: '支持多个独立的浏览会话',
            language: '支持英文和中文语言'
        },
        steps: {
            title: '使用方法',
            access: '要访问网站，请在首页的输入框中输入 URL 并点击 "访问"。',
            view: '在卡片列表中查看每个浏览会话的统计信息。',
            analyze: '点击 "显示域名" 可展开查看每个会话的域名详情。',
            actions: '使用操作按钮下载访问历史、刷新信息或终止会话。',
            language: '使用菜单中的语言选择器更改应用语言。'
        },
        export: {
            title: '导出功能',
            description: '导出的 Excel 文件包含三个工作表：',
            domainStats: '域名统计：显示访问的域名及其访问次数',
            urlStats: 'URL 统计：显示访问的 URL 及其访问次数',
            requestHistory: '请求历史：显示每个请求的详细信息，包括时间戳、方法、状态和协议'
        }
    },
    dialog: {
        terminate: '所选会话将被永久关闭。',
        cancel: '取消',
        confirm: '确认'
    },
    notify: {
        waiting: '请稍候...',
        downloadSuccess: '下载成功！',
        downloadFailed: '下载失败。'
    },
    error404: {
        message: '哎呀，这里什么都没有...',
        goHome: '返回首页'
    }
};