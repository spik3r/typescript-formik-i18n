import * as React from 'react';
import i18n, {i18nInit} from './i18n';

interface TranslationSignature {
  showKeys: boolean;
  showLanguageMenu: boolean;
  language: string;
  initialised: boolean;
  loading: boolean;
}

const defaultContext: TranslationSignature = {
  showKeys: false,
  showLanguageMenu: false,
  language: '',
  initialised: false,
  loading: true,
};
export const TranslationContext = React.createContext(defaultContext);

export function useTranslation() {
  return React.useContext(TranslationContext);
}

export function TranslationProvider({children}: JSX.ElementChildrenAttribute) {
  const [showKeys, setShowKeys] = React.useState(defaultContext.showKeys);
  const [showLanguageMenu, setShowLanguageMenu] = React.useState(defaultContext.showLanguageMenu);
  const [language, setLanguage] = React.useState(defaultContext.language);
  const [loading, setLoading] = React.useState(defaultContext.loading);
  const [initialised, setInitialised] = React.useState(defaultContext.initialised);

  const setActiveLanguageButton = (lang: string) => {
    const selectedButtons = Array.from(document.querySelectorAll('.selected-button'));
    selectedButtons.forEach((element) => {
      element.classList.remove('selected-button');
    });
    const newlySelected = document.querySelector(`.data-${lang}`);
    newlySelected && newlySelected.classList.add('selected-button');
  };

  const changeLanguage = (lang: string) => {
    setLoading(true);
    i18n.changeLanguage(lang).then(() => {
      setLanguage(lang);
      setActiveLanguageButton(lang);
      setLoading(false);
    });
  };

  const downHandler = ({key}: any) => {
    if (key === '`') {
      setShowKeys(!showKeys);
    }
    if (key === '~') {
      setShowLanguageMenu(!showLanguageMenu);
    }
  };

  React.useEffect(() => {
    changeLanguage('en');
  }, [initialised]);

  if (!initialised) {
    i18nInit().then(() => {
      setInitialised(true);
    });
  }

  React.useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  });

    return (
      <TranslationContext.Provider value={{showKeys, showLanguageMenu, language, loading, initialised}}>
        {initialised && showLanguageMenu && (
        <div>
          <button type='button' className='language-menu-button data-en' onClick={() => changeLanguage('en')}>EN</button>
          <button type='button' className='language-menu-button data-fr' onClick={() => changeLanguage('fr')}>FR</button>
        </div>
        )}
        {children}
      </TranslationContext.Provider>
    );
}
