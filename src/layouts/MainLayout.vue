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
                    {{ $t('home.title') }}
                </q-item-label>
                <q-item to="/main" clickable>
                    <q-item-section avatar>
                        <q-icon name="home" />
                    </q-item-section>
                    <q-item-section>
                        {{ $t('home.name') }}
                    </q-item-section>
                </q-item>
                <q-item to="/help" clickable>
                    <q-item-section avatar>
                        <q-icon name="help" />
                    </q-item-section>
                    <q-item-section>
                        {{ $t('help.name') }}
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section avatar>
                        <q-icon name="language" />
                    </q-item-section>
                    <q-item-section>
                        <q-select
                            v-model="selectedLanguage"
                            :options="languageOptions"
                            label="Language"
                            emit-value
                            map-options
                            dense
                            borderless
                            @update:model-value="changeLanguage"
                        />
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
import { ref, computed, watch } from 'vue';
import { config } from 'app/common/config';
import GlobalMessageCenter from 'components/GlobalMessageCenter.vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const leftDrawerOpen = ref(false);
const appName = ref(config.appName);
const appVersion = ref(config.appVersion);

const languageOptions = [
    { label: 'English', value: 'en-US' },
    { label: '中文', value: 'zh-CN' }
];

const selectedLanguage = ref(locale.value);

// 监听语言变化，同步到i18n
watch(selectedLanguage, (newLang) => {
    locale.value = newLang;
});

function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}

function changeLanguage() {
    // 语言变化已通过watch处理
}
</script>
