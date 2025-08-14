import React, { useState, useRef, useEffect } from 'react';
import { LuX, LuCalendar, LuBuilding, LuSearch } from 'react-icons/lu';

const ICON_OPTIONS = [
  { char: '🏦', label: 'Bank' },
  { char: '💼', label: 'Business' },
  { char: '💰', label: 'Money Bag' },
  { char: '💵', label: 'Cash' },
  { char: '📈', label: 'Chart Up' },
  { char: '🧾', label: 'Invoice' },
  { char: '💳', label: 'Card' },
  { char: '💎', label: 'Diamond' },
  { char: '🎁', label: 'Gift' },
  { char: '🏠', label: 'Home' },
  { char: '🧠', label: 'Skill' },
  { char: '🧑‍💻', label: 'Freelance' },
  { char: '📦', label: 'Product' },
  { char: '📊', label: 'Investment' },
  { char: '🪙', label: 'Coin' },
];

const AddIncomeModal = ({ isOpen, onClose, onAddIncome }) => {
  const [formData, setFormData] = useState({
    source: 'Interest From Saving Account',
    amount: '4300',
    date: '2025-02-01',
    icon: '🏦',
  });
  const [showPicker, setShowPicker] = useState(false);
  const [query, setQuery] = useState('');
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    if (showPicker) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPicker]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddIncome(formData);
    onClose();
    setFormData({ source: 'Interest From Saving Account', amount: '4300', date: '2025-02-01', icon: '🏦' });
    setQuery('');
    setShowPicker(false);
  };

  if (!isOpen) return null;

  const filteredIcons = ICON_OPTIONS.filter(
    (opt) => opt.label.toLowerCase().includes(query.toLowerCase()) || opt.char.includes(query)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Add Income</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <LuX className="text-xl" />
          </button>
        </div>

        {/* Icon + Pick Icon */}
        <div className="mb-6 relative" ref={pickerRef}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl select-none">
              {formData.icon ? <span>{formData.icon}</span> : <LuBuilding className="text-gray-600" />}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Pick Icon</span>
              <button
                type="button"
                onClick={() => setShowPicker((s) => !s)}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md border border-gray-200"
              >
                Choose
              </button>
            </div>
          </div>

          {showPicker && (
            <div className="absolute z-50 mt-3 w-[320px] sm:w-[360px] right-0 bg-white border border-gray-200 rounded-xl shadow-xl p-3">
              <div className="flex items-center gap-2 mb-3 px-2 py-1.5 bg-gray-50 rounded-md border border-gray-200">
                <LuSearch className="text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              <div className="max-h-64 overflow-auto grid grid-cols-8 gap-2">
                {filteredIcons.map((opt) => (
                  <button
                    key={opt.char + opt.label}
                    type="button"
                    className="h-9 w-9 rounded-md hover:bg-gray-100 flex items-center justify-center text-xl"
                    title={opt.label}
                    onClick={() => {
                      handleInputChange('icon', opt.char);
                      setShowPicker(false);
                    }}
                  >
                    <span className="select-none">{opt.char}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Income Source */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Income Source</label>
            <input
              type="text"
              value={formData.source}
              onChange={(e) => handleInputChange('source', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter income source"
            />
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter amount"
            />
          </div>

          {/* Date */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="relative">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
              />
              <LuCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Add Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
