import emailjs from 'emailjs-com';

// Same EmailJS service + template the /waitlist page uses, so every signup
// lands in the same inbox regardless of where it came from.
const SERVICE_ID = 'service_ueib6xh';
const TEMPLATE_ID = 'template_gby2nre';
const PUBLIC_KEY = 'd6TDjzKXpICXorApk';

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function joinWaitlist(email, source = 'Landing page') {
  return emailjs.send(
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
}
