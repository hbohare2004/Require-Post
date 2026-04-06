'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  plannerStep3Schema,
  performerStep3Schema,
  crewStep3Schema,
  PlannerStep3Values,
  PerformerStep3Values,
  CrewStep3Values,
} from '@/lib/schemas';
import { useFormContext } from '@/context/FormContext';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { Step3Data } from '@/types';

const EXPERIENCE_LEVELS = [
  { value: 'Junior', label: 'Junior (0–2 years)' },
  { value: 'Mid-Level', label: 'Mid-Level (2–5 years)' },
  { value: 'Senior', label: 'Senior (5–10 years)' },
  { value: 'Expert', label: 'Expert (10+ years)' },
];

const PLANNER_SERVICES = [
  'Decoration',
  'Catering',
  'Logistics',
  'Entertainment',
  'Photography',
  'Floral Design',
  'Transportation',
  'Audio/Visual',
];

const NavButtons = ({
  onBack,
  isSubmit = false,
}: {
  onBack: () => void;
  isSubmit?: boolean;
}) => (
  <div className="flex justify-between pt-2">
    <Button type="button" variant="secondary" onClick={onBack}>
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </Button>
    <Button type="submit" size="lg">
      {isSubmit ? 'Review & Submit' : 'Continue'}
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Button>
  </div>
);

// ─── Planner Step 3 ───────────────────────────────────────────────────────────
function PlannerFields({
  defaultValues,
  onNext,
  onBack,
}: {
  defaultValues?: PlannerStep3Values;
  onNext: (data: PlannerStep3Values) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PlannerStep3Values>({
    resolver: zodResolver(plannerStep3Schema),
    defaultValues: defaultValues ?? { servicesRequired: [], experienceLevel: undefined },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <FormField
        label="Services Required"
        required
        error={errors.servicesRequired?.message}
        hint="Select all that apply"
      >
        <Controller
          control={control}
          name="servicesRequired"
          render={({ field }) => (
            <MultiSelect
              options={PLANNER_SERVICES}
              value={field.value}
              onChange={field.onChange}
              error={!!errors.servicesRequired}
            />
          )}
        />
      </FormField>

      <FormField label="Experience Level Required" required error={errors.experienceLevel?.message}>
        <Select
          {...register('experienceLevel')}
          options={EXPERIENCE_LEVELS}
          placeholder="Select experience level"
          error={!!errors.experienceLevel}
        />
      </FormField>

      <NavButtons onBack={onBack} isSubmit />
    </form>
  );
}

// ─── Performer Step 3 ─────────────────────────────────────────────────────────
function PerformerFields({
  defaultValues,
  onNext,
  onBack,
}: {
  defaultValues?: PerformerStep3Values;
  onNext: (data: PerformerStep3Values) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PerformerStep3Values>({
    resolver: zodResolver(performerStep3Schema),
    defaultValues: defaultValues ?? { duration: undefined, equipmentNeeded: false },
  });

  const equipmentNeeded = watch('equipmentNeeded');

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <FormField
        label="Performance Duration (hours)"
        required
        error={errors.duration?.message}
      >
        <Input
          {...register('duration')}
          type="number"
          min={0.5}
          step={0.5}
          placeholder="e.g. 2"
          error={!!errors.duration}
        />
      </FormField>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Equipment Needed?</p>
        <div className="flex gap-3">
          {[
            { value: true, label: 'Yes — provide equipment' },
            { value: false, label: 'No — self-equipped' },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => setValue('equipmentNeeded', opt.value, { shouldValidate: true })}
              className={[
                'flex-1 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all',
                equipmentNeeded === opt.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <NavButtons onBack={onBack} isSubmit />
    </form>
  );
}

// ─── Crew Step 3 ──────────────────────────────────────────────────────────────
function CrewFields({
  defaultValues,
  onNext,
  onBack,
}: {
  defaultValues?: CrewStep3Values;
  onNext: (data: CrewStep3Values) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrewStep3Values>({
    resolver: zodResolver(crewStep3Schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <FormField
        label="Shift Timing"
        required
        error={errors.shiftTiming?.message}
        hint="e.g. 08:00 AM – 06:00 PM, or Morning Shift"
      >
        <Input
          {...register('shiftTiming')}
          placeholder="e.g. 9:00 AM – 5:00 PM"
          error={!!errors.shiftTiming}
        />
      </FormField>

      <FormField label="Experience Required" required error={errors.experienceRequired?.message}>
        <Select
          {...register('experienceRequired')}
          options={EXPERIENCE_LEVELS}
          placeholder="Select experience level"
          error={!!errors.experienceRequired}
        />
      </FormField>

      <NavButtons onBack={onBack} isSubmit />
    </form>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function Step3AdditionalDetails() {
  const { state, setStep3, nextStep, prevStep } = useFormContext();
  const category = state.step1?.category;

  const handleNext = (data: Step3Data) => {
    setStep3(data);
    nextStep();
  };

  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {category === 'planner' && 'Services & Experience'}
          {category === 'performer' && 'Performance Requirements'}
          {category === 'crew' && 'Shift & Experience'}
        </h2>
        <p className="mt-1 text-sm text-gray-500">Almost done — a few more details</p>
      </div>

      {category === 'planner' && (
        <PlannerFields
          defaultValues={state.step3 as PlannerStep3Values | undefined}
          onNext={handleNext}
          onBack={prevStep}
        />
      )}
      {category === 'performer' && (
        <PerformerFields
          defaultValues={state.step3 as PerformerStep3Values | undefined}
          onNext={handleNext}
          onBack={prevStep}
        />
      )}
      {category === 'crew' && (
        <CrewFields
          defaultValues={state.step3 as CrewStep3Values | undefined}
          onNext={handleNext}
          onBack={prevStep}
        />
      )}
    </div>
  );
}
