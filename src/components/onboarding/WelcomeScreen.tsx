import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Shield, Users } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-soft animate-fade-in">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-wellness rounded-full flex items-center justify-center shadow-glow">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground">
              Wellness Companion
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Your personal mental health support system, integrated with government and NGO resources for comprehensive care.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-secondary-foreground">Privacy-focused & secure</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-secondary-foreground">Professional counseling access</span>
            </div>
          </div>

          <Button 
            onClick={onNext}
            className="w-full bg-gradient-primary shadow-soft hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </Card>
    </div>
  );
};