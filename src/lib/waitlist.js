import emailjs from 'emailjs-com';
import { supabase } from './supabaseClient';

// Same EmailJS service + template the team already receives signups on.
const SERVICE_ID = 'service_ueib6xh';
const TEMPLATE_ID = 'template_gby2nre';
const PUBLIC_KEY = 'd6TDjzKXpICXorApk';

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const UNIQUE_VIOLATION = '23505';

/**
 * Adds an email to the waitlist.
 *
 * 1. Stores it in the Supabase `waitlist` table (see supabase/migrations).
 * 2. Sends the existing EmailJS notification so the team still gets an email.
 *
 * Succeeds if either step works, so signups keep flowing even before the
 * migration has been run. Resolves to `{ alreadyJoined }`.
 */
export async function joinWaitlist(rawEmail, source = 'Landing page') {
  const email = rawEmail.trim().toLowerCase();

  const { error: dbError } = await supabase.from('waitlist').insert({ email, source });

  if (dbError?.code === UNIQUE_VIOLATION) {
    return { alreadyJoined: true };
  }
  if (dbError) {
    console.warn('Waitlist: could not store signup in Supabase, falling back to email only.', dbError);
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_email: email,
        from_name: 'Waitlist User',
        industry: 'N/A',
        stage: 'N/A',
        expectation: `Joined from: ${source}`,
      },
      PUBLIC_KEY
    );
  } catch (emailError) {
    // Stored in the database is good enough; only fail if both paths failed.
    if (dbError) throw emailError;
    console.warn('Waitlist: stored in Supabase but the email notification failed.', emailError);
  }

  return { alreadyJoined: false };
}
