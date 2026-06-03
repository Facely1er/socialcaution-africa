import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Scale, Lock, DollarSign, Zap, Shield, GraduationCap, XCircle, Globe, Users } from 'lucide-react';
import Button from '../common/Button';
import MatrixBackground from './MatrixBackground';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section relative bg-primary flex items-center pt-0 pb-4 overflow-hidden min-h-[32vh]">
      <div className="absolute inset-0 overflow-hidden">
        <MatrixBackground color="rgba(0, 255, 170, 0.8)" opacity={0.15} speed={0.5} density={0.3} />
      </div>

      <div className="absolute inset-0 bg-primary opacity-50 z-[5]"></div>

      <div className="hero-content container mx-auto px-4 sm:px-6 relative z-10 flex flex-col justify-between h-full">
        <div className="w-full max-w-4xl mx-auto text-center pt-3 sm:pt-4 pb-2">
          <div className="mb-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-relaxed px-4">
              <span className="block mb-2">Building Digital Trust</span>
              <span className="block">Across Africa</span>
            </h1>
          </div>

          <div className="mb-3">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-lg sm:text-2xl md:text-3xl text-white font-medium px-4">
              <div className="p-1.5 sm:p-2 bg-white/10 rounded-full">
                <Lock className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-center">Privacy awareness, cyber hygiene, and digital citizenship</span>
              <div className="p-1.5 sm:p-2 bg-white/10 rounded-full">
                <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-base sm:text-xl md:text-2xl text-white font-semibold px-4">
              <div className="hidden sm:block p-2 bg-white/10 rounded-full">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-center">Choose your profile — get a journey built for African digital life</span>
              <div className="hidden sm:block p-2 bg-white/10 rounded-full">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
            <Button 
              variant="primary"
              onClick={() => navigate('/personas')}
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-accent hover:bg-accent-dark text-white font-bold w-full sm:w-auto group transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center">
                <Users className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Choose Your Persona
              </span>
            </Button>

            <Button
              variant="outlineLight"
              onClick={() => navigate('/assessment')}
              className="text-base sm:text-lg px-5 sm:px-6 py-2.5 sm:py-3 w-full sm:w-auto group transition-all duration-300"
            >
              <span className="flex items-center">
                <Search className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Take Assessment
              </span>
            </Button>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm sm:text-lg text-white px-4">
            <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
              <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              <span>Free education</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
              <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              <span>No account needed</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
              <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              <span>African context</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
        <div className="absolute top-[20%] left-[5%] bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg opacity-70">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-white" />
            <span className="text-white text-sm font-medium">Your Persona</span>
          </div>
        </div>

        <div className="absolute top-[60%] right-[5%] bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg opacity-70">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-white" />
            <span className="text-white text-sm font-medium">African Laws</span>
          </div>
        </div>

        <div className="absolute top-[50%] left-[8%] bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg opacity-70">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-white" />
            <span className="text-white text-sm font-medium">Your Journey</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
