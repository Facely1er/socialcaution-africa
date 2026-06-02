import { africaCountries } from './countries';

export type ScamIncident = {
  id: string;
  title: string;
  pattern: string;
  whatToDo: string;
  relatedScam: string;
};

export const scamIncidents: ScamIncident[] = [
  {
    id: 'fake-reversal-sms',
    title: 'Fake mobile-money reversal SMS',
    pattern: 'You receive an SMS claiming money was sent to you by mistake and asking you to return it via USSD or agent.',
    whatToDo: 'Do not send funds. Open your official wallet app and verify the transaction history before responding.',
    relatedScam: 'Mobile money fraud',
  },
  {
    id: 'whatsapp-family-emergency',
    title: 'WhatsApp family emergency request',
    pattern: 'A contact with a familiar photo asks for urgent airtime, fees, or mobile-money transfer.',
    whatToDo: 'Call the person on a known phone number. Do not pay until identity is confirmed out-of-band.',
    relatedScam: 'WhatsApp and social impersonation',
  },
  {
    id: 'telegram-investment-group',
    title: 'Telegram / WhatsApp investment group',
    pattern: 'High-return crypto or forex schemes with screenshots of payouts and pressure to recruit others.',
    whatToDo: 'Treat guaranteed returns as fraud. Report to your bank and national cybercrime channels if you paid.',
    relatedScam: 'Fake investment and job schemes',
  },
  {
    id: 'job-application-fee',
    title: 'Paid job application or training fee',
    pattern: 'Fake recruiters request ID copies, registration fees, or training payments before employment.',
    whatToDo: 'Legitimate employers rarely charge upfront fees. Do not share ID without watermarking purpose and recipient.',
    relatedScam: 'Fake investment and job schemes',
  },
  {
    id: 'sim-swap-pin',
    title: 'SIM swap after PIN/OTP sharing',
    pattern: 'Caller impersonates bank or telco support and asks for OTP, PIN, or SIM reactivation codes.',
    whatToDo: 'Never share OTP/PIN. Contact your provider using the number on your SIM pack or official app.',
    relatedScam: 'Mobile money fraud',
  },
];

export const warningTemplates = [
  {
    title: 'Family group warning (WhatsApp)',
    body: 'Reminder: We do not send money requests only by chat. If you get an urgent payment message, call me on my usual number first.',
  },
  {
    title: 'SME staff alert (SMS/email)',
    body: 'Do not approve payments from email links alone. Verify vendor bank details by phone using a number from our official records.',
  },
  {
    title: 'School / parent notice',
    body: 'Children should not share full ID photos or OTP codes in class groups. Report suspicious links to the school IT contact.',
  },
];

export const countryReportingLinks = africaCountries.map((country) => ({
  slug: country.slug,
  name: country.name,
  authority: country.authority,
  authorityUrl: country.authorityUrl,
  cybercrimeReportingUrl: country.cybercrimeReportingUrl,
  financialFraudChannel: country.financialFraudChannel,
  confidenceLevel: country.confidenceLevel,
}));
