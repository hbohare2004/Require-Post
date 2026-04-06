import { z } from 'zod';

// ─── Step 1 ──────────────────────────────────────────────────────────────────
export const step1Schema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  eventType: z.enum(['Wedding', 'Corporate', 'Party', 'Concert', 'Other'], {
    required_error: 'Please select an event type',
  }),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  venue: z.string().optional(),
  category: z.enum(['planner', 'performer', 'crew'], {
    required_error: 'Please select a hiring category',
  }),
});

// ─── Planner ─────────────────────────────────────────────────────────────────
export const plannerStep2Schema = z.object({
  budget: z.coerce
    .number({ invalid_type_error: 'Budget must be a number' })
    .positive('Budget must be a positive number'),
  guestCount: z.coerce
    .number({ invalid_type_error: 'Guest count must be a number' })
    .int('Guest count must be a whole number')
    .positive('Guest count must be a positive number'),
});

export const plannerStep3Schema = z.object({
  servicesRequired: z
    .array(z.string())
    .min(1, 'Please select at least one service'),
  experienceLevel: z.enum(['Junior', 'Mid-Level', 'Senior', 'Expert'], {
    required_error: 'Please select an experience level',
  }),
});

// ─── Performer ────────────────────────────────────────────────────────────────
export const performerStep2Schema = z.object({
  performanceType: z.string().min(1, 'Performance type is required'),
  genre: z.string().min(1, 'Genre is required'),
});

export const performerStep3Schema = z.object({
  duration: z.coerce
    .number({ invalid_type_error: 'Duration must be a number' })
    .positive('Duration must be at least 1 hour'),
  equipmentNeeded: z.boolean(),
});

// ─── Crew ─────────────────────────────────────────────────────────────────────
export const crewStep2Schema = z.object({
  crewType: z.string().min(1, 'Crew type is required'),
  numberOfPeople: z.coerce
    .number({ invalid_type_error: 'Number of people must be a number' })
    .int('Must be a whole number')
    .positive('Must require at least 1 person'),
});

export const crewStep3Schema = z.object({
  shiftTiming: z.string().min(1, 'Shift timing is required'),
  experienceRequired: z.enum(['Junior', 'Mid-Level', 'Senior', 'Expert'], {
    required_error: 'Please select an experience level',
  }),
});

export type Step1Values = z.infer<typeof step1Schema>;
export type PlannerStep2Values = z.infer<typeof plannerStep2Schema>;
export type PlannerStep3Values = z.infer<typeof plannerStep3Schema>;
export type PerformerStep2Values = z.infer<typeof performerStep2Schema>;
export type PerformerStep3Values = z.infer<typeof performerStep3Schema>;
export type CrewStep2Values = z.infer<typeof crewStep2Schema>;
export type CrewStep3Values = z.infer<typeof crewStep3Schema>;
