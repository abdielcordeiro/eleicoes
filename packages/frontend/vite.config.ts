import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig(() => {
  // Suporte a base path para GitHub Pages, GitLab Pages ou ambiente local
  let base = process.env.VITE_BASE_URL || '/';
  if (!process.env.VITE_BASE_URL && process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    base = `/${repoName}/`;
  } else if (!process.env.VITE_BASE_URL && process.env.CI_PAGES_URL) {
    try {
      const url = new URL(process.env.CI_PAGES_URL);
      base = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
    } catch {
      base = '/';
    }
  }

  return {
    base,
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:3333',
          changeOrigin: true
        }
      }
    }
  };
});
