import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Eye, Edit, Trash2, Download, Calendar } from 'lucide-react';
import ApiService from '../services/api';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getResumes();
      setResumes(data);
    } catch (err) {
      setError('Failed to load resumes. Please check if the backend server is running.');
      console.error('Error fetching resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await ApiService.deleteResume(id);
        setResumes(resumes.filter(resume => resume._id !== id));
      } catch (err) {
        alert('Failed to delete resume');
        console.error('Error deleting resume:', err);
      }
    }
  };

  const handleDownload = async (id, firstName, lastName) => {
    try {
      const blob = await ApiService.downloadResumePDF(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${firstName}_${lastName}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Failed to download PDF');
      console.error('Error downloading PDF:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
          <p className="text-gray-600 mt-2">Manage and create your professional resumes</p>
        </div>
        <Link
          to="/builder"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Resume</span>
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No resumes yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first resume</p>
          <Link
            to="/builder"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Create Your First Resume</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {resume.personalInfo?.firstName} {resume.personalInfo?.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {resume.personalInfo?.email}
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600 flex-shrink-0" />
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {resume.summary || 'No summary available'}
                  </p>
                </div>
                
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Updated {formatDate(resume.updatedAt)}</span>
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex space-x-2">
                    <Link
                      to={`/preview/${resume._id}`}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      to={`/builder/${resume._id}`}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDownload(resume._id, resume.personalInfo?.firstName, resume.personalInfo?.lastName)}
                      className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                      title="Download PDF"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(resume._id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeList;
