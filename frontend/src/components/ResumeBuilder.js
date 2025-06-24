import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Brain, Eye, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import ApiService from '../services/api';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import AwardsForm from './forms/AwardsForm';
import AISuggestions from './AISuggestions';

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: []
    },
    projects: [],
    certifications: [],
    awards: []
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getResume(id);
      setResumeData(data);
    } catch (err) {
      console.error('Error fetching resume:', err);
      alert('Failed to load resume');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveStatus(null);
      
      if (id) {
        await ApiService.updateResume(id, resumeData);
        setSaveStatus('saved');
      } else {
        const newResume = await ApiService.createResume(resumeData);
        setSaveStatus('saved');
        navigate(`/builder/${newResume._id}`, { replace: true });
      }
    } catch (err) {
      console.error('Error saving resume:', err);
      setSaveStatus('error');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handlePreview = () => {
    if (id) {
      navigate(`/preview/${id}`);
    } else {
      alert('Please save the resume first to preview it');
    }
  };

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'summary', name: 'Summary', icon: '📝' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills', icon: '⚡' },
    { id: 'projects', name: 'Projects', icon: '🚀' },
    { id: 'certifications', name: 'Certifications', icon: '🏆' },
    { id: 'awards', name: 'Awards', icon: '🥇' }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(data) => updateResumeData('personalInfo', data)}
          />
        );
      case 'summary':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Summary
              </label>
              <textarea
                value={resumeData.summary}
                onChange={(e) => updateResumeData('summary', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a compelling summary that highlights your key qualifications and career objectives..."
              />
            </div>
          </div>
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData.experience}
            onChange={(data) => updateResumeData('experience', data)}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(data) => updateResumeData('education', data)}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(data) => updateResumeData('skills', data)}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(data) => updateResumeData('projects', data)}
          />
        );      case 'certifications':
        return (
          <CertificationsForm
            data={resumeData.certifications}
            onChange={(data) => updateResumeData('certifications', data)}
          />
        );      case 'awards':
        return (
          <AwardsForm
            data={resumeData.awards}
            onChange={(data) => updateResumeData('awards', data)}
          />
        );
      default:
        return <div>Section not implemented yet</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {id ? 'Edit Resume' : 'Create New Resume'}
          </h1>
          <p className="text-gray-600 mt-2">
            Build your professional resume with AI-powered suggestions
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {saveStatus === 'saved' && (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Saved
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              Error saving
            </div>
          )}
          
          <button
            onClick={() => setShowAI(!showAI)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <Brain className="h-4 w-4" />
            <span>AI Suggestions</span>
          </button>
          
          <button
            onClick={handlePreview}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            {saving ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-4">Resume Sections</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span>{section.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {renderSectionContent()}
          </div>
        </div>

        {/* AI Suggestions Panel */}
        {showAI && (
          <div className="w-80 flex-shrink-0">
            <AISuggestions
              resumeData={resumeData}
              currentSection={activeSection}
              onClose={() => setShowAI(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
