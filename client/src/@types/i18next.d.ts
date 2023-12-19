import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources, defaultNS } from "../locales/i18n";

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources;
  }
}
