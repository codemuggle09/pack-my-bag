
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, Share2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { PackingItem, TripData } from '@/pages/Index';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PackingListProps {
  items: PackingItem[];
  tripData: TripData;
  onItemToggle: (itemId: string) => void;
  onBack: () => void;
}

export const PackingList = ({ items, tripData, onItemToggle, onBack }: PackingListProps) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [customItems, setCustomItems] = useState<PackingItem[]>([]);

  const allItems = [...items, ...customItems];
  const categories = Array.from(new Set(allItems.map(item => item.category)));
  const checkedCount = allItems.filter(item => item.checked).length;
  const totalCount = allItems.length;

  const handleAddCustomItem = () => {
    if (!newItemName.trim() || !newItemCategory) return;

    const newItem: PackingItem = {
      id: `custom-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      essential: false,
      checked: false
    };

    setCustomItems(prev => [...prev, newItem]);
    setNewItemName('');
    setNewItemCategory('');
  };

  const handleCustomItemToggle = (itemId: string) => {
    if (itemId.startsWith('custom-')) {
      setCustomItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      );
    } else {
      onItemToggle(itemId);
    }
  };

  const tripDuration = Math.ceil((tripData.endDate.getTime() - tripData.startDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Packing List</h2>
          <p className="text-gray-600">
            {tripData.destination} • {format(tripData.startDate, 'MMM d')} - {format(tripData.endDate, 'MMM d')} • {tripDuration} day{tripDuration !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Progress</CardTitle>
                <Badge variant="secondary">
                  {checkedCount}/{totalCount} packed
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%` }}
                />
              </div>
            </CardHeader>
          </Card>

          {categories.map(category => {
            const categoryItems = allItems.filter(item => item.category === category);
            const categoryIcons: Record<string, string> = {
              'Clothing': '👕',
              'Toiletries': '🧴',
              'Electronics': '🔌',
              'Documents': '📄',
              'Medical': '💊',
              'Accessories': '👜',
            };

            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="mr-2">{categoryIcons[category] || '📦'}</span>
                    {category}
                    <Badge variant="outline" className="ml-2">
                      {categoryItems.filter(item => item.checked).length}/{categoryItems.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryItems.map(item => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={() => handleCustomItemToggle(item.id)}
                        />
                        <label
                          htmlFor={item.id}
                          className={`flex-1 text-sm cursor-pointer ${
                            item.checked ? 'line-through text-gray-500' : ''
                          }`}
                        >
                          {item.name}
                          {item.essential && <Badge variant="destructive" className="ml-2 text-xs">Essential</Badge>}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="font-medium">Destination:</span> {tripData.destination}
              </div>
              <div>
                <span className="font-medium">Type:</span> {tripData.tripType}
              </div>
              <div>
                <span className="font-medium">Style:</span> {tripData.travelStyle}
              </div>
              <div>
                <span className="font-medium">Duration:</span> {tripDuration} day{tripDuration !== 1 ? 's' : ''}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Custom Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Item name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <Select value={newItemCategory} onValueChange={setNewItemCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleAddCustomItem} 
                className="w-full"
                disabled={!newItemName.trim() || !newItemCategory}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" className="w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Share List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
