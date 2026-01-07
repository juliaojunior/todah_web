import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.todahs.app',
  appName: 'ToDAH',
  webDir: 'public',
  server: {
    url: 'https://todah-web.vercel.app',
    allowNavigation: [
      'todah-web.vercel.app',
      '*.todah-web.vercel.app',
      'accounts.google.com'
    ],
    cleartext: true
  }
};

export default config;
