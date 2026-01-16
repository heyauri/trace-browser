<template>
    <q-page class="q-pa-md column juestify-start" style="width: 100%">
        <div class="row">
            <div class="q-pa-md col-12">
                <q-input standout bottom-slots v-model="select.text" label="Label" counter>
                    <template v-slot:hint>
                        Website URL: Start with "http://" or "https://"
                    </template>
                    <template v-slot:after>
                        <q-btn unelevated icon="send" label="Access" color="light-blue-14" @click="accessURL" />
                    </template>
                </q-input>
            </div>
        </div>
        <q-separator class="q-mx-md" />
        <div class="q-pa-md row items-start q-gutter-md">
            <q-card v-for="site in sites" flat bordered class="site-card">
                <!-- <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->
                <q-card-section>
                    <div class="text-overline text-orange-9">{{ site.uuid }}</div>
                    <div class="q-mt-sm q-mb-xs">Entry URL: {{ site.entry_url }}</div>
                    <div class="text-caption text-grey">
                        Created At: {{ site.create_time }} <br />
                        Access Domain Count: {{ site.access_domain_size }} <br />
                        Access Request Count: {{ site.access_size }} <br />
                    </div>
                </q-card-section>
                <q-card-actions class="q-py-md text-right">
                    <q-btn unelevated :icon="setting[site.uuid].expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                        color="indigo-8" label="Expand" @click="expandDomainList(site.uuid)" />
                    <q-btn unelevated icon="download" color="secondary" label="Download" />
                    <q-space />
                </q-card-actions>
                <q-card-section v-if="setting[site.uuid].expanded && site.access_domain_history.length > 0">
                    <q-separator />
                    <q-table flat separator="vertical" title="Domains" :rows="site.access_domain_history"
                        :columns="domain_table_columns" row-key="name" />
                </q-card-section>

            </q-card>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { inject } from 'vue'

const select = reactive<{ text: string }>({ text: 'http://www.qq.com' });
const sites = ref<any>([]);
const setting = ref<any>({});
const domain_table_columns: any = [
    { name: 'domain', label: 'Domain', field: "domain", align: 'left', sortable: true },
    { name: 'count', label: 'Count', field: "count", align: 'left', sortable: true },
];
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

function expandDomainList(siteUUID: string) {
    if (!Reflect.has(setting.value, siteUUID)) {
        setting.value[siteUUID] = {
            expanded: true
        }
    } else {
        setting.value[siteUUID].expanded = !setting.value[siteUUID].expanded;
    }
}

bus.on('fromMain', (msg: any) => {
    console.log('IndexPage received message from main:', msg);
    let type = msg['type'];
    switch (type) {
        case "syncInfo":
            let info = msg['data'];
            console.log(info)
            sites.value = Object.values(info).sort((a: any, b: any) => {
                return b.create_time > a.create_time ? 1 : -1;
            });
            for (let id of Object.keys(info)) {
                let site = info[id];
                if (!Reflect.has(setting.value, site.uuid)) {
                    setting.value[site.uuid] = {
                        expanded: false
                    }
                } else {
                }
            }
            break;
        default:
            console.log('Unknown message type from main:', type);
    }
});
</script>

<style scoped>
.site-card {
    width: 100%;
}
</style>
