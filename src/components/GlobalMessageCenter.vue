<template>
</template>

<script setup lang="ts">
declare global {
    interface Window {
        appExposedApi: {
            send: (channel: string, data: any) => void;
            receive: (channel: string, func: (data: any) => void) => void;
        };
    }
}


import { inject } from 'vue'
const bus: any = inject('bus');
console.log(bus)


let send2main = function (data: any) {
    console.log("data", data)
    window.appExposedApi.send("toMain", Object.assign({
        source: "main",
    }, data));
}

window.appExposedApi.receive("fromMain", (data: any) => {
    // console.log("Received data from main process:", data);
    // Handle incoming data from the main process here
    let type = data['type'];
    switch (type) {
        case "syncInfo":
            let info = data['data'];
            bus.emit('fromMain', {
                type: "syncInfo",
                data: info
            });
            break;
        default:
            console.log('Unknown data type from main process:', type);
    }
});

bus.on('toMain', (msg: any) => {
    console.log('GlobalMessageCenter received message:', msg);
    let type = msg['type'];
    switch (type) {
        case 'accessURL':
            let url = msg['data'];
            // Add your URL access logic here
            send2main({
                type: "accessURL",
                data: { url }
            })
            break;
        default:
            console.log('Unknown message type:', type);
    }
});

</script>
