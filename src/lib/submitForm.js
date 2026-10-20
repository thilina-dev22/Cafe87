import { siteConfig } from '../data/siteData';

// Posts to Web3Forms. Rejects on a missing key, network failure or API error so the
// UI never shows "sent" for a message that did not go anywhere.
export async function submitForm(payload) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || siteConfig.web3formsAccessKey;
  if (!accessKey) throw new Error('Form service is not configured');

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: accessKey, ...payload }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) throw new Error(data.message || 'Submission failed');
}

export const whatsappLink = (text) =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
