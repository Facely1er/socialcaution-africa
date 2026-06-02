import React from 'react';
import { motion } from '../../lib/motion';
import { Link } from 'react-router-dom';
import { Shield, BookOpen } from 'lucide-react';
import Section from '../common/Section';
import Button from '../common/Button';

export const StayProtected: React.FC = () => {
  return (
    <Section
      title="Stay Protected"
      subtitle="Use our real privacy tools and guides to improve your digital safety"
      centered
      className="bg-yellow-100 dark:bg-yellow-900/20 py-12"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/assessment">
            <Button variant="primary" className="px-6 py-3">
              Take Privacy Assessment
            </Button>
          </Link>
          <Link to="/resources/guides">
            <Button variant="outline" className="px-6 py-3">
              <BookOpen className="h-4 w-4 mr-2 inline" />
              Browse Guides
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400"
        >
          <Shield className="h-4 w-4 mr-2" />
          <span>
            All tools run locally in your browser.{' '}
            <Link to="/privacy" className="text-yellow-600 hover:text-yellow-700 underline">
              Privacy Policy
            </Link>
          </span>
        </motion.div>
      </div>
    </Section>
  );
};
