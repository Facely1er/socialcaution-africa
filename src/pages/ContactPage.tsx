import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, User, AtSign, CheckCircle, AlertCircle, Loader2, Mail, Building2, HeartHandshake } from 'lucide-react';
import AfricaPageLayout from './africa/AfricaPageLayout';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import { isLocalOnlyMode } from '../config/runtime';

const CONTACT_STORAGE_KEY = 'socialcaution-contact-submissions';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (isLocalOnlyMode()) {
        const existing = JSON.parse(localStorage.getItem(CONTACT_STORAGE_KEY) || '[]');
        existing.push({ ...formData, submittedAt: new Date().toISOString() });
        localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(existing));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AfricaPageLayout
      title="Contact ERMITS Advisory"
      subtitle="Partnerships, national editions, and Africa Edition support"
      description="Reach the ERMITS team for institutional briefings, national deployment inquiries, or questions about SocialCaution Africa."
    >
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Mail className="h-6 w-6 text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-primary dark:text-white mb-1">General &amp; privacy</h3>
                  <a href="mailto:contact@ermits.com" className="text-accent font-medium hover:underline">
                    contact@ermits.com
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Use subject lines such as &quot;Africa Edition&quot;, &quot;Privacy Inquiry&quot;, or
                    &quot;Partnership&quot; so requests route correctly.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <HeartHandshake className="h-6 w-6 text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-primary dark:text-white mb-1">National partnerships</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Ministries, regulators, NGOs, and pan-African bodies can request tier briefings via the{' '}
                    <Link to="/africa/partner" className="text-accent font-semibold hover:underline">
                      Partner With Us
                    </Link>{' '}
                    page before submitting this form.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 mb-8 bg-accent/5 border-accent/20">
            <div className="flex items-start gap-3">
              <Building2 className="h-6 w-6 text-accent flex-shrink-0" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>ERMITS LLC</strong> — SocialCaution Africa Edition. Institutional collaboration in
                Côte d&apos;Ivoire includes ESATIC (ITU Centre of Excellence). Website:{' '}
                <a href="https://www.ermits.com" className="text-accent hover:underline" rel="noopener noreferrer">
                  www.ermits.com
                </a>
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-2">Send a message</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Include your organization, country, and whether you are inquiring about awareness partnership,
              national edition, or continental programs.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full pl-10 p-3 bg-card dark:bg-card-hover border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@organization.org"
                    className="w-full pl-10 p-3 bg-card dark:bg-card-hover border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary dark:text-gray-300 mb-1">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Partnership tier, country, or support topic"
                    className="w-full pl-10 p-3 bg-card dark:bg-card-hover border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text dark:text-white"
                  />
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300">
                  <CheckCircle className="h-5 w-5" />
                  <span>Message received. ERMITS Advisory will respond to partnership inquiries as capacity allows.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
                  <AlertCircle className="h-5 w-5" />
                  <span>Failed to send message. Please email contact@ermits.com directly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </Card>
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default ContactPage;
