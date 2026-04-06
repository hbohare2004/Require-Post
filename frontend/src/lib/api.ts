import { RequirementPayload } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function postRequirement(payload: RequirementPayload): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_URL}/api/requirements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to submit requirement');
  }

  return data;
}
