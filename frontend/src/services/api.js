const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  // Resume CRUD operations
  static async getResumes() {
    const response = await fetch(`${API_BASE_URL}/resume`);
    if (!response.ok) throw new Error('Failed to fetch resumes');
    return response.json();
  }

  static async getResume(id) {
    const response = await fetch(`${API_BASE_URL}/resume/${id}`);
    if (!response.ok) throw new Error('Failed to fetch resume');
    return response.json();
  }

  static async createResume(resumeData) {
    const response = await fetch(`${API_BASE_URL}/resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeData),
    });
    if (!response.ok) throw new Error('Failed to create resume');
    return response.json();
  }

  static async updateResume(id, resumeData) {
    const response = await fetch(`${API_BASE_URL}/resume/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeData),
    });
    if (!response.ok) throw new Error('Failed to update resume');
    return response.json();
  }

  static async deleteResume(id) {
    const response = await fetch(`${API_BASE_URL}/resume/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete resume');
    return response.json();
  }

  static async downloadResumePDF(id) {
    const response = await fetch(`${API_BASE_URL}/resume/${id}/pdf`);
    if (!response.ok) throw new Error('Failed to generate PDF');
    return response.blob();
  }
  // AI Services
  static async getAISuggestions(resumeData, targetRole = '', industry = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeData, targetRole, industry }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 500 && errorData.message?.includes('API key')) {
          throw new Error('AI service temporarily unavailable. The API key may need to be renewed.');
        }
        throw new Error(errorData.message || 'Failed to get AI suggestions');
      }
      
      return response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to backend server. Please check if the server is running.');
      }
      throw error;
    }
  }

  static async getKeywords(industry, role) {
    const response = await fetch(`${API_BASE_URL}/ai/keywords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ industry, role }),
    });
    if (!response.ok) throw new Error('Failed to get keywords');
    return response.json();
  }

  static async improveSection(section, content, context = '') {
    const response = await fetch(`${API_BASE_URL}/ai/improve-section`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ section, content, context }),
    });
    if (!response.ok) throw new Error('Failed to improve section');
    return response.json();
  }
}

export default ApiService;
