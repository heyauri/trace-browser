# Trace Browser

Trace Browser is a desktop browser application built with Quasar and Electron for recording and analyzing website interactions from a specific entry point.

## Features

- **Website Access**: Enter a URL and access the website in a new window
- **Request Recording**: Automatically capture and record all HTTP/HTTPS/WebSocket requests
- **Protocol Support**: Records request protocols including HTTP, HTTPS, WS, and WSS
- **Port Tracking**: Displays port information for each request (including default ports: 80 for HTTP/WS, 443 for HTTPS/WSS)
- **Session Management**: Create, refresh, and terminate browsing sessions
- **Data Analysis**: Real-time statistics for unique domains, unique URLs, and total requests
- **History Export**: Export access records to Excel files with detailed request information
- **Multi-Session Support**: Run multiple independent browsing sessions simultaneously
- **Multi-Language**: Supports English and Chinese languages

## Tech Stack

- **Frontend Framework**: Quasar (Vue 3)
- **Desktop Wrapper**: Electron
- **State Management**: Pinia
- **Internationalization**: Vue I18n
- **Data Export**: node-xlsx
- **Time Processing**: dayjs

## Quick Start

### Install Dependencies

```bash
yarn
# or
npm install
```

### Run in Development Mode

```bash
quasar dev -m electron
```

### Build for Production

```bash
# Build for current platform
quasar build -m electron

# Build for macOS
quasar build -m electron --target darwin

# Build for Windows
quasar build -m electron --target win32
```

## Usage Guide

1. Enter the target URL in the input field on the homepage (must start with `http://` or `https://`)
2. Click the "Access" button to start a browsing session
3. View statistics for all sessions in the card list
4. Click "Show Domains" to expand and view visited domain details
5. Use action buttons to download access history, refresh information, or terminate sessions
6. Change language using the language selector in the sidebar menu

## Export Format

The exported Excel file contains three worksheets:

### 1. Domain Statistics
Lists all accessed domains and their access counts, sorted by frequency.

### 2. URL Statistics
Lists all accessed URLs and their access counts, sorted by frequency.

### 3. Request History
Detailed request log with the following columns:
- **URL**: The full request URL
- **Timestamp**: When the request was made
- **Port**: The connection port (e.g., 80, 443, or custom)
- **Protocol**: Request protocol (http, https, ws, wss)
- **Method**: HTTP method (GET, POST, etc.)
- **Status**: Success or failure
- **Status Code**: HTTP status code (200, 404, etc.)
- **Error**: Error message if request failed

## Configuration

See [Quasar Config Documentation](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## License

MIT
