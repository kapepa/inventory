"use client"

import { useCallback, useEffect, useRef } from 'react';
import { useModalState } from '@/shared/ui/modal/modal-context';
import { useQueryParamActions, useQueryParamValue } from '../providers/query-param-provider';

interface UseModalQueryOptions {
  modalName: string;
  onOpen?: (close: () => void) => void;
  onClose?: () => void;
}
//Two-way synchronization of a modal window
export const useModalQuery = ({ modalName, onOpen, onClose }: UseModalQueryOptions) => {
  const { queryParams } = useQueryParamValue();
  const { setQueryParam } = useQueryParamActions();
  const { isOpen: isSystemOpen } = useModalState();

  const isOpenRef = useRef(false);
  const wasSystemOpen = useRef(false);

  const isOpen = queryParams.get('modal') === modalName;

  const open = useCallback(() => {
    setQueryParam('modal', modalName);
  }, [modalName, setQueryParam]);

  const close = useCallback(() => {
    if (queryParams.get('modal') === modalName) {
      setQueryParam('modal', '');
    }
  }, [modalName, queryParams, setQueryParam]);

  useEffect(() => {
    if (isOpen && !isOpenRef.current) {
      onOpen?.(close);
      isOpenRef.current = true;
    } else if (!isOpen && isOpenRef.current) {
      onClose?.();
      isOpenRef.current = false;
    }
  }, [isOpen, onOpen, onClose, close]);

  useEffect(() => {
    if (wasSystemOpen.current && !isSystemOpen && isOpen) {
      close();
      isOpenRef.current = false;
    }
    wasSystemOpen.current = isSystemOpen;
  }, [isSystemOpen, isOpen, close]);

  return { isOpen, open, close };
};