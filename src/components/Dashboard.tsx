import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoodTracker } from '@/components/mood/MoodTracker';
import { SessionScheduler } from '@/components/sessions/SessionScheduler';
import { EditProfile } from '@/components/profile/EditProfile';
import { Calendar, BarChart3, MessageSquare, Settings, User } from 'lucide-react';
import { UserProfile } from '@/pages/Index';
import { cn } from '@/lib/utils';

interface DashboardProps {
  userProfile: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

type ActiveTab = 'mood' | 'schedule' | 'progress' | 'profile';

export const Dashboard: React.FC<DashboardProps> = ({ userProfile, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('mood');

  const tabs = [
    { id: 'mood' as ActiveTab, label: 'Mood Check-in', icon: BarChart3 },
    { id: 'schedule' as ActiveTab, label: 'Sessions', icon: Calendar },
    { id: 'progress' as ActiveTab, label: 'Progress', icon: MessageSquare },
    { id: 'profile' as ActiveTab, label: 'Profile', icon: User },
  ];

  const displayName = userProfile.nickname || 'User';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mood':
        return <MoodTracker />;
      case 'schedule':
        return <SessionScheduler userProfile={userProfile} />;
      case 'progress':
        return (
          <Card className="p-8 shadow-soft">
            <div className="text-center space-y-4">
              <BarChart3 className="w-16 h-16 text-primary mx-auto" />
              <h3 className="text-2xl font-semibold text-foreground">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Your mental wellness journey insights will appear here as you continue using the app.
              </p>
            </div>
          </Card>
        );
      case 'profile':
        return (
          <Card className="p-8 shadow-soft">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-foreground">Your Profile</h3>
                <EditProfile userProfile={userProfile} onUpdate={onUpdateProfile} />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Display Name:</span>
                  <span className="font-medium">{displayName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium capitalize">{userProfile.category?.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Privacy Mode:</span>
                  <span className="font-medium capitalize">{userProfile.privacyMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Goals:</span>
                  <span className="font-medium">{userProfile.goals.length} selected</span>
                </div>
              </div>
            </div>
          </Card>
        );
      default:
        return <MoodTracker />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="mb-8">
          <Card className="p-6 shadow-soft bg-gradient-wellness text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {displayName}! 👋</h1>
                <p className="text-white/80 mt-1">
                  How are you feeling today? Let's check in with your wellness.
                </p>
              </div>
              <Settings className="w-6 h-6 text-white/60 cursor-pointer hover:text-white transition-colors" />
            </div>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <Card className="p-2 shadow-soft">
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'default' : 'ghost'}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex-1 justify-center space-x-2 transition-all duration-300",
                      activeTab === tab.id 
                        ? "bg-gradient-primary shadow-soft" 
                        : "hover:bg-secondary"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </Button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};