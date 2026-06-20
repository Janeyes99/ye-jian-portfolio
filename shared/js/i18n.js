// Language Context and Translation System
// Extracted from sonic-patrol-preview.html

import React, { createContext, useContext, useState } from 'react';

// Translation data (siteContent)
const siteContent = {
  hero: {
    subtitle: {
      en: `Ye Jian \u2014\nA user experience designer exploring mobility, systems, objects, and experiences.\nWorking across screens, materials, and spaces to design interactions that feel clear, tangible, and human.`,
      cn: `\u7B80\u70E8\uFF0C\u7528\u6237\u4F53\u9A8C\u8BBE\u8BA1\u5E08\u3002\n\n\u8BBE\u8BA1\u5B9E\u8DF5\u8DE8\u8D8A\u51FA\u884C\u3001\u7CFB\u7EDF\u3001\u7269\u4EF6\u4E0E\u4F53\u9A8C\uFF0C\u5728\u5C4F\u5E55\u3001\u6750\u6599\u4E0E\u7A7A\u95F4\u4E4B\u95F4\u63A2\u7D22\u66F4\u6E05\u6670\u3001\u53EF\u611F\u77E5\u3001\u4EE5\u4EBA\u4E3A\u4E2D\u5FC3\u7684\u4EA4\u4E92\u65B9\u5F0F\u3002`
    }
  },
  categories: {
    "hmi": {
      title: {
        en: "HMI Systems",
        cn: "HMI\u7CFB\u7EDF\u8BBE\u8BA1"
      },
      desc: {
        en: "Advanced HMI platforms, off-road cockpits.",
        cn: "\u8F66\u8F7D\u9AD8\u7EA7HMI\u7CFB\u7EDF\u3001\u667A\u80FD\u5EA7\u8231\u5E72\u9884\u7814\u7A76\u3002"
      }
    },
    "interaction-mechanisms": {
      title: {
        en: "Interaction Mechanisms",
        cn: "\u4EA4\u4E92\u673A\u5236"
      },
      desc: {
        en: "Tangible friction, adaptive physical feedback frameworks.",
        cn: "\u7269\u7406\u4E16\u754C\u6469\u64E6\u529B\u4E0E\u884C\u4E3A\u7269\u7406\u5B66\u9632\u8BEF\u89E6\u7B56\u7565\u3002"
      }
    },
    "installations": {
      title: {
        en: "Installations",
        cn: "\u4EA4\u4E92\u88C5\u7F6E"
      },
      desc: {
        en: "Kinetic interactive installations, speculative data collection.",
        cn: "\u65B0\u5A92\u4F53\u52A8\u529B\u5B66\u673A\u68B0\u88C5\u7F6E\u3001\u6570\u5B57\u5316\u6279\u5224\u827A\u672F\u3002"
      }
    },
    "service-brand": {
      title: {
        en: "Service & Brand",
        cn: "\u670D\u52A1\u4E0E\u54C1\u724C\u4F53\u7CFB"
      },
      desc: {
        en: "Circular economic blueprint, omnichannel digital retail.",
        cn: "\u5168\u94FE\u8DEF\u7269\u8D28\u5FAA\u73AF\u793E\u533A\u84DD\u56FE\u3001\u5168\u6E20\u9053\u6570\u5B57\u96F6\u552E\u4F53\u9A8C\u3002"
      }
    }
  }
};

// Create language context
export const LanguageContext = createContext(null);

// Language Provider component
export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  
  const t = (key) => {
    if (!key) return '';
    const keys = key.split('.');
    let value = siteContent;
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value[lang] || value['en'] || key;
  };
  
  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'cn' : 'en');
  };
  
  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLang, siteContent }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
