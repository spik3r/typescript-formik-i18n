import * as React from 'react';
import {Trans} from 'react-i18next';
import {useTranslation} from './TranslationContext';

interface TranslationProps {
    translationKey: string;
    fallbackText?: string;
   }

export const Translate = (props: TranslationProps): JSX.Element => {
  const {showKeys, loading, initialised} = useTranslation();

  const {fallbackText, translationKey} = props;
  if (showKeys) {
      return (
        <>
          {translationKey}
        </>
      );
    }
  return (
    <>
      {!loading && initialised && (
        <Trans i18nKey={translationKey}>
          {fallbackText}
        </Trans>
      )}
    </>
  );
};

Translate.defaultProps = {
  fallbackText: '',
};
