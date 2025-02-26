import { useState, useCallback, useMemo } from 'react';

interface UseModalReturn<T> {
  isOpen: boolean;
  item: T | null;
  setItem: React.Dispatch<React.SetStateAction<T | null>>;
  closeModal: (item: T | null) => void;
  openModal: (item: T | null) => void;
}

export const useModal = <T>(
  initIsOpen: boolean = false,
  initItem: T | null = null,
): UseModalReturn<T> => {
  const [isOpen, setIsOpen] = useState<boolean>(initIsOpen);
  const [item, setSelectedItem] = useState<T | null>(initItem);

  const closeModal = useCallback((item: T | null) => {
    setSelectedItem(item);
    setIsOpen(false);
  }, []);

  const openModal = useCallback((item: T | null = null) => {
    setSelectedItem(item);
    setIsOpen(true);
  }, []);

  const state = useMemo(() => {
    return {
      isOpen,
      item,
      setItem: setSelectedItem,
      closeModal,
      openModal,
    };
  }, [isOpen, item, closeModal, openModal]);

  return state;
};
