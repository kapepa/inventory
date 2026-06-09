"use client"

import { useCallback } from 'react'

import { useModalActions } from '@/shared'
import { ProductCreateModal } from '../../ui';

export const useProductCreate = ({ parishId }: { parishId: string }) => {
  const { openModal, closeModal } = useModalActions();

  const productCreate = useCallback(() => {
    openModal(<ProductCreateModal parishId={parishId} onOpenChangeAction={closeModal} />)
  }, [openModal, closeModal])

  return {
    productCreate
  }
}