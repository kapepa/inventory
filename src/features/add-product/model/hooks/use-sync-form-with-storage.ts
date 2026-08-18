"use client"

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductCreateFormValues } from "../schemas-client";
import { STORAGE_KEYS } from "@/shared/constants/storage-keys";

const ADD_PRODUCT_FORM_DATA = STORAGE_KEYS.ADD_PRODUCT_FORM_DATA

export const useSyncFormWithStorage = (
  form: UseFormReturn<ProductCreateFormValues>,
  parishId: string,
) => {
  // Restore on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem(ADD_PRODUCT_FORM_DATA);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.parishId === parishId) {
          form.reset({
            ...parsedData,
            parishId, // Always use the current parishId
          })
        } else {
          sessionStorage.removeItem(ADD_PRODUCT_FORM_DATA)
        };
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parishId]);

  // Save data to sessionStorage on change
  useEffect(() => {
    const subscription = form.watch((values) => {
      // Filter out File objects and invalid photo values before saving
      const sanitizedValues = {
        ...values,
        photo: values.photo instanceof File ? undefined : values.photo,
      }

      // Preserve categoryId from storage if current value is empty
      const existingData = sessionStorage.getItem(ADD_PRODUCT_FORM_DATA);
      if (existingData && (!sanitizedValues.categoryId || sanitizedValues.categoryId === '')) {
        try {
          const parsed = JSON.parse(existingData);
          if (parsed.categoryId) {
            sanitizedValues.categoryId = parsed.categoryId;
          }
        } catch (e) {
          // ignore parse errors
        }
      }

      sessionStorage.setItem(ADD_PRODUCT_FORM_DATA, JSON.stringify(sanitizedValues));
    });
    return () => subscription.unsubscribe();
  }, [form]);
};