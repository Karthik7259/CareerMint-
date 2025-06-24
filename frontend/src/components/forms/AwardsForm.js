import React from 'react';
import { Plus, X } from 'lucide-react';

const AwardsForm = ({ data, onChange }) => {
  const addAward = () => {
    const newAward = {
      title: '',
      issuer: '',
      date: '',
      description: ''
    };
    onChange([...data, newAward]);
  };

  const removeAward = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateAward = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Awards & Honors</h3>
        <button
          onClick={addAward}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
        >
          <Plus size={16} />
          Add Award
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🥇</div>
          <p>No awards added yet.</p>
          <p className="text-sm">Showcase your achievements and recognition.</p>
        </div>
      ) : (
        data.map((award, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => removeAward(index)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Award Title *
                </label>
                <input
                  type="text"
                  value={award.title}
                  onChange={(e) => updateAward(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Employee of the Year"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  value={award.issuer}
                  onChange={(e) => updateAward(index, 'issuer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., ABC Company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Received *
                </label>
                <input
                  type="text"
                  value={award.date}
                  onChange={(e) => updateAward(index, 'date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., December 2023"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={award.description}
                  onChange={(e) => updateAward(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe what you achieved to earn this award..."
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AwardsForm;
