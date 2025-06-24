import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ResumeBuilder from './components/ResumeBuilder';
import ResumeList from './components/ResumeList';
import ResumePreview from './components/ResumePreview';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ResumeList />} />
            <Route path="/builder" element={<ResumeBuilder />} />
            <Route path="/builder/:id" element={<ResumeBuilder />} />
            <Route path="/preview/:id" element={<ResumePreview />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
