'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCommon from './locales/cn/common.json';
import enCommon from './locales/en/common.json';
import jaCommon from './locales/ja/common.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      common: typeof zhCommon;
    };
  }
}

const i18nInstance = i18next.createInstance();

void i18nInstance
  .use(initReactI18next)
  .init({
    resources: {
      zh: {
        common: zhCommon
      },
      en: {
        common: enCommon
      },
      ja: {
          common: jaCommon
      }
    },
    lng: 'ja',
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: true,
    },
  });

export default i18nInstance;