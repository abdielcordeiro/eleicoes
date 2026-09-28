/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly VITE_BASE_URL?: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
