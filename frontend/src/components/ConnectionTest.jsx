import { useState, useEffect } from 'react';
import api from '../utils/api';

const ConnectionTest = () => {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const response = await api.get('/health');
      if (response.data.status === 'OK') {
        setStatus('connected');
        setMessage('Backend is connected!');
      }
    } catch (error) {
      setStatus('error');
      setMessage(
        error.response
          ? `Backend responded with error: ${error.response.status}`
          : 'Cannot connect to backend. Make sure it\'s running on http://localhost:5000'
      );
    }
  };

  if (status === 'checking') {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 m-4 rounded">
        <p>Checking backend connection...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4 rounded">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">Backend Connection Failed</p>
            <p className="text-sm">{message}</p>
            <p className="text-sm mt-2">
              <strong>To fix:</strong>
            </p>
            <ol className="text-sm list-decimal list-inside mt-1">
              <li>Make sure MongoDB is running</li>
              <li>Navigate to backend folder: <code className="bg-red-200 px-1 rounded">cd backend</code></li>
              <li>Start the server: <code className="bg-red-200 px-1 rounded">npm run dev</code></li>
            </ol>
          </div>
          <button
            onClick={testConnection}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-4"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ConnectionTest;







