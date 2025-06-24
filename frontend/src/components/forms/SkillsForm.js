import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState({ technical: '', soft: '', languages: '' });

  const addSkill = (category) => {
    if (newSkill[category].trim()) {
      const updated = {
        ...data,
        [category]: [...(data[category] || []), newSkill[category].trim()]
      };
      onChange(updated);
      setNewSkill({ ...newSkill, [category]: '' });
    }
  };

  const removeSkill = (category, index) => {
    const updated = {
      ...data,
      [category]: data[category].filter((_, i) => i !== index)
    };
    onChange(updated);
  };

  const handleKeyPress = (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category);
    }
  };

  const skillCategories = [
    {
      key: 'technical',
      title: 'Technical Skills',
      placeholder: 'e.g., JavaScript, Python, React, AWS',
      description: 'Programming languages, frameworks, tools, and technologies'
    },
    {
      key: 'soft',
      title: 'Soft Skills',
      placeholder: 'e.g., Leadership, Communication, Problem Solving',
      description: 'Personal attributes and interpersonal skills'
    },
    {
      key: 'languages',
      title: 'Languages',
      placeholder: 'e.g., English (Native), Spanish (Fluent)',
      description: 'Spoken languages and proficiency levels'
    }
  ];

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-medium text-gray-900">Skills</h3>
      
      {skillCategories.map((category) => (
        <div key={category.key} className="border border-gray-200 rounded-lg p-6">
          <div className="mb-4">
            <h4 className="text-md font-medium text-gray-900 mb-1">{category.title}</h4>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>

          {/* Add new skill */}
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              value={newSkill[category.key]}
              onChange={(e) => setNewSkill({ ...newSkill, [category.key]: e.target.value })}
              onKeyPress={(e) => handleKeyPress(e, category.key)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={category.placeholder}
            />
            <button
              onClick={() => addSkill(category.key)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-1 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Existing skills */}
          {data[category.key] && data[category.key].length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data[category.key].map((skill, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center space-x-2 text-sm"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(category.key, index)}
                    className="text-blue-600 hover:text-blue-800 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm italic">
              No {category.title.toLowerCase()} added yet
            </div>
          )}
        </div>
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Pro Tips for Skills Section</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Include both hard and soft skills relevant to your target role</li>
          <li>• Be specific about your proficiency level (e.g., "Advanced Python", "Conversational Spanish")</li>
          <li>• Prioritize skills mentioned in job descriptions you're applying for</li>
          <li>• Keep the list concise and relevant - quality over quantity</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsForm;
