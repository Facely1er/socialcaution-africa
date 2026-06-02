import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const NotificationsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Section>
          <Card className="p-6">
            <div className="text-center py-12" role="status" aria-live="polite">
              <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">No notifications yet</h4>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                Notifications will appear here when you complete assessments or when alerts are configured for your account.
              </p>
              <Link to="/assessment">
                <Button variant="outline">Take a Privacy Assessment</Button>
              </Link>
            </div>
          </Card>
        </Section>
      </motion.div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
