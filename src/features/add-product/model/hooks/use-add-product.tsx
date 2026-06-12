"use client"

import { useCallback } from 'react'

import { useModalActions } from '@/shared'
import { ProductCreateModal } from '../../ui';

export const useAddProduct = ({ parishId }: { parishId: string }) => {
  const { openModal, closeModal } = useModalActions();

  const productCreate = useCallback(() => {
    openModal(<ProductCreateModal parishId={parishId} onCancelAction={closeModal} />)
  }, [parishId, openModal, closeModal])

  return {
    productCreate
  }
}