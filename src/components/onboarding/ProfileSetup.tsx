import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserCheck, UserX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileSetupProps {
  onNext: (profileData: {
    age?: number;
    district?: string;
    gender?: string;
    privacyMode: 'anonymous' | 'registered';
    nickname?: string;
  }) => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onNext }) => {
  const [age, setAge] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [privacyMode, setPrivacyMode] = useState<'anonymous' | 'registered'>('anonymous');
  const [nickname, setNickname] = useState<string>('');

  const handleNext = () => {
    onNext({
      age: age ? parseInt(age) : undefined,
      district: district || undefined,
      gender: gender || undefined,
      privacyMode,
      nickname: nickname || undefined
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-8 shadow-soft animate-fade-in">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-foreground">
              Set Up Your Profile
            </h2>
            <p className="text-muted-foreground">
              This information is optional and helps us provide better support
            </p>
          </div>

          <div className="space-y-6">
            {/* Privacy Mode Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Privacy Preference</Label>
              <RadioGroup value={privacyMode} onValueChange={(value: 'anonymous' | 'registered') => setPrivacyMode(value)}>
                <div className="grid grid-cols-1 gap-3">
                  <label className={cn(
                    "flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                    privacyMode === 'anonymous' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}>
                    <RadioGroupItem value="anonymous" />
                    <UserX className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Anonymous Mode</div>
                      <div className="text-sm text-muted-foreground">Use a nickname, keep identity private</div>
                    </div>
                  </label>
                  
                  <label className={cn(
                    "flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                    privacyMode === 'registered' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}>
                    <RadioGroupItem value="registered" />
                    <UserCheck className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Registered Mode</div>
                      <div className="text-sm text-muted-foreground">Book official sessions with verified identity</div>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </div>

            {privacyMode === 'anonymous' && (
              <div className="space-y-2">
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Choose a friendly nickname"
                  className="transition-all duration-300 focus:shadow-soft"
                />
              </div>
            )}

            {/* Optional Demographics */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Optional Information</Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Your age"
                    min="13"
                    max="100"
                    className="transition-all duration-300 focus:shadow-soft"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="transition-all duration-300 focus:shadow-soft">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Your district (helps find local resources)"
                  className="transition-all duration-300 focus:shadow-soft"
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleNext}
            className="w-full bg-gradient-primary shadow-soft hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};