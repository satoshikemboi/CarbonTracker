import { useState, useEffect } from 'react';

const AITipsPage = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTips = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-tips');
      const data = await response.json();
      setTips(data.tips || []);
    } catch (error) {
      console.error('Error fetching tips:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">AI Sustainability Tips</h1>
      
      <button 
        onClick={fetchTips}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 mb-6"
      >
        {loading ? 'Loading...' : 'Get New Tips'}
      </button>

      <div className="grid gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <p className="text-gray-700">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AITipsPage;