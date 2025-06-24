# Smart Resume Builder - Frontend

A React-based frontend for the Smart Resume Builder application with AI-powered suggestions.

## Features

- 📝 **Resume Builder**: Interactive forms for all resume sections
- 🤖 **AI Suggestions**: Get AI-powered suggestions for content improvement
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Clean, professional interface with Tailwind CSS
- 📄 **PDF Export**: Generate and download professional PDF resumes
- 💾 **Auto-save**: Automatic saving of resume data

## Technology Stack

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **Axios**: HTTP client for API requests

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Backend server running (see backend README)

## Installation

1. **Clone the repository and navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `REACT_APP_API_URL`: Your backend API URL (default: http://localhost:5000/api)

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your browser**:
   Navigate to http://localhost:3000

## Project Structure

```
src/
├── components/           # React components
│   ├── forms/           # Form components for resume sections
│   │   ├── PersonalInfoForm.js
│   │   ├── ExperienceForm.js
│   │   ├── EducationForm.js
│   │   ├── SkillsForm.js
│   │   ├── ProjectsForm.js
│   │   ├── CertificationsForm.js
│   │   └── AwardsForm.js
│   ├── Header.js        # Navigation header
│   ├── ResumeList.js    # Resume list/dashboard
│   ├── ResumeBuilder.js # Main resume builder interface
│   ├── ResumePreview.js # Resume preview component
│   └── AISuggestions.js # AI suggestions panel
├── services/
│   └── api.js          # API service layer
├── App.js              # Main app component with routing
├── index.js            # React app entry point
└── index.css           # Global styles and Tailwind CSS
```

## Usage

1. **Create New Resume**: Click "Create New Resume" from the dashboard
2. **Fill Sections**: Complete each section using the intuitive forms
3. **Get AI Help**: Use the AI suggestions panel for content improvement
4. **Preview**: Use the preview panel to see your resume in real-time
5. **Export**: Download your resume as a professional PDF

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
