import { CapacitorConfig } from '@capacitor/cli';

const liveUpdatesAppId = process.env.CAPACITOR_LIVE_UPDATES_APP_ID?.trim() || '6f7685c7';
const liveUpdatesChannel = process.env.CAPACITOR_LIVE_UPDATES_CHANNEL?.trim() || 'Staging';
const liveUpdatesEnabled = Boolean(liveUpdatesAppId);
const webDir = process.env.CAPACITOR_WEB_DIR?.trim() || '.next-mobile';

const config: CapacitorConfig = {
  appId: 'com.ssunbae.edu',
  appName: 'ssunbaeEdu',
  webDir,
  loggingBehavior: process.env.NODE_ENV === 'production' ? 'production' : 'debug',
  plugins: {
    LiveUpdates: {
      appId: liveUpdatesAppId || 'local-live-updates-disabled',
      channel: liveUpdatesChannel,
      autoUpdateMethod: liveUpdatesEnabled ? 'background' : 'none',
      enabled: liveUpdatesEnabled,
      maxVersions: 2,
    },
  },
};

export default config;
