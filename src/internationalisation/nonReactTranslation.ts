import i18n from './i18n';

export const translateText = (showKeys: boolean, translationKey: string, ...args: any[]): string => {
  if (!showKeys) {
    return i18n.t(translationKey, ...args);
  }
return translationKey;
};
