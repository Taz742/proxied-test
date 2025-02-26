'use client';

import { useCallback } from 'react';

import { StartApp } from './components/start-app';
import { App } from './components/app';

import { IVisitor } from './interfaces/visitor';

import { useCart } from './context/cart';

export default function Home() {
  const { cart, refetchCart } = useCart();

  const handleRegistered = useCallback((visitor: IVisitor) => {
    localStorage.setItem('token', visitor.token);

    refetchCart();
  }, []);

  return <>{cart ? <App /> : <StartApp onRegistered={handleRegistered} />}</>;
}
