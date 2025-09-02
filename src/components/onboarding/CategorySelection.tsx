import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GraduationCap, Users, Briefcase, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategorySelectionProps {
  onNext: (category: 'student' | 'youth' | 'working-professional' | 'general-citizen') => void;
}

type CategoryType = 'student' | 'youth' | 'working-professional' | 'general-citizen';

const categories = [
  {
    id: 'student' as CategoryType,
    title: 'Student',
    description: 'Exam stress, study pressure, career guidance',
    icon: GraduationCap,
    color: 'mood-good'
  },
  {
    id: 'youth' as CategoryType,
    title: 'Youth',
    description: 'Life transitions, relationships, identity',
    icon: Users,
    color: 'mood-excellent'
  },
  {
    id: 'working-professional' as CategoryType,
    title: 'Working Professional',
    description: 'Work stress, work-life balance, burnout',
    icon: Briefcase,
    color: 'mood-okay'
  },
  {
    id: 'general-citizen' as CategoryType,
    title: 'General Citizen',
    description: 'Life challenges, mental wellness, support',
    icon: User,
    color: 'primary'
  }
];

export const CategorySelection: React.FC<CategorySelectionProps> = ({ onNext }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  const handleNext = () => {
    if (selectedCategory) {
      onNext(selectedCategory);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 shadow-soft animate-fade-in">
        <div className="text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-foreground">
              Who Are You?
            </h2>
            <p className="text-muted-foreground">
              Help us customize your experience based on your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "p-6 rounded-xl border-2 transition-all duration-300 text-left",
                    "hover:shadow-soft hover:scale-105",
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-soft scale-105" 
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="space-y-3">
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center",
                      isSelected ? "bg-primary" : "bg-secondary"
                    )}>
                      <Icon className={cn(
                        "w-6 h-6",
                        isSelected ? "text-primary-foreground" : "text-primary"
                      )} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{category.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <Button 
            onClick={handleNext}
            disabled={!selectedCategory}
            className="bg-gradient-primary shadow-soft hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};