'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, Step1Values } from '@/lib/schemas';
import { useFormContext } from '@/context/FormContext';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

const EVENT_TYPES = [
  { value: 'Wedding', label: 'Wedding' },
  { value: 'Corporate', label: 'Corporate' },
  { value: 'Party', label: 'Party' },
  { value: 'Concert', label: 'Concert' },
  { value: 'Other', label: 'Other' },
];

const CATEGORIES = [
  {
    value: 'planner',
    label: 'Event Planner',
    description: 'Full-service planning & coordination',
    icon: '🎯',
  },
  {
    value: 'performer',
    label: 'Performer',
    description: 'Singers, DJs, bands & entertainers',
    icon: '🎤',
  },
  {
    value: 'crew',
    label: 'Crew',
    description: 'Photographers, security & support staff',
    icon: '🎬',
  },
];

export function Step1EventBasics() {
  const { state, setStep1, nextStep } = useFormContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: state.step1 ?? {
      eventName: '',
      eventType: undefined,
      startDate: '',
      endDate: '',
      location: '',
      venue: '',
      category: undefined,
    },
  });

  const selectedCategory = watch('category');

  const onSubmit = (data: Step1Values) => {
    setStep1(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Event Basics</h2>
        <p className="mt-1 text-sm text-gray-500">Tell us about your event</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormField label="Event Name" required error={errors.eventName?.message}>
            <Input
              {...register('eventName')}
              placeholder="e.g. Annual Company Gala"
              error={!!errors.eventName}
            />
          </FormField>
        </div>

        <FormField label="Event Type" required error={errors.eventType?.message}>
          <Select
            {...register('eventType')}
            options={EVENT_TYPES}
            placeholder="Select event type"
            error={!!errors.eventType}
          />
        </FormField>

        <FormField label="Location" required error={errors.location?.message}>
          <Input
            {...register('location')}
            placeholder="e.g. New York, NY"
            error={!!errors.location}
          />
        </FormField>

        <FormField label="Start Date" required error={errors.startDate?.message}>
          <Input {...register('startDate')} type="date" error={!!errors.startDate} />
        </FormField>

        <FormField label="End Date" hint="Optional — leave blank for single-day events">
          <Input {...register('endDate')} type="date" />
        </FormField>

        <div className="sm:col-span-2">
          <FormField label="Venue" hint="Optional — specific venue name or address">
            <Input {...register('venue')} placeholder="e.g. Grand Ballroom, Hilton Hotel" />
          </FormField>
        </div>
      </div>

      {/* Hiring Category */}
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700">
            Hiring Category <span className="text-red-500">*</span>
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Who are you looking to hire?</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setValue('category', cat.value as 'planner' | 'performer' | 'crew', { shouldValidate: true })}
              className={[
                'flex flex-col items-start gap-1.5 rounded-xl border-2 p-4 text-left transition-all duration-150',
                selectedCategory === cat.value
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300',
              ].join(' ')}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="font-semibold text-sm text-gray-900">{cat.label}</span>
              <span className="text-xs text-gray-500">{cat.description}</span>
            </button>
          ))}
        </div>

        {errors.category && (
          <p className="text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-2">
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
