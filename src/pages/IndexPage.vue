<template>
    <q-page class="q-pa-md column juestify-start" style="width: 100%">
        <div class="row">
            <div class="q-pa-md col-12">
                <q-input standout bottom-slots v-model="select.text" label="Label" counter>
                    <template v-slot:hint>
                        Website URL: Start with "http://" or "https://"
                    </template>
                    <template v-slot:after>
                        <q-btn icon="send" label="Access" color="primary" @click="accessURL" />
                    </template>
                </q-input>
            </div>
        </div>
        <div class="q-pa-md row items-start q-gutter-md">
            <q-card v-for="site in sites" flat bordered>
                <!-- <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->
                <q-card-section>
                    <div class="text-overline text-orange-9">{{ site.uuid }}</div>
                    <div class="text-h5 q-mt-sm q-mb-xs">Entry URL: {{ site.entry_url }}</div>
                    <div class="text-caption text-grey">
                        Created At: {{ site.create_time }} <br />
                        Access Domain Count: {{ site.access_domain_size }} <br />
                        Access Request Count: {{ site.access_size }} <br />
                    </div>
                </q-card-section>
                <q-card-actions>
                    <q-btn flat color="primary" label="Expand" />
                    <q-btn flat color="secondary" label="Download" />
                    <q-space />
                </q-card-actions>
            </q-card>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { inject } from 'vue'
import type { Todo, Meta } from 'components/models';
import { data } from 'autoprefixer';

const select = reactive<{ text: string }>({ text: 'http://www.qq.com' });
const sites = ref<Array<any>>([]);
const bus: any = inject('bus') // inside setup()

function isValidURL(url: string): boolean {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
}

function accessURL() {
    let isValid = isValidURL(select.text);
    console.log('Accessing URL:', select.text, isValidURL(select.text));
    // Add your URL access logic here
    if (isValid) {
        bus.emit('toMain', {
            type: "accessURL",
            data: select.text
        });
    }
}

bus.on('fromMain', (msg: any) => {
    console.log('IndexPage received message from main:', msg);
    let type = msg['type'];
    switch (type) {
        case "syncInfo":
            let info = msg['data'];
            console.log(info)
            sites.value = info || [];
            break;
        default:
            console.log('Unknown message type from main:', type);
    }
});
</script>
