'use client';

import { useCallback } from 'react';

import { StartApp } from './components/start-app';

import { IVisitor } from './interfaces/visitor';
import { useVisitor } from './context/visitor';

export default function Home() {
  const { visitor, setVisitor } = useVisitor();

  const handleRegistered = useCallback((visitor: IVisitor) => {
    setVisitor(visitor);
  }, []);

  return (
    <div>
      {!visitor ? (
        <StartApp onRegistered={handleRegistered} />
      ) : (
        <>user registered {visitor.cartId}</>
      )}
    </div>
  );
}
