'use client';

import React, { useState } from 'react';
import { useFormContext } from '@/context/FormContext';
import { Button } from '@/components/ui/Button';
import { postRequirement } from '@/lib/api';
import {
  PlannerStep2Data,
  PlannerStep3Data,
  PerformerStep2Data,
  PerformerStep3Data,
  CrewStep2Data,
  CrewStep3Data,
} from '@/types';

interface ReviewItemProps {
  label: string;
  value?: string | number | boolean | string[] | null;
}

function ReviewItem({ label, value }: ReviewItemProps) {
  if (value === undefined || value === null || value === '') return null;

  let display: string;
  if (typeof value === 'boolean') {
    display = value ? 'Yes' : 'No';
  } else if (Array.isArray(value)) {
    display = value.join(', ');
  } else {
    display = String(value);
  }

  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right">{display}</span>
    </div>
  );
}

interface ReviewSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

function ReviewSection({ title, icon, children }: ReviewSectionProps) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 border-b border-gray-200">
        <span className="text-base">{icon}</span>
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="px-4 py-1">{children}</div>
    </div>
  );
}

interface Step4ReviewProps {
  onSuccess: () => void;
}

export function Step4Review({ onSuccess }: Step4ReviewProps) {
  const { state, prevStep, resetForm } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { step1, step2, step3 } = state;
  const category = step1?.category;

  const buildCategoryDetails = (): Record<string, unknown> => {
    if (!step2 || !step3) return {};

    if (category === 'planner') {
      return {
        ...(step2 as PlannerStep2Data),
        ...(step3 as PlannerStep3Data),
      };
    }
    if (category === 'performer') {
      return {
        ...(step2 as PerformerStep2Data),
        ...(step3 as PerformerStep3Data),
      };
    }
    if (category === 'crew') {
      return {
        ...(step2 as CrewStep2Data),
        ...(step3 as CrewStep3Data),
      };
    }
    return {};
  };

  const handleSubmit = async () => {
    if (!step1) return;
    setLoading(true);
    setError(null);

    try {
      await postRequirement({
        eventName: step1.eventName,
        eventType: step1.eventType,
        startDate: step1.startDate,
        endDate: step1.endDate,
        location: step1.location,
        venue: step1.venue,
        category: step1.category,
        categoryDetails: buildCategoryDetails(),
      });
      resetForm();
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categoryLabel = {
    planner: 'Event Planner',
    performer: 'Performer',
    crew: 'Crew',
  }[category ?? 'planner'];

  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Review & Submit</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please review your requirement before submitting
        </p>
      </div>

      <div className="space-y-4">
        {/* Event Basics */}
        <ReviewSection title="Event Details" icon="📋">
          <ReviewItem label="Event Name" value={step1?.eventName} />
          <ReviewItem label="Event Type" value={step1?.eventType} />
          <ReviewItem label="Location" value={step1?.location} />
          <ReviewItem label="Venue" value={step1?.venue} />
          <ReviewItem label="Start Date" value={step1?.startDate} />
          <ReviewItem label="End Date" value={step1?.endDate} />
          <ReviewItem label="Hiring Category" value={categoryLabel} />
        </ReviewSection>

        {/* Category Step 2 */}
        {category === 'planner' && step2 && (
          <ReviewSection title="Planner Requirements" icon="🎯">
            <ReviewItem label="Budget" value={`$${(step2 as PlannerStep2Data).budget?.toLocaleString()}`} />
            <ReviewItem label="Guest Count" value={(step2 as PlannerStep2Data).guestCount} />
          </ReviewSection>
        )}
        {category === 'performer' && step2 && (
          <ReviewSection title="Performer Details" icon="🎤">
            <ReviewItem label="Performance Type" value={(step2 as PerformerStep2Data).performanceType} />
            <ReviewItem label="Genre / Style" value={(step2 as PerformerStep2Data).genre} />
          </ReviewSection>
        )}
        {category === 'crew' && step2 && (
          <ReviewSection title="Crew Details" icon="🎬">
            <ReviewItem label="Crew Type" value={(step2 as CrewStep2Data).crewType} />
            <ReviewItem label="Number of People" value={(step2 as CrewStep2Data).numberOfPeople} />
          </ReviewSection>
        )}

        {/* Category Step 3 */}
        {category === 'planner' && step3 && (
          <ReviewSection title="Services & Experience" icon="✨">
            <ReviewItem label="Services Required" value={(step3 as PlannerStep3Data).servicesRequired} />
            <ReviewItem label="Experience Level" value={(step3 as PlannerStep3Data).experienceLevel} />
          </ReviewSection>
        )}
        {category === 'performer' && step3 && (
          <ReviewSection title="Performance Requirements" icon="🎵">
            <ReviewItem label="Duration" value={`${(step3 as PerformerStep3Data).duration} hour(s)`} />
            <ReviewItem label="Equipment Needed" value={(step3 as PerformerStep3Data).equipmentNeeded} />
          </ReviewSection>
        )}
        {category === 'crew' && step3 && (
          <ReviewSection title="Shift & Experience" icon="⏰">
            <ReviewItem label="Shift Timing" value={(step3 as CrewStep3Data).shiftTiming} />
            <ReviewItem label="Experience Required" value={(step3 as CrewStep3Data).experienceRequired} />
          </ReviewSection>
        )}
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-between pt-2">
        <Button type="button" variant="secondary" onClick={prevStep} disabled={loading}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Button onClick={handleSubmit} loading={loading} size="lg">
          Submit Requirement
        </Button>
      </div>
    </div>
  );
}
