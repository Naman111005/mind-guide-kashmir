import React, { useState } from 'react';
import { WelcomeScreen } from '@/components/onboarding/WelcomeScreen';
import { CategorySelection } from '@/components/onboarding/CategorySelection';
import { ProfileSetup } from '@/components/onboarding/ProfileSetup';
import { GoalSelection } from '@/components/onboarding/GoalSelection';
import { Dashboard } from '@/components/Dashboard';

export interface UserProfile {
  category: 'student' | 'youth' | 'working-professional' | 'general-citizen' | null;
  age?: number;
  district?: string;
  gender?: string;
  privacyMode: 'anonymous' | 'registered';
  nickname?: string;
  goals: string[];
  completedOnboarding: boolean;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'category' | 'profile' | 'goals' | 'dashboard'>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    category: null,
    privacyMode: 'anonymous',
    goals: [],
    completedOnboarding: false
  });

  const handleStepComplete = (step: string, data: Partial<UserProfile>) => {
    const updatedProfile = { ...userProfile, ...data };
    setUserProfile(updatedProfile);

    switch (step) {
      case 'welcome':
        setCurrentStep('category');
        break;
      case 'category':
        setCurrentStep('profile');
        break;
      case 'profile':
        setCurrentStep('goals');
        break;
      case 'goals':
        setCurrentStep('dashboard');
        setUserProfile(prev => ({ ...prev, completedOnboarding: true }));
        break;
    }
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onNext={() => handleStepComplete('welcome', {})} />;
      case 'category':
        return (
          <CategorySelection 
            onNext={(category) => handleStepComplete('category', { category })}
          />
        );
      case 'profile':
        return (
          <ProfileSetup 
            onNext={(profileData) => handleStepComplete('profile', profileData)}
          />
        );
      case 'goals':
        return (
          <GoalSelection 
            onNext={(goals) => handleStepComplete('goals', { goals })}
          />
        );
      case 'dashboard':
        return <Dashboard userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />;
      default:
        return <WelcomeScreen onNext={() => handleStepComplete('welcome', {})} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      {renderCurrentStep()}
    </div>
  );
};

export default Index;