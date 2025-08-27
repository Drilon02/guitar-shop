import React, { createContext, useContext, useMemo, useState } from 'react';

const strings = {
  en: {
    title: 'Online Guitar Shop',
    brands: 'Guitar Brands',
    models: 'Guitar Models',
    details: 'Guitar Details',
    searchModels: 'Search models…',
    filterType: 'Filter by type',
    allTypes: 'All types',
    specs: 'Specs',
    musicians: 'Musicians',
    loading: 'Loading…',
    error: 'Something went wrong',
    back: 'Back',
    noResults: 'No results',
    showMore: 'Show more',
    footerLang: 'Language',
    sort: {
      nameAsc: "Name ↑",
      nameDesc: "Name ↓",
      priceAsc: "Price ↑",
      priceDesc: "Price ↓"
    }
  },
  sq: {
    title: 'Dyqan Online Gitarash',
    brands: 'Markat e gitarave',
    models: 'Modelet e gitarave',
    details: 'Detajet e gitarës',
    searchModels: 'Kërko modele…',
    filterType: 'Filtro sipas tipi',
    allTypes: 'Të gjitha tipet',
    specs: 'Specifikimet',
    musicians: 'Muzikantët',
    loading: 'Duke u ngarkuar…',
    error: 'Ndodhi një gabim',
    back: 'Kthehu',
    noResults: 'Nuk u gjetën rezultate',
    showMore: 'Shfaq më shumë',
    footerLang: 'Gjuha',
    sort: {
      nameAsc: "Emri ↑",
      nameDesc: "Emri ↓",
      priceAsc: "Çmimi ↑",
      priceDesc: "Çmimi ↓"
    }
  }
};

const Ctx = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(localStorage.getItem('lang') || 'en');
  const setLang = (l) => { localStorage.setItem('lang', l); setLangState(l); };

  const t = (key) => {
    const getNested = (obj, path) =>
      path.split('.').reduce((acc, part) => acc?.[part], obj);

    return getNested(strings[lang], key) || getNested(strings.en, key) || key;
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
