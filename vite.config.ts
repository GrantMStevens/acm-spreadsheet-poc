import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const server: {
    port: number;
    proxy?: Record<string, any>;
    host: boolean;
    watch?: {
      usePolling: boolean;
    };
  } = {
    port: parseInt(env.VITE_APP_PORT || '3001'),
    host: true,
    watch: {
      usePolling: true,
    },
  }

  if (env.VITE_API_BASE_URL) {
    server.proxy = {
      "/api": {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (p: string) => p.replace(/^\/api/, ""),
      },
    }
  }

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@tools': path.resolve(__dirname, './src/tools'),
        '@themes': path.resolve(__dirname, './src/themes'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@store': path.resolve(__dirname, './src/store'),
        '@types': path.resolve(__dirname, './src/types'),
      },
    },
    plugins: [
      react(),
      TanStackRouterVite(),
      svgr(),
    ],
    server,
  }
})
