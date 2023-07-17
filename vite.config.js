import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    manifest: {
      icons: [
        {
          "src": "/icons/calendario.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    },
 /*    workbox: {
      runtimeCaching: {
        urlPattern: ({ }) => {
          return url.pathname.startsWith("/api");
        },
        handler: "CacheFirst",
        options: {
          cacheName: "api-cache",
          cacheableResponse: {
            statuses: [0, 200]
          }

        }
      }
    } */
  })

  ]
})

