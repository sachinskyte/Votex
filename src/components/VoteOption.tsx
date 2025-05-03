import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface VoteOptionProps {
  id: string;
  name: string;
  description: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

const VoteOption = ({ id, name, description, selected, onSelect }: VoteOptionProps) => {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 ${
        selected 
          ? 'border-vote-neon ring-2 ring-vote-neon/30 shadow-[0_0_10px_rgba(57,255,20,0.2)]' 
          : 'border-gray-700 hover:border-vote-neon/50'
      }`}
      onClick={() => onSelect(id)}
    >
      <div className="flex items-start gap-3">
        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 ${
          selected ? 'border-vote-neon bg-vote-neon/20' : 'border-gray-700'
        }`}>
          {selected && (
            <div className="w-2.5 h-2.5 bg-vote-neon rounded-full m-auto"></div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-vote-neon mb-1">{name}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default VoteOption;
