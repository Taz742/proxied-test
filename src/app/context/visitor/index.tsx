'use client';

import { IVisitor } from '@/app/interfaces/visitor';
import React, { createContext, useContext, useMemo, useState } from 'react';

const VisitorContext = createContext<{
  visitor: IVisitor | null;
  setVisitor: (visitor: IVisitor | null) => void;
}>({
  visitor: null,
  setVisitor: () => {},
});

export const VisitorProvider = ({ children }: { children: React.ReactNode }) => {
  const [visitor, setVisitor] = useState<IVisitor | null>(null);

  const value = useMemo(() => {
    return {
      visitor,
      setVisitor,
    };
  }, [visitor, setVisitor]);

  return <VisitorContext.Provider value={value}>{children}</VisitorContext.Provider>;
};

export const useVisitor = () => {
  return useContext(VisitorContext);
};
