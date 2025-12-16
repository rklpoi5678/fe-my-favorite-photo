// src/providers/ExchangeProvider.jsx

'use client';

import { createContext, useContext, useState } from 'react';

const ExchangeContext = createContext(null);

export const useExchange = () => {
  const context = useContext(ExchangeContext);
  if (!context) {
    throw new Error('useExchange must be used within an ExchangeProvider');
  }
  return context;
};

export function ExchangeProvider({ children }) {
  const [targetSaleId, setTargetSaleId] = useState(null);
  // const [targetCardInfo, setTargetCardInfo] = useState(null);

  const value = {
    targetSaleId,
    setTargetSaleId,
    // targetCardInfo,
    // setTargetCardInfo,
  };

  return (
    <ExchangeContext.Provider value={value}>
      {children}
    </ExchangeContext.Provider>
  );
}
