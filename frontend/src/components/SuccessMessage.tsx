'use client';

import React from 'react';
import { Button } from './ui/Button';

interface SuccessMessageProps {
  onReset: () => void;
}

export function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 text-center animate-slide-up">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-10 w-10 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Requirement Posted!</h2>
        <p className="text-gray-500 max-w-sm">
          Your requirement has been submitted successfully. We&apos;ll match you with the best
          candidates shortly.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onReset} variant="primary" size="lg">
          Post Another Requirement
        </Button>
      </div>
    </div>
  );
}
