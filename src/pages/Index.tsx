
import { useState } from 'react';
import { TripForm } from '@/components/TripForm';
import { PackingList } from '@/components/PackingList';
import { Luggage } from 'lucide-react';

export interface TripData {
  destination: string;
  startDate: Date;
  endDate: Date;
  tripType: string;
  travelStyle: string;
  gender?: string;
  specialNeeds?: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: string;
  quantity?: number;
  essential: boolean;
  checked: boolean;
}

const Index = () => {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [packingList, setPackingList] = useState<PackingItem[]>([]);
  const [showList, setShowList] = useState(false);

  const handleTripSubmit = (data: TripData) => {
    setTripData(data);
    generatePackingList(data);
    setShowList(true);
  };

  const generatePackingList = (data: TripData) => {
    const days = Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const items: PackingItem[] = [];

    // Base clothing items
    items.push(
      { id: '1', name: `${Math.max(days, 3)} T-Shirts/Tops`, category: 'Clothing', quantity: Math.max(days, 3), essential: true, checked: false },
      { id: '2', name: `${Math.ceil(days / 2)} Pants/Bottoms`, category: 'Clothing', quantity: Math.ceil(days / 2), essential: true, checked: false },
      { id: '3', name: `${days + 1} Underwear`, category: 'Clothing', quantity: days + 1, essential: true, checked: false },
      { id: '4', name: `${days + 1} Socks`, category: 'Clothing', quantity: days + 1, essential: true, checked: false }
    );

    // Trip type specific items
    if (data.tripType === 'business') {
      items.push(
        { id: 'b1', name: 'Formal Shirts', category: 'Clothing', essential: true, checked: false },
        { id: 'b2', name: 'Business Suit/Blazer', category: 'Clothing', essential: true, checked: false },
        { id: 'b3', name: 'Dress Shoes', category: 'Clothing', essential: true, checked: false },
        { id: 'b4', name: 'Laptop', category: 'Electronics', essential: true, checked: false },
        { id: 'b5', name: 'Laptop Charger', category: 'Electronics', essential: true, checked: false },
        { id: 'b6', name: 'Business Cards', category: 'Documents', essential: false, checked: false }
      );
    }

    if (data.tripType === 'beach') {
      items.push(
        { id: 'beach1', name: 'Swimwear', category: 'Clothing', essential: true, checked: false },
        { id: 'beach2', name: 'Flip Flops', category: 'Clothing', essential: true, checked: false },
        { id: 'beach3', name: 'Sunscreen (SPF 30+)', category: 'Toiletries', essential: true, checked: false },
        { id: 'beach4', name: 'Sunglasses', category: 'Accessories', essential: true, checked: false },
        { id: 'beach5', name: 'Beach Towel', category: 'Accessories', essential: true, checked: false },
        { id: 'beach6', name: 'Waterproof Phone Case', category: 'Electronics', essential: false, checked: false }
      );
    }

    if (data.tripType === 'adventure') {
      items.push(
        { id: 'adv1', name: 'Hiking Boots', category: 'Clothing', essential: true, checked: false },
        { id: 'adv2', name: 'Quick-dry Clothes', category: 'Clothing', essential: true, checked: false },
        { id: 'adv3', name: 'Rain Jacket', category: 'Clothing', essential: true, checked: false },
        { id: 'adv4', name: 'First Aid Kit', category: 'Medical', essential: true, checked: false },
        { id: 'adv5', name: 'Power Bank', category: 'Electronics', essential: true, checked: false },
        { id: 'adv6', name: 'Headlamp/Flashlight', category: 'Electronics', essential: true, checked: false }
      );
    }

    // Essential items for all trips
    items.push(
      { id: 'e1', name: 'Toothbrush & Toothpaste', category: 'Toiletries', essential: true, checked: false },
      { id: 'e2', name: 'Shampoo & Body Wash', category: 'Toiletries', essential: true, checked: false },
      { id: 'e3', name: 'Deodorant', category: 'Toiletries', essential: true, checked: false },
      { id: 'e4', name: 'Phone Charger', category: 'Electronics', essential: true, checked: false },
      { id: 'e5', name: 'Travel Documents', category: 'Documents', essential: true, checked: false },
      { id: 'e6', name: 'Medications', category: 'Medical', essential: true, checked: false }
    );

    // Travel style adjustments
    if (data.travelStyle === 'luxury') {
      items.push(
        { id: 'lux1', name: 'Dress Watch', category: 'Accessories', essential: false, checked: false },
        { id: 'lux2', name: 'Cologne/Perfume', category: 'Toiletries', essential: false, checked: false },
        { id: 'lux3', name: 'Jewelry', category: 'Accessories', essential: false, checked: false }
      );
    }

    if (data.travelStyle === 'backpacker') {
      items.push(
        { id: 'bp1', name: 'Travel Locks', category: 'Accessories', essential: true, checked: false },
        { id: 'bp2', name: 'Laundry Soap', category: 'Toiletries', essential: true, checked: false },
        { id: 'bp3', name: 'Multi-tool', category: 'Accessories', essential: false, checked: false }
      );
    }

    setPackingList(items);
  };

  const handleItemToggle = (itemId: string) => {
    setPackingList(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleBack = () => {
    setShowList(false);
    setTripData(null);
    setPackingList([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Luggage className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Pack My Bag</h1>
          </div>
          <p className="text-xl text-gray-600">Smart travel packing made simple</p>
        </div>

        {!showList ? (
          <TripForm onSubmit={handleTripSubmit} />
        ) : (
          <PackingList 
            items={packingList}
            tripData={tripData!}
            onItemToggle={handleItemToggle}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
