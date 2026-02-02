// English translations
export default {
  title: 'Trace Browser',
  failed: 'Action failed',
  success: 'Action was successful',
  home: {
    title: "Main Page",
    access: 'Access',
    label: 'Label',
    hint: 'Website URL: Start with "http://" or "https://"',
    entryUrl: 'Entry URL:',
    currentStatus: 'Current Status:',
    active: 'Active',
    closed: 'Closed',
    createdAt: 'Created At:',
    uniqueDomainCount: 'Unique Domain Count:',
    uniqueUrlCount: 'Unique URL Count:',
    requestCount: 'Request Count:',
    showDomains: 'Show Domains',
    actions: 'Actions',
    downloadDetail: 'Download Detail',
    refreshInfos: 'Refresh Infos',
    terminateSession: 'Terminate Session',
    domains: 'Domains',
    domain: 'Domain',
    count: 'Count'
  },
  help: {
    title: 'Help Page',
    description: 'This is a application for recording and analyzing website interactions from a specific entry point.',
    features: {
      title: 'Key Features',
      recording: 'Records all HTTP/HTTPS requests made by the website',
      analysis: 'Provides real-time statistics on unique domains, URLs, and request counts',
      export: 'Exports access records to Excel files with protocol and port information',
      multiSession: 'Supports multiple independent browsing sessions',
      portTracking: 'Displays port information for each request (80 for HTTP, 443 for HTTPS)',
      language: 'Supports English and Chinese languages'
    },
    steps: {
      title: 'How to Use',
      access: 'To access a website, enter the URL in the input field on the home page and click "Access".',
      view: 'View statistics for each browsing session in the card list.',
      analyze: 'Click "Show Domains" to expand and view domain details for each session.',
      actions: 'Use the action buttons to download access history, refresh information, or terminate sessions.',
      language: 'Change the application language using the language selector in the menu.'
    },
    export: {
      title: 'Export Functionality',
      description: 'The exported Excel file contains three worksheets:',
      domainStats: 'Domain Statistics: Shows domains accessed and their access counts',
      urlStats: 'URL Statistics: Shows URLs accessed and their access counts',
      requestHistory: 'Request History: Shows detailed information about each request, including timestamp, port, method, status, and protocol'
    }
  },
  dialog: {
    terminate: 'The chosen session will be closed permanently.',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  notify: {
    waiting: 'Please wait...',
    downloadSuccess: 'Download successful!',
    downloadFailed: 'Download failed.'
  },
  error404: {
    message: 'Oops. Nothing here...',
    goHome: 'Go Home'
  }
};