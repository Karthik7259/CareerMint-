import React from 'react';
import { Plus, X } from 'lucide-react';

const CertificationsForm = ({ data, onChange }) => {
  const addCertification = () => {
    const newCert = {
      name: '',
      issuer: '',
      date: '',
      url: ''
    };
    onChange([...data, newCert]);
  };

  const removeCertification = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateCertification = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
        <button
          onClick={addCertification}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
        >
          <Plus size={16} />
          Add Certification
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🏆</div>
          <p>No certifications added yet.</p>
          <p className="text-sm">Add your professional certifications to stand out.</p>
        </div>
      ) : (
        data.map((cert, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => removeCertification(index)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certification Name *
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Amazon Web Services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Obtained *
                </label>
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => updateCertification(index, 'date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., June 2023 or 06/2023"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate URL
                </label>
                <input
                  type="url"
                  value={cert.url}
                  onChange={(e) => updateCertification(index, 'url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CertificationsForm;
