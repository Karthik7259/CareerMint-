# Smart Resume Builder - Backend

A Node.js backend API for the Smart Resume Builder application with AI-powered suggestions using Google Gemini.

## Features

- **Resume CRUD Operations**: Create, read, update, and delete resumes
- **AI-Powered Suggestions**: Get personalized resume improvement suggestions using Google Gemini
- **PDF Generation**: Generate professional PDF resumes using Puppeteer
- **MongoDB Integration**: Store resume data in MongoDB
- **Rate Limiting**: Protect API endpoints from abuse
- **Security**: Built-in security features with Helmet and CORS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API key

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/resume-builder
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

## Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key and paste it in your `.env` file

## Database Setup

### Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. The application will automatically connect to `mongodb://localhost:27017/resume-builder`

### MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Resume Endpoints
- `GET /api/resume` - Get all resumes
- `GET /api/resume/:id` - Get a specific resume
- `POST /api/resume` - Create a new resume
- `PUT /api/resume/:id` - Update a resume
- `DELETE /api/resume/:id` - Delete a resume
- `GET /api/resume/:id/pdf` - Download resume as PDF

### AI Endpoints
- `POST /api/ai/suggestions` - Get AI suggestions for resume improvement
- `POST /api/ai/keywords` - Get industry-specific keywords
- `POST /api/ai/improve-section` - Improve a specific resume section

### Health Check
- `GET /api/health` - Check server status

## Rate Limiting

- General API: 100 requests per 15 minutes per IP
- AI endpoints: 10 requests per 15 minutes per IP

## PDF Generation

The application uses Puppeteer to generate PDF resumes. The PDFs are created with:
- Professional styling
- Print-optimized layout
- Proper formatting and spacing
- Support for all resume sections

## Error Handling

The API includes comprehensive error handling:
- Validation errors for required fields
- Database connection errors
- AI service errors
- Rate limiting errors
- Generic server errors

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Validate all inputs
- **Environment Variables**: Secure configuration

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network access for MongoDB Atlas

2. **Gemini API Errors**
   - Verify API key is correct
   - Check API quota limits
   - Ensure internet connectivity

3. **PDF Generation Issues**
   - Puppeteer requires additional dependencies on some systems
   - For Ubuntu/Debian: `sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget`

## Development

### Project Structure
```
backend/
├── config/
│   └── database.js       # Database configuration
├── models/
│   └── Resume.js         # Resume data model
├── routes/
│   ├── resume.js         # Resume CRUD routes
│   └── ai.js             # AI service routes
├── utils/
│   └── pdfGenerator.js   # PDF generation utility
├── server.js             # Main server file
├── package.json
└── .env.example
```

### Adding New Features
1. Create new routes in the `routes/` directory
2. Add corresponding models in `models/` if needed
3. Update server.js to include new routes
4. Add appropriate error handling and validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
