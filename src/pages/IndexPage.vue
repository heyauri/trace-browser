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
                        Unique Domain Count: {{ site.unique_domain_size }} <br />
                        Unique URL Count: {{ site.unique_url_size }} <br />
                        Request Count: {{ site.request_size }} <br />
                    </div>
                </q-card-section>
                <q-card-actions class="q-py-md col justify-between">
                    <q-toggle class="q-mr-lg" v-model="setting[site.uuid].expanded" color="green" label="Show Domains"
                        @toggle="expandDomainList(site.uuid)" />
                    <q-fab :hide-label="true" label="Actions" icon="keyboard_arrow_right" direction="up" color="primary"
                        vertical-actions-align="right">
                        <q-fab-action external-label label-position="left" icon="download" color="secondary"
                            label="Download Detail" @click="downloadAccessHistory(site.uuid)" />
                        <q-fab-action external-label label-position="left" icon="refresh" color="purple" label="Refresh"
                            @click="refreshInfo(site.uuid)" />
                    </q-fab>
                    <!-- <q-btn unelevated icon="download" color="secondary" label="Download" /> -->
                </q-card-actions>
                <q-card-section v-if="setting[site.uuid].expanded && site.unique_domain_list.length > 0">
                    <q-separator />
                    <q-table flat separator="vertical" title="Domains" :rows="site.unique_domain_list"
                        :columns="domain_table_columns" row-key="name" />
                </q-card-section>

            </q-card>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { inject } from 'vue'
import { useQuasar, QSpinnerGears } from 'quasar'
const $q = useQuasar();
const select = reactive<{ text: string }>({ text: 'https://www.bing.com' });
const sites = ref<any>([]);
const setting = ref<any>({});
const control = ref<any>({ show_refresh: false });
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
        control.value.show_refresh = true;
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

function refreshInfo(siteUUID: string) {
    console.log('Refreshing info for site:', siteUUID);
    $q.notify({
        progress: true,
        spinner: true,
        message: 'Please wait...',
        timeout: 1000
    })
    bus.emit('toMain', {
        type: "refreshInfo",
        data: {
            uuid: siteUUID
        }
    });
}

function downloadAccessHistory(siteUUID: string) {
    console.log('Downloading access history for site:', siteUUID);
    $q.notify({
        progress: true,
        spinner: true,
        message: 'Please wait...',
        timeout: 1000
    })
    bus.emit('toMain', {
        type: "downloadAccessHistory",
        data: {
            uuid: siteUUID
        }
    });
}

bus.on('fromMain', (msg: any) => {
    // console.log('IndexPage received message from main:', msg);
    let type = msg['type'];
    switch (type) {
        case "syncInfo":
            let info = msg['data'];
            // console.log(info)
            sites.value = Object.values(info).sort((a: any, b: any) => {
                return b.create_time > a.create_time ? 1 : -1;
            });
            for (let id of Object.keys(info)) {
                let site = info[id];
                control.value.show_refresh = true;
                if (!Reflect.has(setting.value, site.uuid)) {
                    setting.value[site.uuid] = {
                        expanded: false
                    }
                } else {
                }
            }
            break;
        case "downloadAccessHistoryResult":
            let result = msg['data'];
            if (result.success) {
                $q.notify({
                    type: 'positive',
                    message: 'Download successful!'
                });
            } else {
                $q.notify({
                    type: 'negative',
                    message: result.message || 'Download failed.',
                    progress: true,
                    timeout: 2000
                });
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
