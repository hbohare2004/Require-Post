export type EventType = 'Wedding' | 'Corporate' | 'Party' | 'Concert' | 'Other';
export type HiringCategory = 'planner' | 'performer' | 'crew';
export type ExperienceLevel = 'Junior' | 'Mid-Level' | 'Senior' | 'Expert';

// ─── Step 1 ──────────────────────────────────────────────────────────────────
export interface Step1Data {
  eventName: string;
  eventType: EventType;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  category: HiringCategory;
}

// ─── Step 2 (primary category fields) ────────────────────────────────────────
export interface PlannerStep2Data {
  budget: number;
  guestCount: number;
}

export interface PerformerStep2Data {
  performanceType: string;
  genre: string;
}

export interface CrewStep2Data {
  crewType: string;
  numberOfPeople: number;
}

export type Step2Data = PlannerStep2Data | PerformerStep2Data | CrewStep2Data;

// ─── Step 3 (secondary category fields) ──────────────────────────────────────
export interface PlannerStep3Data {
  servicesRequired: string[];
  experienceLevel: ExperienceLevel;
}

export interface PerformerStep3Data {
  duration: number;
  equipmentNeeded: boolean;
}

export interface CrewStep3Data {
  shiftTiming: string;
  experienceRequired: ExperienceLevel;
}

export type Step3Data = PlannerStep3Data | PerformerStep3Data | CrewStep3Data;

// ─── Full form state ──────────────────────────────────────────────────────────
export interface FormState {
  currentStep: number;
  step1: Step1Data | null;
  step2: Step2Data | null;
  step3: Step3Data | null;
}

// ─── API payload ──────────────────────────────────────────────────────────────
export interface RequirementPayload {
  eventName: string;
  eventType: EventType;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  category: HiringCategory;
  categoryDetails: Record<string, unknown>;
}
