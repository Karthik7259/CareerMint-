import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';

const ProjectsForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      url: '',
      github: ''
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addTechnology = (projectIndex, tech) => {
    if (tech.trim()) {
      const updated = [...data];
      updated[projectIndex].technologies = [...updated[projectIndex].technologies, tech.trim()];
      onChange(updated);
    }
  };

  const removeTechnology = (projectIndex, techIndex) => {
    const updated = [...data];
    updated[projectIndex].technologies = updated[projectIndex].technologies.filter((_, i) => i !== techIndex);
    onChange(updated);
  };

  const TechnologyInput = ({ projectIndex, technologies }) => {
    const [newTech, setNewTech] = useState('');

    const handleAdd = () => {
      addTechnology(projectIndex, newTech);
      setNewTech('');
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAdd();
      }
    };

    return (
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., React, Node.js, MongoDB"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center space-x-1 text-sm"
              >
                <span>{tech}</span>
                <button
                  onClick={() => removeTechnology(projectIndex, index)}
                  className="text-green-600 hover:text-green-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Projects</h3>
        <button
          onClick={addProject}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No projects added yet. Click "Add Project" to showcase your work.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-gray-900">Project {index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProject(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., E-commerce Website"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={project.startDate}
                    onChange={(e) => updateProject(index, 'startDate', e.target.value)}
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
                    value={project.endDate}
                    onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., March 2023 or Present"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project URL
                  </label>
                  <input
                    type="url"
                    value={project.url}
                    onChange={(e) => updateProject(index, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://your-project.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Repository
                  </label>
                  <input
                    type="url"
                    value={project.github}
                    onChange={(e) => updateProject(index, 'github', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description *
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe what the project does, its key features, and your role in developing it..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies Used
                </label>
                <TechnologyInput 
                  projectIndex={index} 
                  technologies={project.technologies} 
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-green-800 mb-2">💡 Pro Tips for Projects Section</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Focus on projects that demonstrate skills relevant to your target role</li>
          <li>• Include quantifiable results when possible (e.g., "Improved performance by 40%")</li>
          <li>• Provide links to live demos or GitHub repositories</li>
          <li>• Highlight your specific contributions in team projects</li>
          <li>• Choose 2-4 of your best projects rather than listing everything</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsForm;
