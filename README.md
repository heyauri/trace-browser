# Trace Browser

Trace Browser is a desktop browser application built with Quasar and Electron for recording and analyzing website interactions from a specific entry point.

## Features

- **Website Access**: Enter a URL and access the website in a new window
- **Request Recording**: Automatically capture and record all HTTP/HTTPS requests
- **Session Management**: Create, refresh, and terminate browsing sessions
- **Data Analysis**: Real-time statistics for unique domains, unique URLs, and total requests
- **History Export**: Export access records to Excel files
- **Multi-Session Support**: Run multiple independent browsing sessions simultaneously

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
quasar build -m electron
```

## Usage Guide

1. Enter the target URL in the input field on the homepage (must start with `http://` or `https://`)
2. Click the "Access" button to start a browsing session
3. View statistics for all sessions in the card list
4. Click "Show Domains" to expand and view visited domain details
5. Use action buttons to download access history, refresh information, or terminate sessions

## Configuration

See [Quasar Config Documentation](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## License

MIT
