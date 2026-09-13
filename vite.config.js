import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Keep the service worker OUT of `npm run dev`: workbox precaching
      // actively fights the dev server's live-reload (it happily serves a
      // stale JS bundle from before your latest edit), which is exactly what
      // caused a string of confusing "it doesn't work" reports this session.
      // It still generates correctly for `npm run build` / real installs.
      devOptions: { enabled: false },
      includeAssets: ['icon-192.png', 'icon-512.png', 'icon-maskable-512.png'],
      manifest: {
        name: 'sub.ci — abonnements en cercle',
        short_name: 'sub.ci',
        description: "Achète et revends tes places d'abonnements en toute confiance.",
        theme_color: '#7F011F',
        background_color: '#F5EBD0',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'fr',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      },
    }),
  ],
});
