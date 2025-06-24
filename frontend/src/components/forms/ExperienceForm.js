import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = ({ data, onChange }) => {
  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addAchievement = (expIndex) => {
    const updated = [...data];
    updated[expIndex].achievements.push('');
    onChange(updated);
  };

  const removeAchievement = (expIndex, achIndex) => {
    const updated = [...data];
    updated[expIndex].achievements = updated[expIndex].achievements.filter((_, i) => i !== achIndex);
    onChange(updated);
  };

  const updateAchievement = (expIndex, achIndex, value) => {
    const updated = [...data];
    updated[expIndex].achievements[achIndex] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Professional Experience</h3>
        <button
          onClick={addExperience}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No experience added yet. Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((experience, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-gray-900">Experience {index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position Title *
                  </label>
                  <input
                    type="text"
                    value={experience.position}
                    onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={experience.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Google"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="text"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., January 2023"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    disabled={experience.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="e.g., December 2023"
                  />
                  <div className="mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={experience.current}
                        onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">I currently work here</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of your role and responsibilities..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Key Achievements
                  </label>
                  <button
                    onClick={() => addAchievement(index)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Achievement
                  </button>
                </div>
                
                {experience.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Increased team productivity by 25%"
                    />
                    <button
                      onClick={() => removeAchievement(index, achIndex)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
