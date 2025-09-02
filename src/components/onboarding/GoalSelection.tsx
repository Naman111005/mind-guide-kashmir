import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Moon, Shield, Heart, MessageCircle, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalSelectionProps {
  onNext: (goals: string[]) => void;
}

const availableGoals = [
  {
    id: 'exam-anxiety',
    title: 'Reduce Exam Anxiety',
    description: 'Manage test stress and performance anxiety',
    icon: Brain,
  },
  {
    id: 'sleep-better',
    title: 'Sleep Better',
    description: 'Improve sleep quality and establish healthy routines',
    icon: Moon,
  },
  {
    id: 'manage-stress',
    title: 'Manage Stress',
    description: 'Learn coping strategies for daily stressors',
    icon: Shield,
  },
  {
    id: 'addiction-support',
    title: 'Addiction/De-addiction Support',
    description: 'Get help with substance or behavioral dependencies',
    icon: Heart,
  },
  {
    id: 'general-counseling',
    title: 'General Counseling',
    description: 'Regular mental health support and guidance',
    icon: MessageCircle,
  },
  {
    id: 'personal-growth',
    title: 'Personal Growth',
    description: 'Build confidence and emotional resilience',
    icon: Target,
  }
];

export const GoalSelection: React.FC<GoalSelectionProps> = ({ onNext }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleNext = () => {
    onNext(selectedGoals);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-8 shadow-soft animate-fade-in">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-foreground">
              What Are Your Goals?
            </h2>
            <p className="text-muted-foreground">
              Select the areas where you'd like support. You can choose multiple goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableGoals.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selectedGoals.includes(goal.id);
              
              return (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={cn(
                    "p-6 rounded-xl border-2 transition-all duration-300 text-left h-full",
                    "hover:shadow-soft hover:scale-105",
                    isSelected 
                      ? "border-primary bg-gradient-wellness text-white shadow-glow" 
                      : "border-border hover:border-primary/50 bg-card"
                  )}
                >
                  <div className="space-y-4">
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center",
                      isSelected ? "bg-white/20" : "bg-primary/10"
                    )}>
                      <Icon className={cn(
                        "w-6 h-6",
                        isSelected ? "text-white" : "text-primary"
                      )} />
                    </div>
                    <div className="space-y-2">
                      <h3 className={cn(
                        "font-semibold",
                        isSelected ? "text-white" : "text-foreground"
                      )}>
                        {goal.title}
                      </h3>
                      <p className={cn(
                        "text-sm",
                        isSelected ? "text-white/80" : "text-muted-foreground"
                      )}>
                        {goal.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Selected {selectedGoals.length} goal{selectedGoals.length !== 1 ? 's' : ''}
            </p>
            <Button 
              onClick={handleNext}
              disabled={selectedGoals.length === 0}
              className="bg-gradient-primary shadow-soft hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              Complete Setup
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};