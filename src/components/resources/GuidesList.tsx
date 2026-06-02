import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { listGuideSummaries } from '../../data/privacyResources';

const GuidesList: React.FC = () => {
  const guides = listGuideSummaries();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide) => {
        const Icon = guide.icon;
        return (
          <Link
            key={guide.id}
            to={`/resources/guides/${guide.id}`}
            className="block"
          >
            <Card
              animate
              className="p-6 flex flex-col h-full hover:shadow-lg transition-all"
            >
              <div className="flex items-start mb-4">
                <div className="p-2 bg-light-blue dark:bg-accent/20 rounded-full mr-3">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary dark:text-white">{guide.title}</h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{guide.description}</p>

              <div className="flex justify-between items-center">
                <Badge variant="primary">
                  <div className="flex items-center">
                    <Icon className="h-3 w-3 mr-1" />
                    Guide
                  </div>
                </Badge>
                <Badge variant="accent">{guide.platform}</Badge>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {guide.timeToComplete}
                </span>
                <span className="text-accent hover:text-accent-dark font-medium flex items-center">
                  Read Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default GuidesList;
