"use client"

import { useCallback } from 'react'

import { useModalActions } from '@/shared'
import { ProductCreateModal } from '../../ui';
import { ProductWithRelations } from '@/entities';

export const useAddProduct = ({ parishId, onSuccessAction }: { parishId: string, onSuccessAction: (product: ProductWithRelations) => void }) => {
  const { openModal, closeModal } = useModalActions();

  const productCreate = useCallback(() => {
    openModal(<ProductCreateModal parishId={parishId} onSuccessAction={onSuccessAction} onCancelAction={closeModal} />)
  }, [parishId, openModal, closeModal])

  return {
    productCreate
  }
}