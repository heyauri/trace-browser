<template>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const bus: any = inject('bus');
console.log(bus)


let send2main = function (data: any) {
    console.log("data", data)
    //@ts-ignore
    window.appExposedApi.send("toMain", Object.assign({
        source: "main",
    }, data));
}

bus.on('message', (msg: any) => {
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
