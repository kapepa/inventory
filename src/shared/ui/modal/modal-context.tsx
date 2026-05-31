"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  title?: string;
}

interface ModalActions {
  openModal: (content: ReactNode, title?: string) => void;
  closeModal: () => void;
}

const ModalStateContext = createContext<ModalState | undefined>(undefined);
const ModalActionsContext = createContext<ModalActions | undefined>(undefined);

ModalStateContext.displayName = 'ModalStateContext';
ModalActionsContext.displayName = 'ModalActionsContext';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const openModal = useCallback((content: ReactNode, title?: string) => {
    setContent(content);
    setTitle(title);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setContent(null);
      setTitle(undefined);
    }, 200);
  }, []);

  const state = useMemo(() => ({ isOpen, content, title }), [isOpen, content, title]);
  const actions = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionsContext.Provider value={actions}>
        {children}
      </ModalActionsContext.Provider>
    </ModalStateContext.Provider>
  );
};

ModalProvider.displayName = 'ModalProvider';

export const useModalState = () => {
  const context = useContext(ModalStateContext);
  if (!context) throw new Error("useModalState must be used within ModalProvider");
  return context;
};

export const useModalActions = () => {
  const context = useContext(ModalActionsContext);
  if (!context) throw new Error("useModalActions must be used within ModalProvider");
  return context;
};

/**
 * @deprecated Use useModalState or useModalActions instead for better performance
 */
export const useModal = () => {
  const state = useModalState();
  const actions = useModalActions();
  return { ...state, ...actions };
};
