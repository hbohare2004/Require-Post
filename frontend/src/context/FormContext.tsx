'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import { FormState, Step1Data, Step2Data, Step3Data } from '@/types';

interface FormContextValue {
  state: FormState;
  setStep1: (data: Step1Data) => void;
  setStep2: (data: Step2Data) => void;
  setStep3: (data: Step3Data) => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

const initialState: FormState = {
  currentStep: 1,
  step1: null,
  step2: null,
  step3: null,
};

const FormContext = createContext<FormContextValue | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FormState>(initialState);

  const setStep1 = useCallback((data: Step1Data) => {
    setState((prev) => ({ ...prev, step1: data }));
  }, []);

  const setStep2 = useCallback((data: Step2Data) => {
    setState((prev) => ({ ...prev, step2: data }));
  }, []);

  const setStep3 = useCallback((data: Step3Data) => {
    setState((prev) => ({ ...prev, step3: data }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 4) }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 1) }));
  }, []);

  const resetForm = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <FormContext.Provider
      value={{ state, setStep1, setStep2, setStep3, goToStep, nextStep, prevStep, resetForm }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormContext must be used inside FormProvider');
  return ctx;
}
