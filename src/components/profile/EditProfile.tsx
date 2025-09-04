import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, User, Shield, Target } from 'lucide-react';
import { UserProfile } from '@/pages/Index';
import { useToast } from '@/hooks/use-toast';

interface EditProfileProps {
  userProfile: UserProfile;
  onUpdate: (updatedProfile: UserProfile) => void;
}

const categories = [
  { value: 'student', label: 'Student' },
  { value: 'youth', label: 'Youth' },
  { value: 'working-professional', label: 'Working Professional' },
  { value: 'general-citizen', label: 'General Citizen' },
];

const availableGoals = [
  'Reduce exam anxiety',
  'Sleep better',
  'Manage stress',
  'Addiction/de-addiction support',
  'General counseling',
  'Build confidence',
  'Improve relationships',
  'Career guidance',
  'Time management',
  'Emotional regulation'
];

export const EditProfile: React.FC<EditProfileProps> = ({ userProfile, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Validate required fields
    if (!formData.nickname || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in your nickname and category.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.goals.length === 0) {
      toast({
        title: "Select Goals",
        description: "Please select at least one personal goal.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onUpdate(formData);
    setIsOpen(false);
    setIsLoading(false);
    
    toast({
      title: "Profile Updated! ✅",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setFormData(userProfile);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Edit className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Edit Your Profile</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Basic Information */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Basic Information</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nickname">Display Name</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                  placeholder="Enter your preferred name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category || ''} 
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    category: value as 'student' | 'youth' | 'working-professional' | 'general-citizen'
                  }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="age">Age (Optional)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value ? parseInt(e.target.value) : undefined }))}
                    placeholder="Your age"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender (Optional)</Label>
                  <Select 
                    value={formData.gender || ''} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value || undefined }))}
                  >
                    <SelectTrigger className="mt-1">
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

                <div>
                  <Label htmlFor="district">District (Optional)</Label>
                  <Input
                    id="district"
                    value={formData.district || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value || undefined }))}
                    placeholder="Your district"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Privacy Settings */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Privacy Settings</span>
            </h3>
            
            <div>
              <Label>Privacy Mode</Label>
              <Select 
                value={formData.privacyMode} 
                onValueChange={(value: 'anonymous' | 'registered') => setFormData(prev => ({ ...prev, privacyMode: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anonymous">
                    <div className="flex flex-col items-start">
                      <span>Anonymous Mode</span>
                      <span className="text-xs text-muted-foreground">Nickname only, no official sessions</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="registered">
                    <div className="flex flex-col items-start">
                      <span>Registered Mode</span>
                      <span className="text-xs text-muted-foreground">Full profile, can book official sessions</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              {formData.privacyMode === 'registered' && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✅ <strong>Registered Mode</strong> - You can now book official government/NGO counseling sessions.
                  </p>
                </div>
              )}
              
              {formData.privacyMode === 'anonymous' && (
                <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    ⚠️ <strong>Anonymous Mode</strong> - Session booking is limited to maintain privacy.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Personal Goals */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Personal Goals</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableGoals.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={formData.goals.includes(goal)}
                    onCheckedChange={() => handleGoalToggle(goal)}
                  />
                  <Label htmlFor={goal} className="text-sm cursor-pointer">
                    {goal}
                  </Label>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Selected goals:</p>
              <div className="flex flex-wrap gap-2">
                {formData.goals.map((goal) => (
                  <Badge key={goal} variant="secondary" className="text-xs">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className="bg-gradient-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};