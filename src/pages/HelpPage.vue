<template>
    <q-page class="help-page">
        <div class="hero-section">
            <div class="hero-content">
                <q-icon name="help" size="64px" color="white" class="hero-icon" />
                <h1 class="hero-title">{{ $t('help.title') }}</h1>
                <p class="hero-description">{{ $t('help.description') }}</p>
            </div>
        </div>
        
        <div class="content-container">
            <q-card flat class="features-card">
                <q-card-section>
                    <div class="section-header">
                        <q-icon name="auto_awesome" color="primary" size="28px" />
                        <h2 class="section-title">{{ $t('help.features.title') }}</h2>
                    </div>
                    
                    <div class="features-grid">
                        <div class="feature-item">
                            <div class="feature-icon-wrapper">
                                <q-icon name="network_wifi" size="32px" color="primary" />
                            </div>
                            <div class="feature-content">
                                <h3 class="feature-title">Network Recording</h3>
                                <p class="feature-description">{{ $t('help.features.recording') }}</p>
                            </div>
                        </div>
                        
                        <div class="feature-item">
                            <div class="feature-icon-wrapper">
                                <q-icon name="analytics" size="32px" color="info" />
                            </div>
                            <div class="feature-content">
                                <h3 class="feature-title">Data Analysis</h3>
                                <p class="feature-description">{{ $t('help.features.analysis') }}</p>
                            </div>
                        </div>
                        
                        <div class="feature-item">
                            <div class="feature-icon-wrapper">
                                <q-icon name="file_download" size="32px" color="positive" />
                            </div>
                            <div class="feature-content">
                                <h3 class="feature-title">Excel Export</h3>
                                <p class="feature-description">{{ $t('help.features.export') }}</p>
                            </div>
                        </div>
                        
                        <div class="feature-item">
                            <div class="feature-icon-wrapper">
                                <q-icon name="layers" size="32px" color="purple" />
                            </div>
                            <div class="feature-content">
                                <h3 class="feature-title">Multi-Session</h3>
                                <p class="feature-description">{{ $t('help.features.multiSession') }}</p>
                            </div>
                        </div>
                        
                        <div class="feature-item full-width">
                            <div class="feature-icon-wrapper">
                                <q-icon name="language" size="32px" color="warning" />
                            </div>
                            <div class="feature-content">
                                <h3 class="feature-title">Language Support</h3>
                                <p class="feature-description">{{ $t('help.features.language') }}</p>
                            </div>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
            
            <q-card flat class="steps-card">
                <q-card-section>
                    <div class="section-header">
                        <q-icon name="checklist" color="primary" size="28px" />
                        <h2 class="section-title">{{ $t('help.steps.title') }}</h2>
                    </div>
                    
                    <q-timeline color="primary">
                        <q-timeline-entry
                            title="Access Website"
                            subtitle="Step 1"
                            icon="input"
                            color="primary"
                        >
                            <div class="step-content">
                                <p>{{ $t('help.steps.access') }}</p>
                            </div>
                        </q-timeline-entry>
                        
                        <q-timeline-entry
                            title="View Statistics"
                            subtitle="Step 2"
                            icon="visibility"
                            color="info"
                        >
                            <div class="step-content">
                                <p>{{ $t('help.steps.view') }}</p>
                            </div>
                        </q-timeline-entry>
                        
                        <q-timeline-entry
                            title="Analyze Domains"
                            subtitle="Step 3"
                            icon="search"
                            color="purple"
                        >
                            <div class="step-content">
                                <p>{{ $t('help.steps.analyze') }}</p>
                            </div>
                        </q-timeline-entry>
                        
                        <q-timeline-entry
                            title="Use Actions"
                            subtitle="Step 4"
                            icon="touch_app"
                            color="warning"
                        >
                            <div class="step-content">
                                <p>{{ $t('help.steps.actions') }}</p>
                            </div>
                        </q-timeline-entry>
                        
                        <q-timeline-entry
                            title="Change Language"
                            subtitle="Optional"
                            icon="translate"
                            color="positive"
                        >
                            <div class="step-content">
                                <p>{{ $t('help.steps.language') }}</p>
                            </div>
                        </q-timeline-entry>
                    </q-timeline>
                </q-card-section>
            </q-card>
            
            <q-card flat class="export-card">
                <q-card-section>
                    <div class="section-header">
                        <q-icon name="table_chart" color="primary" size="28px" />
                        <h2 class="section-title">{{ $t('help.export.title') }}</h2>
                    </div>
                    
                    <p class="export-description">{{ $t('help.export.description') }}</p>
                    
                    <div class="export-grid">
                        <div class="export-item">
                            <div class="export-icon-wrapper">
                                <q-icon name="domain" size="36px" color="info" />
                            </div>
                            <h3 class="export-title">Domain Statistics</h3>
                            <p class="export-description-text">{{ $t('help.export.domainStats') }}</p>
                        </div>
                        
                        <div class="export-item">
                            <div class="export-icon-wrapper">
                                <q-icon name="link" size="36px" color="purple" />
                            </div>
                            <h3 class="export-title">URL Statistics</h3>
                            <p class="export-description-text">{{ $t('help.export.urlStats') }}</p>
                        </div>
                        
                        <div class="export-item">
                            <div class="export-icon-wrapper">
                                <q-icon name="history" size="36px" color="warning" />
                            </div>
                            <h3 class="export-title">Request History</h3>
                            <p class="export-description-text">{{ $t('help.export.requestHistory') }}</p>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
//
</script>

<style scoped>
.help-page {
    min-height: 100vh;
    background: #f8fafc;
}

.hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 80px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.hero-content {
    position: relative;
    z-index: 1;
}

.hero-icon {
    margin-bottom: 20px;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
}

.hero-title {
    font-size: 48px;
    font-weight: 700;
    color: white;
    margin: 0 0 16px 0;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.hero-description {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.95);
    margin: 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
}

.content-container {
    max-width: 900px;
    margin: -50px auto 40px;
    padding: 0 16px;
    position: relative;
    z-index: 2;
}

.features-card,
.steps-card,
.export-card {
    background: white;
    border: none;
    border-radius: 16px;
    margin-bottom: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #f1f5f9;
}

.section-title {
    font-size: 22px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
}

.feature-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.feature-item:hover {
    border-color: #667eea;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12);
}

.feature-item.full-width {
    grid-column: 1 / -1;
}

.feature-icon-wrapper {
    flex-shrink: 0;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.feature-title {
    font-size: 16px;
    font-weight: 600;
    color: #334155;
    margin: 0 0 6px 0;
}

.feature-description {
    font-size: 14px;
    color: #64748b;
    margin: 0;
    line-height: 1.5;
}

.steps-card :deep(.q-timeline) {
    padding: 0;
}

.steps-card :deep(.q-timeline-entry) {
    padding-bottom: 28px;
}

.steps-card :deep(.q-timeline-entry-subtitle) {
    color: #667eea;
    font-weight: 600;
    font-size: 13px;
}

.step-content {
    background: #f8fafc;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    margin-top: 8px;
    margin-left: 20px;
}

.step-content p {
    margin: 0;
    color: #475569;
    font-size: 14px;
    line-height: 1.6;
}

.export-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
}

.export-item {
    text-align: center;
    padding: 24px 16px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.export-item:hover {
    border-color: #667eea;
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.12);
}

.export-icon-wrapper {
    width: 64px;
    height: 64px;
    margin: 0 auto 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.export-title {
    font-size: 15px;
    font-weight: 600;
    color: #334155;
    margin: 0 0 6px 0;
}

.export-description-text {
    font-size: 13px;
    color: #64748b;
    margin: 0;
    line-height: 1.5;
}

.export-description {
    color: #64748b;
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .hero-section {
        padding: 60px 20px;
    }
    
    .hero-title {
        font-size: 32px;
    }
    
    .hero-description {
        font-size: 16px;
    }
    
    .content-container {
        margin-top: -30px;
    }
    
    .feature-item {
        flex-direction: column;
        text-align: center;
    }
    
    .feature-icon-wrapper {
        margin: 0 auto;
    }
}
</style>