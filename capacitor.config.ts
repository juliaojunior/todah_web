import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.todah.app',
  appName: 'ToDAH',
  webDir: 'public',
  server: {
    url: 'https://todah-web.vercel.app',

    cleartext: true
  }
};

export default config;
