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
    </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { inject } from 'vue'
import type { Todo, Meta } from 'components/models';
import { data } from 'autoprefixer';

const select = reactive<{ text: string }>({ text: 'http://www.qq.com' });
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
        bus.emit('message', {
            type: "accessURL",
            data: select.text
        });
    }
}
</script>
