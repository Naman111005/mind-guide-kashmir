import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, MapPin, User, Phone, Video, MessageSquare } from 'lucide-react';
import { UserProfile } from '@/pages/Index';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface SessionSchedulerProps {
  userProfile: UserProfile;
}

const sessionTypes = [
  {
    id: 'individual-counseling',
    title: 'Individual Counseling',
    description: 'One-on-one session with a licensed counselor',
    duration: '50 minutes',
    icon: User,
  },
  {
    id: 'group-therapy',
    title: 'Group Therapy',
    description: 'Therapeutic group session with peers',
    duration: '75 minutes',
    icon: MessageSquare,
  },
  {
    id: 'crisis-intervention',
    title: 'Crisis Intervention',
    description: 'Immediate support for urgent situations',
    duration: '30 minutes',
    icon: Phone,
  },
  {
    id: 'online-session',
    title: 'Online Session',
    description: 'Video consultation from home',
    duration: '45 minutes',
    icon: Video,
  },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export const SessionScheduler: React.FC<SessionSchedulerProps> = ({ userProfile }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSessionType, setSelectedSessionType] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [urgencyLevel, setUrgencyLevel] = useState<string>('');
  const { toast } = useToast();

  const canBookOfficial = userProfile.privacyMode === 'registered';

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime || !selectedSessionType) {
      toast({
        title: "Please complete all fields",
        description: "Date, time, and session type are required.",
        variant: "destructive"
      });
      return;
    }

    if (!canBookOfficial) {
      toast({
        title: "Registration Required",
        description: "Please switch to registered mode in your profile to book official sessions.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically book the session through an API
    toast({
      title: "Session booking request sent! 📅",
      description: "You'll receive a confirmation email shortly with session details.",
    });

    // Reset form
    setSelectedDate(undefined);
    setSelectedTime('');
    setSelectedSessionType('');
    setReason('');
    setUrgencyLevel('');
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice */}
      {!canBookOfficial && (
        <Card className="p-4 border-2 border-amber-200 bg-amber-50">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-800">Registration Required</p>
              <p className="text-sm text-amber-700">
                Switch to registered mode in your profile to book official government counseling sessions.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Session Type Selection */}
      <Card className="p-6 shadow-soft">
        <h3 className="text-xl font-semibold text-foreground mb-4">Choose Session Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessionTypes.map((session) => {
            const Icon = session.icon;
            const isSelected = selectedSessionType === session.id;
            
            return (
              <button
                key={session.id}
                onClick={() => setSelectedSessionType(session.id)}
                disabled={!canBookOfficial}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all duration-300 text-left",
                  "hover:shadow-soft",
                  !canBookOfficial && "opacity-50 cursor-not-allowed",
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-soft" 
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-start space-x-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    isSelected ? "bg-primary" : "bg-secondary"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5",
                      isSelected ? "text-primary-foreground" : "text-primary"
                    )} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{session.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{session.description}</p>
                    <Badge variant="secondary" className="mt-2">
                      {session.duration}
                    </Badge>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Date and Time Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5" />
            <span>Select Date</span>
          </h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || !canBookOfficial}
            className="rounded-md border pointer-events-auto"
          />
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Select Time</span>
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                disabled={!canBookOfficial}
                className={cn(
                  "p-3 rounded-lg border transition-all duration-300",
                  !canBookOfficial && "opacity-50 cursor-not-allowed",
                  selectedTime === time
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 text-foreground"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground mb-4">Urgency Level</h3>
          <Select value={urgencyLevel} onValueChange={setUrgencyLevel} disabled={!canBookOfficial}>
            <SelectTrigger>
              <SelectValue placeholder="How urgent is this session?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low - General check-in</SelectItem>
              <SelectItem value="medium">Medium - Ongoing concerns</SelectItem>
              <SelectItem value="high">High - Immediate support needed</SelectItem>
              <SelectItem value="crisis">Crisis - Urgent intervention required</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground mb-4">Session Details</h3>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Brief description of what you'd like to discuss..."
            disabled={!canBookOfficial}
            className="min-h-[100px] transition-all duration-300 focus:shadow-soft"
          />
        </Card>
      </div>

      {/* Book Session Button */}
      <Button 
        onClick={handleBookSession}
        disabled={!canBookOfficial || !selectedDate || !selectedTime || !selectedSessionType}
        className="w-full bg-gradient-primary shadow-soft hover:shadow-glow transition-all duration-300"
        size="lg"
      >
        <CalendarIcon className="w-5 h-5 mr-2" />
        Book Session
      </Button>

      {/* Help Text */}
      <Card className="p-4 bg-muted">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Session bookings are subject to counselor availability. 
          You'll receive a confirmation email within 24 hours. For immediate crisis support, 
          please call the national helpline: <span className="font-mono">1-800-XXX-XXXX</span>
        </p>
      </Card>
    </div>
  );
};