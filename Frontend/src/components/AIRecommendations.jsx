import React, { useEffect, useState } from "react";

// Mock-only version — shows carbon emission reduction recommendations without using any API
function AIRecommendations() {
  const [topic, setTopic] = useState("carbon footprint");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMockRecommendations = (query) => {
    setLoading(true);
    setTimeout(() => {
      const recs = [
        {
          title: "Switch to Renewable Energy",
          description:
            "Install solar panels or choose a renewable energy provider to reduce reliance on fossil fuels.",
        },
        {
          title: "Drive Less, Move Smarter",
          description:
            "Carpool, walk, cycle, or use public transport instead of driving alone to cut transportation emissions.",
        },
        {
          title: "Use Energy Efficient Appliances",
          description:
            "Upgrade to energy-efficient appliances, switch off devices when not in use, and use LED lighting.",
        },
        {
          title: "Reduce Waste",
          description:
            "Recycle, compost, and avoid single-use plastics to minimize carbon-intensive waste processing.",
        },
        {
          title: "Support Reforestation Projects",
          description:
            "Plant trees or support verified carbon offset programs to balance your unavoidable emissions.",
        },
      ];

      // Optionally shuffle recommendations slightly based on topic
      const randomized = recs.sort(() => 0.5 - Math.random());
      setRecommendations(randomized.slice(0, 5));
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchMockRecommendations(topic);
  }, []); // Load some sample data on mount

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">
          CO2 emission reduction recommendations from your past activities.
        </h1>
        <p className="text-sm text-gray-600">
          Explore practical ways to lower your carbon footprint.
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., energy, transport)"
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring"
        />
        <button
          onClick={() => fetchMockRecommendations(topic)}
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </div>

      {recommendations.length > 0 ? (
        <ul className="space-y-4">
          {recommendations.map((r, i) => (
            <li key={i} className="p-4 border rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">{r.title}</h3>
              <p className="text-sm text-gray-700 mt-1">{r.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500 mt-4">
          {loading
            ? "Generating recommendations..."
            : "Enter a topic and click 'Get Recommendations'."}
        </div>
      )}

    </div>
  );
}

export default AIRecommendations;
