import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Moon, Clock, AlertTriangle, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const moods = [
  { emoji: '😢', label: 'Terrible', value: 1, color: 'mood-terrible' },
  { emoji: '😟', label: 'Poor', value: 2, color: 'mood-poor' },
  { emoji: '😐', label: 'Okay', value: 3, color: 'mood-okay' },
  { emoji: '🙂', label: 'Good', value: 4, color: 'mood-good' },
  { emoji: '😃', label: 'Excellent', value: 5, color: 'mood-excellent' },
];

const sleepQualities = [
  { label: 'Poor', value: 'poor' },
  { label: 'Okay', value: 'okay' },
  { label: 'Good', value: 'good' },
];

const commonTriggers = [
  'Exam/Study Pressure',
  'Work Stress',
  'Family Issues',
  'Health Concerns',
  'Social Anxiety',
  'Financial Worries',
  'Relationship Problems',
  'Academic Performance',
  'Future Uncertainty',
  'Sleep Problems',
];

export const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [stressLevel, setStressLevel] = useState<number[]>([3]);
  const [sleepHours, setSleepHours] = useState<number[]>([7]);
  const [sleepQuality, setSleepQuality] = useState<string>('');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [customTrigger, setCustomTrigger] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const { toast } = useToast();

  const handleTriggerToggle = (trigger: string) => {
    setSelectedTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handleSave = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select your mood",
        description: "How are you feeling today?",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to a database
    toast({
      title: "Mood check-in saved! 🎉",
      description: "Your daily wellness data has been recorded.",
    });

    // Reset form
    setSelectedMood(null);
    setStressLevel([3]);
    setSleepHours([7]);
    setSleepQuality('');
    setSelectedTriggers([]);
    setCustomTrigger('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Mood Selection */}
      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <span>How are you feeling today?</span>
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-300 text-center",
                  "hover:shadow-soft hover:scale-105",
                  selectedMood === mood.value 
                    ? `border-${mood.color} bg-${mood.color}/10 shadow-soft scale-105` 
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-sm font-medium text-foreground">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stress Level */}
      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Stress Level</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
            <Slider
              value={stressLevel}
              onValueChange={setStressLevel}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="text-center">
              <span className="text-lg font-medium text-foreground">
                Current: {stressLevel[0]}/5
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Sleep Tracking */}
      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Moon className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Sleep Log</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label>Hours of Sleep</Label>
              <div className="space-y-2">
                <Slider
                  value={sleepHours}
                  onValueChange={setSleepHours}
                  max={12}
                  min={3}
                  step={0.5}
                  className="w-full"
                />
                <div className="text-center">
                  <span className="text-lg font-medium text-foreground">
                    {sleepHours[0]} hours
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Label>Sleep Quality</Label>
              <Select value={sleepQuality} onValueChange={setSleepQuality}>
                <SelectTrigger>
                  <SelectValue placeholder="How was your sleep?" />
                </SelectTrigger>
                <SelectContent>
                  {sleepQualities.map((quality) => (
                    <SelectItem key={quality.value} value={quality.value}>
                      {quality.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Triggers */}
      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">What's affecting you today?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {commonTriggers.map((trigger) => (
              <button
                key={trigger}
                onClick={() => handleTriggerToggle(trigger)}
                className={cn(
                  "p-3 rounded-lg border transition-all duration-300 text-sm",
                  selectedTriggers.includes(trigger)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 text-foreground"
                )}
              >
                {trigger}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Other (optional)</Label>
            <Textarea
              value={customTrigger}
              onChange={(e) => setCustomTrigger(e.target.value)}
              placeholder="Describe anything else that's affecting your mood..."
              className="transition-all duration-300 focus:shadow-soft"
            />
          </div>
        </div>
      </Card>

      {/* Notes */}
      <Card className="p-6 shadow-soft">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Additional Notes</h3>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any thoughts, feelings, or observations you'd like to record..."
            className="min-h-[100px] transition-all duration-300 focus:shadow-soft"
          />
        </div>
      </Card>

      {/* Save Button */}
      <Button 
        onClick={handleSave}
        className="w-full bg-gradient-primary shadow-soft hover:shadow-glow transition-all duration-300"
        size="lg"
      >
        <Save className="w-5 h-5 mr-2" />
        Save Today's Check-in
      </Button>
    </div>
  );
};