
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, MapPin, Briefcase, Heart, Mountain } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { TripData } from '@/pages/Index';

interface TripFormProps {
  onSubmit: (data: TripData) => void;
}

export const TripForm = ({ onSubmit }: TripFormProps) => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [tripType, setTripType] = useState('');
  const [travelStyle, setTravelStyle] = useState('');
  const [gender, setGender] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !startDate || !endDate || !tripType || !travelStyle) {
      return;
    }

    onSubmit({
      destination,
      startDate,
      endDate,
      tripType,
      travelStyle,
      gender: gender || undefined,
      specialNeeds: specialNeeds || undefined,
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-6 w-6 mr-2 text-blue-600" />
          Plan Your Trip
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="e.g., Paris, Goa, Tokyo"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date < (startDate || new Date())}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Trip Type</Label>
            <Select value={tripType} onValueChange={setTripType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select trip type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leisure">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    Leisure
                  </div>
                </SelectItem>
                <SelectItem value="business">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Business
                  </div>
                </SelectItem>
                <SelectItem value="adventure">
                  <div className="flex items-center">
                    <Mountain className="h-4 w-4 mr-2" />
                    Adventure
                  </div>
                </SelectItem>
                <SelectItem value="beach">🏖️ Beach</SelectItem>
                <SelectItem value="wedding">👰 Wedding</SelectItem>
                <SelectItem value="family">👨‍👩‍👧‍👦 Family</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Travel Style</Label>
            <Select value={travelStyle} onValueChange={setTravelStyle} required>
              <SelectTrigger>
                <SelectValue placeholder="Select travel style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimalist">✨ Minimalist</SelectItem>
                <SelectItem value="luxury">💎 Luxury</SelectItem>
                <SelectItem value="backpacker">🎒 Backpacker</SelectItem>
                <SelectItem value="standard">👍 Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Gender (Optional)</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialNeeds">Special Needs (Optional)</Label>
            <Textarea
              id="specialNeeds"
              placeholder="e.g., medications, baby items, work equipment..."
              value={specialNeeds}
              onChange={(e) => setSpecialNeeds(e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Generate My Packing List
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
