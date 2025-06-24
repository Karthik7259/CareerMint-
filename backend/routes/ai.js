const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get AI suggestions for resume improvement
router.post('/suggestions', async (req, res) => {
  try {
    const { resumeData, targetRole, industry } = req.body;    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
As a professional resume expert, analyze the following resume and provide specific, actionable suggestions for improvement.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Target Role: ${targetRole || 'Not specified'}
Industry: ${industry || 'Not specified'}

Please provide suggestions in the following categories:
1. Professional Summary - How to make it more compelling and targeted
2. Experience Section - How to better highlight achievements and impact
3. Skills Section - Missing skills or better organization
4. Overall Structure - Formatting and organization improvements
5. Content Optimization - Keywords and industry-specific terms

Format your response as a JSON object with the following structure:
{
  "overallScore": 85,
  "summary": "Brief overall assessment",
  "suggestions": {
    "professionalSummary": ["suggestion1", "suggestion2"],
    "experience": ["suggestion1", "suggestion2"],
    "skills": ["suggestion1", "suggestion2"],
    "structure": ["suggestion1", "suggestion2"],
    "content": ["suggestion1", "suggestion2"]
  },
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"]
}

Provide practical, specific suggestions that the user can immediately implement.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestions = response.text();

    // Try to parse the response as JSON, fallback to text if it fails
    let parsedSuggestions;
    try {
      parsedSuggestions = JSON.parse(suggestions);
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      parsedSuggestions = {
        overallScore: 75,
        summary: "AI analysis completed",
        suggestions: {
          general: [suggestions]
        }
      };
    }

    res.json(parsedSuggestions);
  } catch (error) {
    console.error('AI Suggestion Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate suggestions',
      message: error.message 
    });
  }
});

// Get industry-specific keywords
router.post('/keywords', async (req, res) => {
  try {
    const { industry, role } = req.body;

    if (!industry && !role) {      return res.status(400).json({ error: 'Industry or role is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
Generate a list of important keywords and skills for the following:
Industry: ${industry || 'General'}
Role: ${role || 'General'}

Provide the response as a JSON object with the following structure:
{
  "technicalSkills": ["skill1", "skill2", "skill3"],
  "softSkills": ["skill1", "skill2", "skill3"],
  "industryKeywords": ["keyword1", "keyword2", "keyword3"],
  "tools": ["tool1", "tool2", "tool3"],
  "certifications": ["cert1", "cert2", "cert3"]
}

Focus on current, in-demand skills and keywords that would make a resume stand out.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const keywords = response.text();

    let parsedKeywords;
    try {
      parsedKeywords = JSON.parse(keywords);
    } catch (parseError) {
      parsedKeywords = {
        general: [keywords]
      };
    }

    res.json(parsedKeywords);
  } catch (error) {
    console.error('Keyword Generation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate keywords',
      message: error.message 
    });
  }
});

// Improve specific section of resume
router.post('/improve-section', async (req, res) => {
  try {
    const { section, content, context } = req.body;    if (!section || !content) {
      return res.status(400).json({ error: 'Section and content are required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
Improve the following ${section} section of a resume:

Current Content:
${content}

Context: ${context || 'General improvement'}

Please provide 3-5 improved versions that are:
1. More impactful and results-oriented
2. Better formatted
3. More professional
4. Include relevant keywords
5. Quantify achievements where possible

Return the response as JSON:
{
  "improved": ["version1", "version2", "version3"],
  "tips": ["tip1", "tip2", "tip3"]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const improvements = response.text();

    let parsedImprovements;
    try {
      parsedImprovements = JSON.parse(improvements);
    } catch (parseError) {
      parsedImprovements = {
        improved: [improvements]
      };
    }

    res.json(parsedImprovements);
  } catch (error) {
    console.error('Section Improvement Error:', error);
    res.status(500).json({ 
      error: 'Failed to improve section',
      message: error.message 
    });
  }
});

module.exports = router;
