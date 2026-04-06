import { RequirementPayload } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function postRequirement(payload: RequirementPayload): Promise<{ success: boolean; message: string }> {
  if (!API_URL) {
    throw new Error('API URL is not configured. Set NEXT_PUBLIC_API_URL in the frontend environment.');
  }

  try {
    const res = await fetch(`${API_URL}/api/requirements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.message || `Failed to submit requirement (${res.status})`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Unable to connect to the server. Please try again.');
  }
}
