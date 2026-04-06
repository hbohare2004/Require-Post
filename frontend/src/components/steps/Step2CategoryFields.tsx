'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  plannerStep2Schema,
  performerStep2Schema,
  crewStep2Schema,
  PlannerStep2Values,
  PerformerStep2Values,
  CrewStep2Values,
} from '@/lib/schemas';
import { useFormContext } from '@/context/FormContext';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Step2Data } from '@/types';

const PERFORMANCE_TYPES = [
  { value: 'Singer', label: 'Singer' },
  { value: 'DJ', label: 'DJ' },
  { value: 'Band', label: 'Band' },
  { value: 'Dancer', label: 'Dancer' },
  { value: 'Comedian', label: 'Comedian' },
  { value: 'Magician', label: 'Magician' },
  { value: 'Other', label: 'Other' },
];

const CREW_TYPES = [
  { value: 'Photographer', label: 'Photographer' },
  { value: 'Videographer', label: 'Videographer' },
  { value: 'Security', label: 'Security' },
  { value: 'Stage Manager', label: 'Stage Manager' },
  { value: 'Sound Engineer', label: 'Sound Engineer' },
  { value: 'Lighting Technician', label: 'Lighting Technician' },
  { value: 'Other', label: 'Other' },
];

// ─── Planner Step 2 ───────────────────────────────────────────────────────────
function PlannerFields({
  defaultValues,
  onNext,
  onBack,
}: {
  defaultValues?: PlannerStep2Values;
  onNext: (data: PlannerStep2Values) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlannerStep2Values>({
    resolver: zodResolver(plannerStep2Schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <FormField label="Budget (USD)" required error={errors.budget?.message}>
        <Input
          {...register('budget')}
          type="number"
          min={0}
          placeholder="e.g. 15000"
          error={!!errors.budget}
        />
      </FormField>

      <FormField label="Expected Guest Count" required error={errors.guestCount?.message}>
        <Input
          {...register('guestCount')}
          type="number"
          min={1}
          placeholder="e.g. 200"
          error={!!errors.guestCount}
        />
      </FormField>

      <div className="flex justify-between pt-2">
        <Button type="button" variant="secondary" onClick={onBack}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Button type="submit" size="lg">
          Continue
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </form>
  );
}

// ─── Performer Step 2 ─────────────────────────────────────────────────────────
function PerformerFields({
  defaultValues,
  onNext,
  onBack,
}: {
  defaultValues?: PerformerStep2Values;
  onNext: (data: PerformerStep2Values) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PerformerStep2Values>({
    resolver: zodResolver(performerStep2Schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <FormField label="Performance Type" required error={errors.performanceType?.message}>
        <Select
          {...register('performanceType')}
          options={PERFORMANCE_TYPES}
          placeholder="Select performance type"
          error={!!errors.performanceType}
        />
      </FormField>

      <FormField label="Genre / Style" required error={errors.genre?.message}>
        <Input
          {...register('genre')}
          placeholder="e.g. Jazz, Pop, Hip-Hop, Classical"
          error={!!errors.genre}
        />
      </FormField>

      <div className="flex justify-between pt-2">
        <Button type="button" variant="secondary" onClick={onBack}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Button type="submit" size="lg">
          Continue
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </form>
  );
}

// ─── Crew Step 2 ──────────────────────────────────────────────────────────────
function CrewFields({
  defaultValues,
  onNext,
  onBack,
}: {
  defaultValues?: CrewStep2Values;
  onNext: (data: CrewStep2Values) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrewStep2Values>({
    resolver: zodResolver(crewStep2Schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <FormField label="Crew Type" required error={errors.crewType?.message}>
        <Select
          {...register('crewType')}
          options={CREW_TYPES}
          placeholder="Select crew type"
          error={!!errors.crewType}
        />
      </FormField>

      <FormField label="Number of People Required" required error={errors.numberOfPeople?.message}>
        <Input
          {...register('numberOfPeople')}
          type="number"
          min={1}
          placeholder="e.g. 5"
          error={!!errors.numberOfPeople}
        />
      </FormField>

      <div className="flex justify-between pt-2">
        <Button type="button" variant="secondary" onClick={onBack}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Button type="submit" size="lg">
          Continue
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </form>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function Step2CategoryFields() {
  const { state, setStep2, nextStep, prevStep } = useFormContext();
  const category = state.step1?.category;

  const handleNext = (data: Step2Data) => {
    setStep2(data);
    nextStep();
  };

  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {category === 'planner' && 'Event Planner Details'}
          {category === 'performer' && 'Performer Details'}
          {category === 'crew' && 'Crew Details'}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Provide specifics about the {category} you need
        </p>
      </div>

      {category === 'planner' && (
        <PlannerFields
          defaultValues={state.step2 as PlannerStep2Values | undefined}
          onNext={handleNext}
          onBack={prevStep}
        />
      )}
      {category === 'performer' && (
        <PerformerFields
          defaultValues={state.step2 as PerformerStep2Values | undefined}
          onNext={handleNext}
          onBack={prevStep}
        />
      )}
      {category === 'crew' && (
        <CrewFields
          defaultValues={state.step2 as CrewStep2Values | undefined}
          onNext={handleNext}
          onBack={prevStep}
        />
      )}
    </div>
  );
}
