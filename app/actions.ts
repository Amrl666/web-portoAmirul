'use server';

import { createClient } from 'next-sanity';
import { revalidatePath } from 'next/cache';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

export async function addMessage(formData: FormData) {
  const name = formData.get('name') as string;
  const message = formData.get('message') as string;

  if (!name || !message) {
    throw new Error('Name and message are required');
  }

  if (message.length > 140) {
    throw new Error('Message must be 140 characters or less');
  }

  try {
    await writeClient.create({
      _type: 'chat',
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    });

    revalidatePath('/guestbook');
    return { success: true };
  } catch (error) {
    console.error('Failed to add message:', error);
    throw new Error('Failed to submit message. Please try again.');
  }
}

export async function deleteMessage(messageId: string, adminKey?: string) {
  // Simple admin verification
  if (adminKey !== process.env.GUESTBOOK_ADMIN_KEY) {
    throw new Error('Unauthorized');
  }

  try {
    await writeClient.delete(messageId);
    revalidatePath('/guestbook');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete message:', error);
    throw new Error('Failed to delete message. Please try again.');
  }
}
