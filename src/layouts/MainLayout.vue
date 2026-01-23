<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
                <q-toolbar-title>
                    {{ appName }}
                </q-toolbar-title>
                <div>v{{ appVersion }}</div>
            </q-toolbar>
        </q-header>
        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <q-list>
                <q-item-label header>
                    Menu
                </q-item-label>
                <q-item to="/main" clickable>
                    <q-item-section avatar>
                        <q-icon name="home" />
                    </q-item-section>
                    <q-item-section>
                        Home
                    </q-item-section>
                </q-item>
                <q-item to="/help" clickable>
                    <q-item-section avatar>
                        <q-icon name="help" />
                    </q-item-section>
                    <q-item-section>
                        Help
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
    <global-message-center />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { config } from 'app/common/config';
import GlobalMessageCenter from 'components/GlobalMessageCenter.vue';

const leftDrawerOpen = ref(false);
const appName = ref(config.appName);
const appVersion = ref(config.appVersion);

function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
