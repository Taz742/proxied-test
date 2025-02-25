'use client';

import { useCallback, useEffect } from 'react';
import ReactModal from 'react-modal';

import { StartApp } from './components/start-app';
import { App } from './components/app';

import { IVisitor } from './interfaces/visitor';

import { useCart } from './context/cart';

export default function Home() {
  const { cart, refetchCart } = useCart();

  useEffect(() => {
    if (typeof window !== 'undefined')
      ReactModal.setAppElement(document.getElementById('modals')!);
  }, []);

  const handleRegistered = useCallback((visitor: IVisitor) => {
    localStorage.setItem('token', visitor.token);

    refetchCart();
  }, []);

  return (
    <>
      {cart ? <App /> : <StartApp onRegistered={handleRegistered} />}
      <div id="modals" />
    </>
  );
}
