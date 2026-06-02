import { BookOpen, List } from 'lucide-react';

export interface GuideSection {
  heading: string;
  text: string;
  steps?: string[];
  tips?: string[];
  warnings?: string[];
}

export interface PrivacyGuide {
  id: string;
  title: string;
  description: string;
  platform: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeToComplete: string;
  lastUpdated: string;
  sections: GuideSection[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PrivacyChecklist {
  id: string;
  title: string;
  description: string;
  platform: string;
  timeToComplete: string;
  lastUpdated: string;
  categories: { name: string; items: ChecklistItem[] }[];
}

/** Estimate completion time from checklist items (~4 min easy, ~6 min medium, ~8 min hard) */
function estimateChecklistTime(categories: { items: ChecklistItem[] }[]): string {
  let minutes = 0;
  for (const category of categories) {
    for (const item of category.items) {
      minutes += item.difficulty === 'hard' ? 8 : item.difficulty === 'medium' ? 6 : 4;
    }
  }
  const rounded = Math.max(10, Math.ceil(minutes / 5) * 5);
  return `${rounded} minutes`;
}

type GuideDef = Omit<PrivacyGuide, 'id'>;

const section = (
  heading: string,
  text: string,
  steps: string[],
  tips: string[] = [],
  warnings: string[] = []
): GuideSection => ({ heading, text, steps, tips, warnings });

const g = (
  title: string,
  description: string,
  platform: string,
  difficulty: GuideDef['difficulty'],
  timeToComplete: string,
  sections: GuideSection[]
): GuideDef => ({
  title,
  description,
  platform,
  difficulty,
  timeToComplete,
  lastUpdated: '2025-05-30',
  sections
});

const GUIDES: Record<string, GuideDef> = {
  'understanding-privacy': g(
    'Understanding Your Privacy Rights',
    'Learn what personal data is, who collects it, and what rights you have over it.',
    'General',
    'beginner',
    '30 minutes',
    [section(
      'Privacy fundamentals',
      'Digital privacy is about controlling who can access your personal information and how it is used.',
      [
        'List the types of data you share online (email, phone, location, purchases)',
        'Identify which services hold the most sensitive data about you',
        'Review privacy laws that apply in your region (GDPR, CCPA, etc.)',
        'Document your top three privacy concerns to focus your efforts'
      ],
      ['Start with accounts you use daily — email and social media', 'Privacy is a process, not a one-time fix'],
      ['Default settings usually favor data collection, not protection']
    )]
  ),
  'password-management': g(
    'Password Management Guide',
    'Create, store, and rotate strong passwords without reusing credentials.',
    'General',
    'beginner',
    '30 minutes',
    [section(
      'Building a password system',
      'A password manager plus unique passwords for every account is the single highest-impact security step.',
      [
        'Choose a reputable password manager (Bitwarden, 1Password, etc.)',
        'Generate unique 16+ character passwords for email and banking first',
        'Enable two-factor authentication on your password manager vault',
        'Run the built-in breach or reuse audit if your manager offers one',
        'Use our Password Strength Checker to evaluate weak passwords before updating them'
      ],
      ['Never reuse passwords across sites', 'Your master password should be long and memorable only to you'],
      ['Do not store passwords in browser notes or plain text files']
    )]
  ),
  'social-media-security': g(
    'Social Media Security Guide',
    'Lock down social accounts and limit what strangers and advertisers can learn about you.',
    'Social Media',
    'intermediate',
    '45 minutes',
    [section(
      'Account hardening',
      'Social platforms collect extensive data — tighten settings on each network you use.',
      [
        'Set profiles to private or friends-only where possible',
        'Review tagged photos and posts — remove or hide unwanted tags',
        'Audit third-party apps connected to each account and revoke unused ones',
        'Turn off contact syncing and phone-number discovery if not needed',
        'Enable login alerts and two-factor authentication'
      ],
      ['Review settings after every major platform update', 'Separate personal and professional accounts when feasible']
    )]
  ),
  'social-media-privacy': g(
    'Social Media Privacy Settings',
    'A focused walkthrough of visibility, audience, and data-sharing controls.',
    'Social Media',
    'beginner',
    '20 minutes',
    [section(
      'Visibility controls',
      'Limit who can see your activity, location, and contact information.',
      [
        'Set default post audience to friends or a custom list',
        'Disable location tagging on new posts',
        'Hide your friends list and follower counts if the platform allows',
        'Turn off ad personalization based on partner data where available',
        'Review “Off-Facebook activity” or equivalent cross-site tracking settings'
      ],
      ['Settings names differ by platform — search the help center for “privacy”']
    )]
  ),
  'email-security': g(
    'Email Security Best Practices',
    'Protect the account that unlocks password resets for everything else.',
    'Email',
    'intermediate',
    '45 minutes',
    [section(
      'Securing your inbox',
      'Email compromise often leads to full account takeover across other services.',
      [
        'Enable two-factor authentication on your primary email account',
        'Review forwarding rules and filters for unauthorized changes',
        'Check account recovery options — remove outdated phone numbers',
        'Use a unique, strong password stored in a password manager',
        'Be skeptical of urgent messages asking you to click links or share codes'
      ],
      ['Use separate emails for banking vs. newsletters when possible'],
      ['Phishing emails often mimic brands you trust — verify senders carefully']
    )]
  ),
  'mobile-privacy': g(
    'Mobile Device Privacy Guide',
    'Reduce tracking and unnecessary data collection on phones and tablets.',
    'Mobile',
    'intermediate',
    '45 minutes',
    [section(
      'Device settings',
      'Mobile OS settings control location, microphone, and cross-app tracking.',
      [
        'Review location permissions — set to “While Using” or deny for non-essential apps',
        'Disable ad personalization in iOS/Android privacy settings',
        'Audit which apps can access contacts, photos, and microphone',
        'Turn off Bluetooth and Wi-Fi scanning when not needed',
        'Enable automatic security updates'
      ],
      ['Uninstall apps you have not used in six months']
    )]
  ),
  'browser-privacy': g(
    'Browser Privacy Settings',
    'Configure your browser to block trackers and limit fingerprinting.',
    'Browser',
    'beginner',
    '25 minutes',
    [section(
      'Browser configuration',
      'Your browser is the front door to most tracking on the web.',
      [
        'Enable “Do Not Track” or equivalent privacy signals',
        'Block third-party cookies in browser settings',
        'Review site permissions for camera, microphone, and notifications',
        'Clear cookies and site data for trackers you do not need',
        'Consider a privacy-focused browser or hardened Firefox profile'
      ],
      ['Extensions like uBlock Origin complement built-in settings']
    )]
  ),
  'two-factor-authentication': g(
    'Two-Factor Authentication Setup',
    'Add a second verification step so a stolen password alone is not enough.',
    'General',
    'beginner',
    '25 minutes',
    [section(
      'Enabling 2FA',
      'Authenticator apps are more secure than SMS codes when available.',
      [
        'Install an authenticator app (Google Authenticator, Authy, etc.)',
        'Enable 2FA on email, banking, and social accounts first',
        'Save backup codes in your password manager',
        'Register a backup phone or hardware key if the service supports it',
        'Remove old devices from trusted-device lists'
      ],
      ['Prioritize accounts that control password resets'],
      ['Never share one-time codes with anyone — support will never ask for them']
    )]
  ),
  'vpn-setup': g(
    'VPN Setup Guide',
    'Encrypt traffic on untrusted networks and reduce ISP-level visibility.',
    'Network',
    'intermediate',
    '30 minutes',
    [section(
      'Choosing and using a VPN',
      'A VPN protects data in transit but does not make you anonymous by itself.',
      [
        'Select a provider with a clear no-logs policy and independent audits',
        'Install the client on phone, laptop, and tablet',
        'Enable auto-connect on public Wi-Fi if offered',
        'Verify your IP changed using a trusted check site',
        'Disable the VPN temporarily only when a service blocks VPN IPs'
      ],
      ['Free VPNs often monetize by selling user data — avoid them'],
      ['A VPN does not replace HTTPS or good password hygiene']
    )]
  ),
  'ad-blocking': g(
    'Ad and Tracker Blocking',
    'Reduce tracking scripts and malicious ads while browsing.',
    'Browser',
    'beginner',
    '15 minutes',
    [section(
      'Blocking trackers',
      'Ad blockers also block many analytics and fingerprinting scripts.',
      [
        'Install uBlock Origin or a comparable blocker in your browser',
        'Subscribe to reputable filter lists (EasyList, EasyPrivacy)',
        'Test on news sites and video platforms you use regularly',
        'Whitelist sites you want to support if they rely on ethical ads',
        'Enable strict mode on mobile browsers that support content blockers'
      ],
      ['Some sites break with aggressive blocking — adjust per site as needed']
    )]
  ),
  'privacy-search': g(
    'Privacy-Focused Search Engines',
    'Search the web without building a permanent interest profile.',
    'Browser',
    'beginner',
    '10 minutes',
    [section(
      'Switching search providers',
      'Private search engines do not tie queries to advertising profiles.',
      [
        'Try DuckDuckGo, Startpage, or Brave Search for a week',
        'Set your default search engine in each browser you use',
        'Clear old search history from your previous provider if desired',
        'Compare result quality for work-related queries you run often'
      ],
      ['You can still sign into Google when needed without making it the default']
    )]
  ),
  'app-permissions': g(
    'App Permission Management',
    'Revoke access that apps do not need to function.',
    'Mobile',
    'beginner',
    '20 minutes',
    [section(
      'Permission audit',
      'Many apps request broad access “just in case.”',
      [
        'Open system settings and list apps with location access',
        'Revoke microphone and camera access for apps that do not need them',
        'Disable background refresh for apps that do not need live updates',
        'Review notification permissions — mute non-essential alerts',
        'Delete apps that refuse to work without excessive permissions'
      ],
      ['Re-check permissions after major app updates']
    )]
  ),
  'privacy-browsers': g(
    'Privacy Browser Comparison',
    'Pick a browser that balances compatibility, speed, and tracking protection.',
    'Browser',
    'intermediate',
    '20 minutes',
    [section(
      'Evaluating browsers',
      'No browser is perfect — choose based on your threat model and daily sites.',
      [
        'Test Firefox with Enhanced Tracking Protection enabled',
        'Try Brave or Safari for built-in tracker blocking',
        'Compare login and password-manager compatibility with your workflow',
        'Check whether extensions you rely on are available on each browser',
        'Keep one secondary browser for sites that break with strict privacy settings'
      ],
      ['Chromium-based browsers share engine bugs — diversity can help']
    )]
  ),
  'privacy-policies': g(
    'Understanding Privacy Policies',
    'Read legal notices efficiently and spot red flags.',
    'General',
    'intermediate',
    '30 minutes',
    [section(
      'What to look for',
      'Privacy policies describe collection, sharing, retention, and your rights.',
      [
        'Find sections on “Information We Collect” and “How We Share”',
        'Note whether data is sold to third parties or used for ads',
        'Check retention periods and deletion request procedures',
        'Look for opt-out links (CCPA “Do Not Sell,” GDPR erasure)',
        'Bookmark policy change notification methods (email, in-app banner)'
      ],
      ['Policies are legal documents — consult a lawyer for compliance questions'],
      ['“Public” data you post may still be copied by others']
    )]
  ),
  'data-broker-removal': g(
    'Data Broker Opt-Out Guide',
    'Remove your listing from people-search and data-broker sites manually.',
    'Data',
    'advanced',
    '45 minutes',
    [section(
      'Manual opt-out process',
      'Data brokers aggregate public records — opt-out requests are your legal lever.',
      [
        'Search your name on major brokers (Spokeo, WhitePages, BeenVerified)',
        'Submit opt-out forms on each site that lists you',
        'Keep a spreadsheet of request dates and confirmation emails',
        'Re-check listings after 30–90 days — data can reappear',
        'Use our Personal Data Inventory tool to track where your data is held'
      ],
      ['CCPA and similar laws give deletion rights in many jurisdictions'],
      ['There is no automated removal service in this platform — follow each broker’s process']
    )]
  ),
  'cloud-privacy': g(
    'Cloud Storage Privacy',
    'Control what files sync to the cloud and who can access shared links.',
    'Cloud',
    'intermediate',
    '25 minutes',
    [section(
      'Cloud hygiene',
      'Synced folders can expose work documents and photos to provider scanning.',
      [
        'Review which folders are synced vs. stored locally only',
        'Audit shared links — revoke old public URLs',
        'Enable encryption for sensitive archives before upload if possible',
        'Turn off automatic photo backup if you prefer local-only galleries',
        'Check third-party app access to your cloud account'
      ],
      ['Employer policies may restrict personal cloud sync on work devices']
    )]
  ),
  'smart-home-privacy': g(
    'Smart Home Privacy',
    'Limit what voice assistants and IoT devices record and share.',
    'Device',
    'intermediate',
    '30 minutes',
    [section(
      'IoT settings',
      'Smart devices often default to broad data collection.',
      [
        'Review voice recording and human-review settings on assistants',
        'Segment IoT devices on a separate Wi-Fi network if your router supports it',
        'Disable unused features like always-on microphones',
        'Update firmware on cameras, speakers, and hubs',
        'Delete old voice command history periodically'
      ],
      ['A smart camera pointed indoors is a high-value target — patch it regularly']
    )]
  ),
  'digital-wellness': g(
    'Digital Wellness and Privacy',
    'Reduce oversharing and build healthier online habits.',
    'General',
    'beginner',
    '20 minutes',
    [section(
      'Mindful sharing',
      'Less data posted means less data to leak or misuse later.',
      [
        'Pause before posting location-tagged content in real time',
        'Schedule screen-free blocks to reduce impulsive sharing',
        'Review old posts annually and delete outdated personal details',
        'Mute accounts that encourage comparison or oversharing',
        'Use app timers to limit time on high-risk platforms'
      ],
      ['Screenshots and reshares can outlive deleted posts']
    )]
  ),
  'advanced-passwords': g(
    'Advanced Password Management',
    'Use passkeys, hardware keys, and shared vaults safely.',
    'General',
    'advanced',
    '30 minutes',
    [section(
      'Beyond basic passwords',
      'Passkeys and hardware tokens reduce phishing risk significantly.',
      [
        'Enable passkeys on supported accounts (Google, Apple, Microsoft)',
        'Register a FIDO2 security key for high-value accounts',
        'Set up emergency access in your password manager for family',
        'Rotate passwords after any confirmed breach notification',
        'Audit shared vault folders — remove ex-colleagues or old contractors'
      ],
      ['Store backup codes and recovery keys offline in a secure location']
    )]
  ),
  'data-portability': g(
    'Data Portability Guide',
    'Download copies of your data to understand what companies store.',
    'Data',
    'intermediate',
    '30 minutes',
    [section(
      'Exporting your data',
      'GDPR and similar laws grant access and portability rights.',
      [
        'Request a Google Takeout or equivalent export from major platforms',
        'Download Facebook/Instagram data archives',
        'Export health and fitness app history if applicable',
        'Review exported JSON/CSV for surprising data categories',
        'Delete exports securely when you no longer need them'
      ],
      ['Exports can be large — use encrypted storage while reviewing']
    )]
  ),
  'family-privacy': g(
    'Family Privacy Guide',
    'Protect children and shared household accounts.',
    'Family',
    'intermediate',
    '35 minutes',
    [section(
      'Household practices',
      'Families share devices, networks, and accounts — coordinate your approach.',
      [
        'Set parental controls on kids’ devices and streaming accounts',
        'Use separate user profiles on shared computers',
        'Agree on rules for posting photos of children online',
        'Review school app privacy policies (FERPA may apply)',
        'Use a family password manager with limited child vaults'
      ],
      ['Talk openly about phishing and scam messages with all ages']
    )]
  ),
  'parental-controls': g(
    'Parental Controls Setup',
    'Configure device and network limits for children’s online activity.',
    'Family',
    'beginner',
    '30 minutes',
    [section(
      'Control layers',
      'Combine device settings, router filters, and platform parental tools.',
      [
        'Enable Screen Time (iOS) or Family Link (Android) restrictions',
        'Block in-app purchases and require approval for new apps',
        'Set bedtime schedules for internet access',
        'Review YouTube and gaming privacy settings for child accounts',
        'Document login credentials in a parent-accessible secure vault'
      ],
      ['Controls reduce risk but do not replace conversation about online safety']
    )]
  ),
  'privacy-automation': g(
    'Privacy Automation',
    'Use scheduled tasks to maintain settings without daily effort.',
    'General',
    'advanced',
    '30 minutes',
    [section(
      'Recurring maintenance',
      'Automation helps privacy habits stick.',
      [
        'Calendar a quarterly privacy review (permissions, passwords, shares)',
        'Enable automatic OS and browser updates',
        'Set password manager alerts for breached credentials',
        'Use calendar reminders to re-check data broker listings',
        'Automate cloud link audits with a recurring checklist'
      ],
      ['Automation complements — does not replace — thoughtful choices']
    )]
  ),
  'privacy-advocacy': g(
    'Privacy Advocacy',
    'Support stronger privacy norms in your community and workplace.',
    'General',
    'beginner',
    '20 minutes',
    [section(
      'Speaking up',
      'Collective pressure improves defaults for everyone.',
      [
        'Share practical tips with friends — avoid fear-based messaging',
        'Ask employers about data handling for HR and monitoring tools',
        'Support organizations that litigate for privacy rights',
        'Comment on proposed regulations when public consultation opens',
        'Choose vendors that publish clear, minimal data practices'
      ],
      ['Lead by example — people adopt habits they see working for others']
    )]
  ),
  'privacy-maintenance': g(
    'Privacy Maintenance Plan',
    'Build a sustainable routine to keep settings current.',
    'General',
    'beginner',
    '25 minutes',
    [section(
      'Ongoing schedule',
      'Privacy erodes as services change defaults and you add new accounts.',
      [
        'Weekly: skim caution feed or privacy news for relevant alerts',
        'Monthly: review new app permissions and connected accounts',
        'Quarterly: run password audit and 2FA check',
        'Annually: full assessment and data inventory update',
        'After any breach news: rotate affected passwords immediately'
      ],
      ['Document your schedule in a calendar you already use']
    )]
  ),
  'privacy-achievements': g(
    'Privacy Achievement Milestones',
    'Recognize progress and identify your next improvement.',
    'General',
    'beginner',
    '15 minutes',
    [section(
      'Measuring progress',
      'Celebrate concrete wins to stay motivated.',
      [
        'List completed 30-day challenge tasks and note impact',
        'Compare latest assessment score to your first baseline',
        'Share one habit that stuck (e.g., password manager, 2FA)',
        'Identify the weakest category from your dashboard',
        'Set one specific goal for the next 30 days'
      ],
      ['Progress is non-linear — setbacks are normal']
    )]
  )
};

const item = (
  id: string,
  text: string,
  description: string,
  priority: ChecklistItem['priority'] = 'medium',
  difficulty: ChecklistItem['difficulty'] = 'easy'
): ChecklistItem => ({ id, text, description, priority, difficulty });

const checklistDef = (
  title: string,
  description: string,
  platform: string,
  categories: PrivacyChecklist['categories']
): Omit<PrivacyChecklist, 'id'> => ({
  title,
  description,
  platform,
  timeToComplete: estimateChecklistTime(categories),
  lastUpdated: '2025-05-30',
  categories
});

const CHECKLISTS: Record<string, Omit<PrivacyChecklist, 'id'>> = {
  'home-network-security': checklistDef(
    'Home Network Security Checklist',
    'Secure your router, Wi-Fi, and connected devices at home.',
    'Network',
    [
      {
        name: 'Router',
        items: [
          item('router-password', 'Change default router admin password', 'Use a unique password from your manager', 'high'),
          item('firmware', 'Update router firmware', 'Check manufacturer site or app monthly', 'high'),
          item('wpa3', 'Use WPA3 or WPA2 encryption', 'Disable WEP and open networks', 'high'),
          item('guest-wifi', 'Enable guest network for visitors', 'Isolate IoT devices when possible', 'medium')
        ]
      },
      {
        name: 'Devices',
        items: [
          item('iot-segment', 'Put smart devices on separate network/VLAN', 'Reduces lateral movement if one device is compromised', 'medium', 'hard'),
          item('upnp', 'Disable UPnP unless required', 'Prevents automatic port forwarding exploits', 'medium'),
          item('dns', 'Consider privacy DNS (Cloudflare 1.1.1.1, Quad9)', 'Blocks some malicious domains at DNS level', 'low')
        ]
      }
    ]
  ),
  'social-media-privacy': checklistDef(
    'Social Media Privacy Checklist',
    'Quick checks for major social platforms.',
    'Social Media',
    [
      {
        name: 'Profile',
        items: [
          item('private-profile', 'Set account to private or limited audience', 'Reduces public scraping', 'high'),
          item('bio-info', 'Remove phone number and address from bio', 'Minimize public contact data', 'high'),
          item('tag-approval', 'Enable tag/mention approval', 'Prevents unwanted associations', 'medium')
        ]
      },
      {
        name: 'Connections',
        items: [
          item('friend-audit', 'Remove unknown or inactive followers', 'Reduces social-engineering risk', 'medium'),
          item('app-revoke', 'Revoke unused third-party app access', 'Stops dormant data pipelines', 'high')
        ]
      }
    ]
  ),
  'social-media-audit': checklistDef(
    'Social Media Audit Checklist',
    'Deep review of posts, tags, and account history.',
    'Social Media',
    [
      {
        name: 'Content review',
        items: [
          item('old-posts', 'Scroll oldest posts and delete outdated personal info', 'Addresses, workplaces, travel plans', 'high', 'medium'),
          item('tagged', 'Review photos others tagged you in', 'Untag or hide as needed', 'medium'),
          item('search-name', 'Search your name on the platform', 'Find duplicate or impersonation accounts', 'high')
        ]
      }
    ]
  ),
  'password-security': checklistDef(
    'Password Security Checklist',
    'Essential password hygiene steps.',
    'General',
    [
      {
        name: 'Basics',
        items: [
          item('unique', 'Every account has a unique password', 'Use a password manager', 'high'),
          item('2fa-email', '2FA enabled on primary email', 'Protects password resets', 'high'),
          item('strength-check', 'Run Password Strength Checker on weak passwords', 'Fix lowest scores first', 'medium'),
          item('breach', 'Change passwords after breach notifications', 'Prioritize email and banking', 'high')
        ]
      }
    ]
  ),
  'email-privacy': checklistDef(
    'Email Privacy Checklist',
    'Secure and minimize exposure via email.',
    'Email',
    [
      {
        name: 'Account',
        items: [
          item('alias', 'Use aliases for newsletters and shopping', 'Limits cross-site profiling', 'medium'),
          item('forward', 'Check for unknown forwarding rules', 'Sign of compromise', 'high'),
          item('recovery', 'Update recovery email and phone', 'Remove obsolete numbers', 'medium')
        ]
      }
    ]
  ),
  'mobile-privacy': checklistDef(
    'Mobile Privacy Checklist',
    'Phone and tablet privacy essentials.',
    'Mobile',
    [
      {
        name: 'Settings',
        items: [
          item('loc', 'Audit location permissions per app', 'Deny by default', 'high'),
          item('ads', 'Limit ad tracking in OS settings', 'Android Advertising ID / iOS tracking', 'medium'),
          item('lock', 'Use strong screen lock (PIN 6+ or biometrics)', 'Encrypts device at rest', 'high')
        ]
      }
    ]
  ),
  'privacy-audit': checklistDef(
    'Comprehensive Privacy Audit Checklist',
    'End-to-end review of your digital privacy posture.',
    'General',
    [
      {
        name: 'Accounts',
        items: [
          item('inventory', 'Complete Personal Data Inventory', 'Catalog all services holding your data', 'high', 'medium'),
          item('assessment', 'Run full privacy assessment', 'Baseline score and action plan', 'high'),
          item('close', 'Close unused accounts', 'Reduces breach surface', 'medium')
        ]
      },
      {
        name: 'Technical',
        items: [
          item('updates', 'OS and apps fully updated', 'Security patches applied', 'high'),
          item('backups', 'Verify encrypted backups exist', 'Test restore occasionally', 'medium', 'medium')
        ]
      }
    ]
  )
};

export function getGuide(id: string | undefined): PrivacyGuide | null {
  if (!id || !GUIDES[id]) return null;
  return { id, ...GUIDES[id] };
}

export function getChecklist(id: string | undefined): PrivacyChecklist | null {
  if (!id || !CHECKLISTS[id]) return null;
  return { id, ...CHECKLISTS[id] };
}

export function listGuideSummaries() {
  return Object.entries(GUIDES).map(([id, guide]) => ({
    id,
    title: guide.title,
    description: guide.description,
    platform: guide.platform,
    timeToComplete: guide.timeToComplete,
    lastUpdated: guide.lastUpdated,
    icon: BookOpen
  }));
}

export function listChecklistSummaries() {
  return Object.entries(CHECKLISTS).map(([id, checklist]) => ({
    id,
    title: checklist.title,
    description: checklist.description,
    platform: checklist.platform,
    timeToComplete: checklist.timeToComplete,
    lastUpdated: checklist.lastUpdated,
    icon: List
  }));
}

export function getAllGuideIds(): string[] {
  return Object.keys(GUIDES);
}

export function getAllChecklistIds(): string[] {
  return Object.keys(CHECKLISTS);
}
