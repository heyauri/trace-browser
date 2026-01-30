<template>
    <q-page class="q-pa-md column juestify-start" style="width: 100%">
        <div class="row">
            <div class="q-pa-md col-12">
                <h4>{{ $t('help.title') }}</h4>
                <p>{{ $t('help.description') }}
                </p>
                <ul>
                    <li>{{ $t('help.steps.access') }}</li>
                    <li>{{ $t('help.steps.view') }}</li>
                    <li>{{ $t('help.steps.actions') }}</li>
                </ul>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
//
</script>
