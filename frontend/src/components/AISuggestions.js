import React, { useState, useEffect } from 'react';
import { X, Brain, Loader, Star, TrendingUp, AlertCircle } from 'lucide-react';
import ApiService from '../services/api';

const AISuggestions = ({ resumeData, currentSection, onClose }) => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [industry, setIndustry] = useState('');

  useEffect(() => {
    if (resumeData && Object.keys(resumeData).length > 0) {
      getSuggestions();
    }
  }, [resumeData]);
  const getSuggestions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await ApiService.getAISuggestions(resumeData, targetRole, industry);
      setSuggestions(data);
    } catch (err) {
      console.error('Error getting AI suggestions:', err);
      setError(err.message);
      
      // Provide fallback suggestions when AI is unavailable
      const fallbackSuggestions = getFallbackSuggestions(currentSection);
      setSuggestions(fallbackSuggestions);
    } finally {
      setLoading(false);
    }
  };

  const getFallbackSuggestions = (section) => {
    const fallbacks = {
      personal: {
        overallScore: 70,
        summary: 'Basic suggestions (AI temporarily unavailable)',
        suggestions: {
          general: [
            'Ensure your contact information is complete and professional',
            'Use a professional email address',
            'Include your LinkedIn profile URL',
            'Add your location (city, state/country)',
            'Consider adding a professional website or portfolio link'
          ]
        }
      },
      summary: {
        overallScore: 70,
        summary: 'Basic suggestions (AI temporarily unavailable)',
        suggestions: {
          general: [
            'Keep your summary between 2-4 sentences',
            'Highlight your most relevant experience and skills',
            'Use action words and specific achievements',
            'Tailor your summary to the job you\'re applying for',
            'Quantify your experience (e.g., "5+ years of experience")'
          ]
        }
      },
      experience: {
        overallScore: 70,
        summary: 'Basic suggestions (AI temporarily unavailable)',
        suggestions: {
          general: [
            'Use action verbs to start each bullet point',
            'Quantify your achievements with numbers and percentages',
            'Focus on results and impact, not just responsibilities',
            'Use the STAR method (Situation, Task, Action, Result)',
            'List experiences in reverse chronological order'
          ]
        }
      },
      skills: {
        overallScore: 70,
        summary: 'Basic suggestions (AI temporarily unavailable)',
        suggestions: {
          general: [
            'Organize skills into categories (Technical, Soft Skills, Languages)',
            'Include relevant programming languages and technologies',
            'Add proficiency levels for languages',
            'Include industry-specific tools and software',
            'Balance technical and soft skills'
          ]
        }
      }
    };

    return fallbacks[section] || fallbacks.general || {
      overallScore: 70,
      summary: 'Basic suggestions (AI temporarily unavailable)',
      suggestions: {
        general: [
          'Ensure all information is accurate and up-to-date',
          'Use consistent formatting throughout',
          'Proofread for spelling and grammar errors',
          'Keep content relevant to your target role',
          'Highlight your unique value proposition'
        ]
      }
    };
  };

  const handleRefreshSuggestions = () => {
    getSuggestions();
  };

  const renderSuggestionsList = (suggestionArray, title, icon) => {
    if (!suggestionArray || suggestionArray.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          {icon}
          <h4 className="font-medium text-gray-900">{title}</h4>
        </div>
        <ul className="space-y-2">
          {suggestionArray.map((suggestion, index) => (
            <li key={index} className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
              • {suggestion}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <h3 className="font-medium text-gray-900">AI Suggestions</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {/* Input Section */}
        <div className="mb-6 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Role (Optional)
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Software Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry (Optional)
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Technology"
            />
          </div>
          <button
            onClick={handleRefreshSuggestions}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Brain className="h-4 w-4" />
            )}
            <span>{loading ? 'Analyzing...' : 'Get AI Suggestions'}</span>
          </button>
        </div>        {/* Error State */}
        {error && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-amber-800 font-medium">
                  {error.includes('API key') ? 'AI Temporarily Unavailable' : 'Connection Error'}
                </p>
                <p className="text-sm text-amber-700 mt-1">{error}</p>
                {error.includes('API key') && (
                  <p className="text-xs text-amber-600 mt-2">
                    💡 Don't worry! We've provided basic suggestions below while the AI service is being restored.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* Suggestions Content */}
        {suggestions && !loading && (
          <div className="space-y-6">
            {/* Overall Score */}
            {suggestions.overallScore && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-800">Overall Score</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-lg font-bold text-purple-900">{suggestions.overallScore}/100</span>
                  </div>
                </div>
                {suggestions.summary && (
                  <p className="text-sm text-purple-700">{suggestions.summary}</p>
                )}
              </div>
            )}

            {/* Strengths */}
            {suggestions.strengths && suggestions.strengths.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <h4 className="font-medium text-green-800">Strengths</h4>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  {suggestions.strengths.map((strength, index) => (
                    <li key={index}>• {strength}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Keywords */}
            {suggestions.keywords && suggestions.keywords.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Recommended Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions by Category */}
            {suggestions.suggestions && (
              <div className="space-y-4">
                {renderSuggestionsList(
                  suggestions.suggestions.professionalSummary,
                  'Professional Summary',
                  <span className="text-blue-600">📝</span>
                )}
                {renderSuggestionsList(
                  suggestions.suggestions.experience,
                  'Experience Section',
                  <span className="text-green-600">💼</span>
                )}
                {renderSuggestionsList(
                  suggestions.suggestions.skills,
                  'Skills Section',
                  <span className="text-purple-600">⚡</span>
                )}
                {renderSuggestionsList(
                  suggestions.suggestions.structure,
                  'Structure & Format',
                  <span className="text-orange-600">📋</span>
                )}
                {renderSuggestionsList(
                  suggestions.suggestions.content,
                  'Content Optimization',
                  <span className="text-red-600">🎯</span>
                )}
                {renderSuggestionsList(
                  suggestions.suggestions.general,
                  'General Suggestions',
                  <span className="text-gray-600">💡</span>
                )}
              </div>
            )}

            {/* Improvements */}
            {suggestions.improvements && suggestions.improvements.length > 0 && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <h4 className="font-medium text-yellow-800">Areas for Improvement</h4>
                </div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {suggestions.improvements.map((improvement, index) => (
                    <li key={index}>• {improvement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!suggestions && !loading && !error && (
          <div className="text-center py-8 text-gray-500">
            <Brain className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm">Fill in some resume information and click "Get AI Suggestions" to receive personalized recommendations.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestions;
