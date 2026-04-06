'use client';

import React, { useState } from 'react';
import { FormProvider, useFormContext } from '@/context/FormContext';
import { StepIndicator } from './StepIndicator';
import { Step1EventBasics } from './steps/Step1EventBasics';
import { Step2CategoryFields } from './steps/Step2CategoryFields';
import { Step3AdditionalDetails } from './steps/Step3AdditionalDetails';
import { Step4Review } from './steps/Step4Review';
import { SuccessMessage } from './SuccessMessage';

function FormContent() {
  const { state, resetForm } = useFormContext();
  const [submitted, setSubmitted] = useState(false);

  const handleSuccess = () => setSubmitted(true);
  const handleReset = () => {
    resetForm();
    setSubmitted(false);
  };

  if (submitted) {
    return <SuccessMessage onReset={handleReset} />;
  }

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={state.currentStep} />

      <div key={state.currentStep}>
        {state.currentStep === 1 && <Step1EventBasics />}
        {state.currentStep === 2 && <Step2CategoryFields />}
        {state.currentStep === 3 && <Step3AdditionalDetails />}
        {state.currentStep === 4 && <Step4Review onSuccess={handleSuccess} />}
      </div>
    </div>
  );
}

export function MultiStepForm() {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  );
}
