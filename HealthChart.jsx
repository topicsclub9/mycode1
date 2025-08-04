import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const HealthChart = ({ healthData }) => {
  if (!healthData) return null;

  const { chakras, total } = healthData;

  // Chakra colors
  const chakraColors = [
    '#9C27B0', // Crown - Violet
    '#3F51B5', // Third Eye - Indigo
    '#2196F3', // Throat - Blue
    '#4CAF50', // Heart - Green
    '#FFEB3B', // Solar Plexus - Yellow
    '#FF9800', // Sacral - Orange
    '#F44336'  // Root - Red
  ];

  const getProgressColor = (value) => {
    if (value >= 7) return 'bg-green-500';
    if (value >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const ChakraRow = ({ chakra, index }) => (
    <div className="space-y-3 p-4 rounded-lg bg-gray-50">
      <div className="flex items-center gap-3">
        <div 
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: chakraColors[index] }}
        ></div>
        <h4 className="font-semibold text-gray-800">{chakra.name}</h4>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Physics</span>
            <span className="text-sm font-semibold">{chakra.physics}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(chakra.physics)}`}
              style={{ width: `${(chakra.physics / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Energy</span>
            <span className="text-sm font-semibold">{chakra.energy}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(chakra.energy)}`}
              style={{ width: `${(chakra.energy / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Emotions</span>
            <span className="text-sm font-semibold">{chakra.emotions}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(chakra.emotions)}`}
              style={{ width: `${(chakra.emotions / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 text-center">
          Health & Chakra Analysis
        </CardTitle>
        <p className="text-gray-600 text-center">
          Your energy centers and their current state based on your matrix
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Summary */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{total.physics}</div>
            <div className="text-sm text-gray-600">Total Physics</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{total.energy}</div>
            <div className="text-sm text-gray-600">Total Energy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{total.emotions}</div>
            <div className="text-sm text-gray-600">Total Emotions</div>
          </div>
        </div>

        {/* Individual Chakras */}
        <div className="space-y-4">
          {chakras.map((chakra, index) => (
            <ChakraRow key={index} chakra={chakra} index={index} />
          ))}
        </div>

        {/* Health Interpretation */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Health Interpretation</h4>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Physics ({total.physics}):</strong> Represents your physical vitality and body strength. 
              Higher values indicate better physical health and energy.
            </p>
            <p>
              <strong>Energy ({total.energy}):</strong> Shows your spiritual and life force energy. 
              This affects your motivation and overall energy levels.
            </p>
            <p>
              <strong>Emotions ({total.emotions}):</strong> Reflects your emotional balance and stability. 
              Higher values suggest better emotional regulation and mental health.
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Recommendations</h4>
          <div className="text-sm text-blue-700 space-y-1">
            {total.physics < 20 && (
              <p>• Focus on physical exercise and body strengthening practices</p>
            )}
            {total.energy < 15 && (
              <p>• Consider meditation, yoga, or energy healing practices</p>
            )}
            {total.emotions < 18 && (
              <p>• Work on emotional balance through mindfulness and self-care</p>
            )}
            {total.physics >= 20 && total.energy >= 15 && total.emotions >= 18 && (
              <p>• Your energy centers are well-balanced. Maintain your current practices!</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthChart;

