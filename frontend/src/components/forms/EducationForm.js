import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      achievements: ['']
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addAchievement = (eduIndex) => {
    const updated = [...data];
    updated[eduIndex].achievements.push('');
    onChange(updated);
  };

  const removeAchievement = (eduIndex, achIndex) => {
    const updated = [...data];
    updated[eduIndex].achievements = updated[eduIndex].achievements.filter((_, i) => i !== achIndex);
    onChange(updated);
  };

  const updateAchievement = (eduIndex, achIndex, value) => {
    const updated = [...data];
    updated[eduIndex].achievements[achIndex] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Education</h3>
        <button
          onClick={addEducation}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No education added yet. Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((education, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-gray-900">Education {index + 1}</h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution Name *
                  </label>
                  <input
                    type="text"
                    value={education.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Stanford University"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree *
                  </label>
                  <input
                    type="text"
                    value={education.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Bachelor of Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={education.fieldOfStudy}
                    onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={education.gpa}
                    onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 3.8/4.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="text"
                    value={education.startDate}
                    onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., September 2019"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={education.endDate}
                    onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                    disabled={education.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="e.g., May 2023"
                  />
                  <div className="mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={education.current}
                        onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Currently studying here</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Achievements & Honors
                  </label>
                  <button
                    onClick={() => addAchievement(index)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Achievement
                  </button>
                </div>
                
                {education.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Dean's List, Magna Cum Laude"
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

export default EducationForm;
