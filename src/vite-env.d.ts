/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEADS_ENDPOINT?: string;
  readonly VITE_LEADS_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
