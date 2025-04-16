'use client';

import React from 'react';
import { DayType } from '@/types/calendar';
import { format } from 'date-fns';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: DayType) => void;
  currentDate: Date;
  currentType: DayType;
};

const DayModificationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelect,
  currentDate,
  currentType,
}) => {
  if (!isOpen) return null;

  const options: { type: DayType; label: string; bgColor: string }[] = [
    { type: 'work', label: 'Working Day', bgColor: 'bg-[#FFCC00]' },
    { type: 'off', label: 'Day Off', bgColor: 'bg-[#22C55E]' },
    { type: 'vacation', label: 'Vacation', bgColor: 'bg-blue-500' },
    { type: 'sick', label: 'Sick Leave', bgColor: 'bg-red-500' },
    { type: 'additional_vacation', label: 'Additional Vacation', bgColor: 'bg-purple-500' },
  ];

  const handleSelect = (type: DayType) => {
    onSelect(type);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-[#D40511]">
          {format(currentDate, 'MMMM d, yyyy')}
        </h2>
        <div className="space-y-3">
          {options.map(({ type, label, bgColor }) => (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className={`w-full p-3 rounded-lg text-white font-bold transition-all duration-300 transform hover:scale-105 ${
                bgColor
              } ${
                currentType === type ? 'ring-4 ring-[#D40511]' : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full p-3 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DayModificationModal;
