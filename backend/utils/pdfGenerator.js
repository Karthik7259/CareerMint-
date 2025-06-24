const puppeteer = require('puppeteer');

const generatePDF = async (resumeData) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    const html = generateResumeHTML(resumeData);
    
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });
    
    return pdf;
  } finally {
    await browser.close();
  }
};

const generateResumeHTML = (resume) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, awards } = resume;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${personalInfo.firstName} ${personalInfo.lastName} - Resume</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
        }
        
        .container {
          max-width: 8.5in;
          margin: 0 auto;
          padding: 20px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #2563eb;
          padding-bottom: 20px;
        }
        
        .name {
          font-size: 28px;
          font-weight: bold;
          color: #1e40af;
          margin-bottom: 10px;
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          font-size: 14px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .section {
          margin-bottom: 25px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #1e40af;
          margin-bottom: 15px;
          padding-bottom: 5px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .summary {
          font-size: 14px;
          line-height: 1.8;
          text-align: justify;
        }
        
        .experience-item, .education-item, .project-item {
          margin-bottom: 20px;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .item-title {
          font-weight: bold;
          font-size: 16px;
          color: #1f2937;
        }
        
        .item-company {
          font-size: 14px;
          color: #6b7280;
          font-style: italic;
        }
        
        .item-date {
          font-size: 12px;
          color: #6b7280;
          white-space: nowrap;
        }
        
        .item-description {
          font-size: 13px;
          margin-bottom: 8px;
          line-height: 1.6;
        }
        
        .achievements {
          list-style: none;
          padding-left: 0;
        }
        
        .achievements li {
          font-size: 13px;
          margin-bottom: 4px;
          padding-left: 15px;
          position: relative;
        }
        
        .achievements li:before {
          content: "•";
          color: #2563eb;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .skill-category {
          background: #f8fafc;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #2563eb;
        }
        
        .skill-category h4 {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #1e40af;
        }
        
        .skill-list {
          font-size: 12px;
          line-height: 1.4;
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .project-item {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 15px;
          background: #f9fafb;
        }
        
        .project-tech {
          font-size: 11px;
          color: #6b7280;
          margin-top: 8px;
        }
        
        .certifications-list, .awards-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }
        
        .cert-item, .award-item {
          padding: 10px;
          background: #f1f5f9;
          border-radius: 6px;
          border-left: 3px solid #2563eb;
        }
        
        .cert-name, .award-title {
          font-weight: bold;
          font-size: 13px;
          color: #1e40af;
        }
        
        .cert-issuer, .award-issuer {
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }
        
        .cert-date, .award-date {
          font-size: 11px;
          color: #9ca3af;
          margin-top: 4px;
        }
        
        @media print {
          body {
            font-size: 12px;
          }
          
          .container {
            padding: 10px;
          }
          
          .section {
            margin-bottom: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="name">${personalInfo.firstName} ${personalInfo.lastName}</div>
          <div class="contact-info">
            <div class="contact-item">📧 ${personalInfo.email}</div>
            <div class="contact-item">📱 ${personalInfo.phone}</div>
            ${personalInfo.location ? `<div class="contact-item">📍 ${personalInfo.location}</div>` : ''}
            ${personalInfo.linkedin ? `<div class="contact-item">💼 ${personalInfo.linkedin}</div>` : ''}
            ${personalInfo.github ? `<div class="contact-item">🔗 ${personalInfo.github}</div>` : ''}
            ${personalInfo.website ? `<div class="contact-item">🌐 ${personalInfo.website}</div>` : ''}
          </div>
        </div>
        
        ${summary ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <div class="summary">${summary}</div>
        </div>
        ` : ''}
        
        ${experience && experience.length > 0 ? `
        <div class="section">
          <div class="section-title">Professional Experience</div>
          ${experience.map(exp => `
            <div class="experience-item">
              <div class="item-header">
                <div>
                  <div class="item-title">${exp.position}</div>
                  <div class="item-company">${exp.company}</div>
                </div>
                <div class="item-date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
              </div>
              ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
              ${exp.achievements && exp.achievements.length > 0 ? `
                <ul class="achievements">
                  ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        ${education && education.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${education.map(edu => `
            <div class="education-item">
              <div class="item-header">
                <div>
                  <div class="item-title">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</div>
                  <div class="item-company">${edu.institution}</div>
                </div>
                <div class="item-date">${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}</div>
              </div>
              ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ''}
              ${edu.achievements && edu.achievements.length > 0 ? `
                <ul class="achievements">
                  ${edu.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        ${skills && (skills.technical?.length > 0 || skills.soft?.length > 0 || skills.languages?.length > 0) ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-grid">
            ${skills.technical && skills.technical.length > 0 ? `
              <div class="skill-category">
                <h4>Technical Skills</h4>
                <div class="skill-list">${skills.technical.join(', ')}</div>
              </div>
            ` : ''}
            ${skills.soft && skills.soft.length > 0 ? `
              <div class="skill-category">
                <h4>Soft Skills</h4>
                <div class="skill-list">${skills.soft.join(', ')}</div>
              </div>
            ` : ''}
            ${skills.languages && skills.languages.length > 0 ? `
              <div class="skill-category">
                <h4>Languages</h4>
                <div class="skill-list">${skills.languages.join(', ')}</div>
              </div>
            ` : ''}
          </div>
        </div>
        ` : ''}
        
        ${projects && projects.length > 0 ? `
        <div class="section">
          <div class="section-title">Projects</div>
          <div class="projects-grid">
            ${projects.map(project => `
              <div class="project-item">
                <div class="item-title">${project.name}</div>
                <div class="item-description">${project.description}</div>
                ${project.technologies && project.technologies.length > 0 ? `
                  <div class="project-tech"><strong>Technologies:</strong> ${project.technologies.join(', ')}</div>
                ` : ''}
                ${project.url ? `<div class="project-tech"><strong>URL:</strong> ${project.url}</div>` : ''}
                ${project.github ? `<div class="project-tech"><strong>GitHub:</strong> ${project.github}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
        
        ${certifications && certifications.length > 0 ? `
        <div class="section">
          <div class="section-title">Certifications</div>
          <div class="certifications-list">
            ${certifications.map(cert => `
              <div class="cert-item">
                <div class="cert-name">${cert.name}</div>
                <div class="cert-issuer">${cert.issuer}</div>
                <div class="cert-date">${cert.date}</div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
        
        ${awards && awards.length > 0 ? `
        <div class="section">
          <div class="section-title">Awards & Recognition</div>
          <div class="awards-list">
            ${awards.map(award => `
              <div class="award-item">
                <div class="award-title">${award.title}</div>
                <div class="award-issuer">${award.issuer}</div>
                <div class="cert-date">${award.date}</div>
                ${award.description ? `<div class="item-description">${award.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;
};

module.exports = { generatePDF };
