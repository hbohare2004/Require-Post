'use client';

import React from 'react';

interface Step {
  number: number;
  label: string;
}

const STEPS: Step[] = [
  { number: 1, label: 'Event Basics' },
  { number: 2, label: 'Category Fields' },
  { number: 3, label: 'More Details' },
  { number: 4, label: 'Review' },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-200 z-0">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {STEPS.map((step) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <div key={step.number} className="flex flex-col items-center gap-2 z-10">
              <div
                className={[
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300',
                  isCompleted
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                    : isActive
                    ? 'bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-100'
                    : 'bg-white border-gray-300 text-gray-400',
                ].join(' ')}
              >
                {isCompleted ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={[
                  'text-xs font-medium whitespace-nowrap hidden sm:block',
                  isActive ? 'text-blue-600' : isCompleted ? 'text-gray-600' : 'text-gray-400',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: show current step label */}
      <div className="mt-3 text-center sm:hidden">
        <span className="text-sm font-medium text-blue-600">
          Step {currentStep}: {STEPS[currentStep - 1]?.label}
        </span>
      </div>
    </div>
  );
}
