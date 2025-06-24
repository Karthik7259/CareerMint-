import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Edit, Loader } from 'lucide-react';
import ApiService from '../services/api';

const ResumePreview = () => {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

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
      setError('Failed to load resume');
      console.error('Error fetching resume:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const blob = await ApiService.downloadResumePDF(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${resumeData.personalInfo?.firstName}_${resumeData.personalInfo?.lastName}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Failed to download PDF');
      console.error('Error downloading PDF:', err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800">{error || 'Resume not found'}</p>
        </div>
      </div>
    );
  }

  const { personalInfo, summary, experience, education, skills, projects, certifications, awards } = resumeData;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Resumes</span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <Link
            to={`/builder/${id}`}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Resume</span>
          </Link>
          
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            {downloading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            <span>{downloading ? 'Downloading...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden" id="resume-preview">
        <div className="max-w-4xl mx-auto bg-white">
          {/* Header */}
          {personalInfo && (
            <div className="text-center py-8 px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <h1 className="text-4xl font-bold mb-2">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-4 text-blue-100">
                {personalInfo.email && (
                  <span className="flex items-center">
                    📧 {personalInfo.email}
                  </span>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center">
                    📱 {personalInfo.phone}
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center">
                    📍 {personalInfo.location}
                  </span>
                )}
                {personalInfo.linkedin && (
                  <span className="flex items-center">
                    💼 LinkedIn
                  </span>
                )}
                {personalInfo.github && (
                  <span className="flex items-center">
                    🔗 GitHub
                  </span>
                )}
                {personalInfo.website && (
                  <span className="flex items-center">
                    🌐 Website
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="p-8 space-y-8">
            {/* Professional Summary */}
            {summary && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{summary}</p>
              </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                        </div>
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-gray-700 mb-3">{exp.description}</p>
                      )}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-green-200 pl-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                          </h3>
                          <p className="text-lg text-green-600 font-medium">{edu.institution}</p>
                        </div>
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                        </span>
                      </div>
                      {edu.gpa && (
                        <p className="text-gray-700 mb-2">GPA: {edu.gpa}</p>
                      )}
                      {edu.achievements && edu.achievements.length > 0 && (
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {edu.achievements.map((achievement, achIndex) => (
                            <li key={achIndex}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills && (skills.technical?.length > 0 || skills.soft?.length > 0 || skills.languages?.length > 0) && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
                  Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {skills.technical && skills.technical.length > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Technical Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.technical.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {skills.soft && skills.soft.length > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Soft Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.soft.map((skill, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {skills.languages && skills.languages.length > 0 && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-purple-800 mb-2">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.languages.map((skill, index) => (
                          <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
                  Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                      <p className="text-gray-700 mb-3">{project.description}</p>
                      
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-600 mb-1">Technologies:</p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, techIndex) => (
                              <span key={techIndex} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-4 text-sm text-blue-600">
                        {project.url && (
                          <span>🌐 Live Demo</span>
                        )}
                        {project.github && (
                          <span>📂 GitHub</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
                  Certifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-gray-700">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Awards */}
            {awards && awards.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
                  Awards & Recognition
                </h2>
                <div className="space-y-4">
                  {awards.map((award, index) => (
                    <div key={index} className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                      <h3 className="font-semibold text-gray-900">{award.title}</h3>
                      <p className="text-gray-700">{award.issuer}</p>
                      <p className="text-sm text-gray-500 mb-2">{award.date}</p>
                      {award.description && (
                        <p className="text-gray-700">{award.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
