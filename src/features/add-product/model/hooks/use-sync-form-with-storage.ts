"use client"

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductCreateFormValues } from "../schemas-client";
import { STORAGE_KEYS } from "@/shared/constants";

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
          }, { keepDefaultValues: true })
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
        photo: values.photo instanceof File ? undefined : values.photo
      }
      sessionStorage.setItem(ADD_PRODUCT_FORM_DATA, JSON.stringify(sanitizedValues));
    });
    return () => subscription.unsubscribe();
  }, [form]);
};