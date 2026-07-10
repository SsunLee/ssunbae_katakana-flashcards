import { CapacitorConfig } from '@capacitor/cli';

const liveUpdatesAppId = process.env.CAPACITOR_LIVE_UPDATES_APP_ID?.trim() || '6f7685c7';
const liveUpdatesChannel = process.env.CAPACITOR_LIVE_UPDATES_CHANNEL?.trim() || 'Production';
const liveUpdatesEnabled = Boolean(liveUpdatesAppId);
const webDir = process.env.CAPACITOR_WEB_DIR?.trim() || 'www';

const config: CapacitorConfig = {
  appId: 'com.ssunbae.edu',
  appName: '쑨에듀',
  webDir,
  backgroundColor: '#1769e8',
  loggingBehavior: process.env.NODE_ENV === 'production' ? 'production' : 'debug',
  plugins: {
    LiveUpdates: {
      appId: liveUpdatesAppId || 'local-live-updates-disabled',
      channel: liveUpdatesChannel,
      autoUpdateMethod: 'none',
      enabled: liveUpdatesEnabled,
      maxVersions: 2,
    },
    StatusBar: {
      overlaysWebView: true,
      style: 'DARK',
    },
  },
};

export default config;
