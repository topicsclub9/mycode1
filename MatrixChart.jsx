import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const MatrixChart = ({ matrixData }) => {
  if (!matrixData) return null;

  const { primarySquare, primaryCorners, diagonalSquare, centerPoint } = matrixData;

  // Chart dimensions and positioning
  const chartSize = 400;
  const centerSize = 60;
  const nodeSize = 40;
  const cornerSize = 35;
  const innerNodeSize = 30;

  // Position calculations
  const center = chartSize / 2;
  const outerDistance = 140;
  const cornerDistance = 100;
  const innerDistance = 70;

  // Primary square positions (main points)
  const primaryPositions = {
    top: { x: center, y: center - outerDistance },
    right: { x: center + outerDistance, y: center },
    bottom: { x: center, y: center + outerDistance },
    left: { x: center - outerDistance, y: center }
  };

  // Corner positions
  const cornerPositions = {
    topRight: { x: center + cornerDistance, y: center - cornerDistance },
    bottomRight: { x: center + cornerDistance, y: center + cornerDistance },
    bottomLeft: { x: center - cornerDistance, y: center + cornerDistance },
    topLeft: { x: center - cornerDistance, y: center - cornerDistance }
  };

  // Inner diagonal positions
  const innerPositions = {
    centerTop: { x: center, y: center - innerDistance },
    centerRight: { x: center + innerDistance, y: center },
    centerBottom: { x: center, y: center + innerDistance },
    centerLeft: { x: center - innerDistance, y: center }
  };

  // Color scheme for different energy levels
  const getEnergyColor = (number) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#F4D03F',
      '#D7BDE2', '#A3E4D7', '#FAD7A0', '#D5A6BD', '#AED6F1',
      '#F9E79F', '#A9DFBF'
    ];
    return colors[(number - 1) % colors.length];
  };

  const ChartNode = ({ x, y, number, size, label, isCenter = false }) => (
    <g>
      <circle
        cx={x}
        cy={y}
        r={size / 2}
        fill={getEnergyColor(number)}
        stroke="#fff"
        strokeWidth="3"
        className="drop-shadow-lg"
      />
      <text
        x={x}
        y={y + 6}
        textAnchor="middle"
        className="fill-white font-bold text-lg"
        style={{ fontSize: isCenter ? '20px' : '16px' }}
      >
        {number}
      </text>
      {label && (
        <text
          x={x}
          y={y + size/2 + 20}
          textAnchor="middle"
          className="fill-gray-700 text-xs font-medium"
        >
          {label}
        </text>
      )}
    </g>
  );

  const ConnectionLine = ({ x1, y1, x2, y2, opacity = 0.3 }) => (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#6B7280"
      strokeWidth="2"
      opacity={opacity}
      strokeDasharray="5,5"
    />
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Matrix Destiny Chart</h2>
          <p className="text-gray-600">Birth Date: {matrixData.birthDate.month}/{matrixData.birthDate.day}/{matrixData.birthDate.year}</p>
        </div>
        
        <div className="flex justify-center">
          <svg width={chartSize} height={chartSize} className="border rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
            {/* Connection lines */}
            {/* Primary square connections */}
            <ConnectionLine 
              x1={primaryPositions.top.x} y1={primaryPositions.top.y}
              x2={primaryPositions.right.x} y2={primaryPositions.right.y}
            />
            <ConnectionLine 
              x1={primaryPositions.right.x} y1={primaryPositions.right.y}
              x2={primaryPositions.bottom.x} y2={primaryPositions.bottom.y}
            />
            <ConnectionLine 
              x1={primaryPositions.bottom.x} y1={primaryPositions.bottom.y}
              x2={primaryPositions.left.x} y2={primaryPositions.left.y}
            />
            <ConnectionLine 
              x1={primaryPositions.left.x} y1={primaryPositions.left.y}
              x2={primaryPositions.top.x} y2={primaryPositions.top.y}
            />

            {/* Diagonal connections */}
            <ConnectionLine 
              x1={cornerPositions.topLeft.x} y1={cornerPositions.topLeft.y}
              x2={cornerPositions.bottomRight.x} y2={cornerPositions.bottomRight.y}
            />
            <ConnectionLine 
              x1={cornerPositions.topRight.x} y1={cornerPositions.topRight.y}
              x2={cornerPositions.bottomLeft.x} y2={cornerPositions.bottomLeft.y}
            />

            {/* Inner square connections */}
            <ConnectionLine 
              x1={innerPositions.centerTop.x} y1={innerPositions.centerTop.y}
              x2={innerPositions.centerRight.x} y2={innerPositions.centerRight.y}
              opacity={0.2}
            />
            <ConnectionLine 
              x1={innerPositions.centerRight.x} y1={innerPositions.centerRight.y}
              x2={innerPositions.centerBottom.x} y2={innerPositions.centerBottom.y}
              opacity={0.2}
            />
            <ConnectionLine 
              x1={innerPositions.centerBottom.x} y1={innerPositions.centerBottom.y}
              x2={innerPositions.centerLeft.x} y2={innerPositions.centerLeft.y}
              opacity={0.2}
            />
            <ConnectionLine 
              x1={innerPositions.centerLeft.x} y1={innerPositions.centerLeft.y}
              x2={innerPositions.centerTop.x} y2={innerPositions.centerTop.y}
              opacity={0.2}
            />

            {/* Primary square nodes */}
            <ChartNode 
              x={primaryPositions.top.x} 
              y={primaryPositions.top.y} 
              number={primarySquare.top} 
              size={nodeSize}
              label="Portrait"
            />
            <ChartNode 
              x={primaryPositions.right.x} 
              y={primaryPositions.right.y} 
              number={primarySquare.right} 
              size={nodeSize}
              label="Talents"
            />
            <ChartNode 
              x={primaryPositions.bottom.x} 
              y={primaryPositions.bottom.y} 
              number={primarySquare.bottom} 
              size={nodeSize}
              label="Material"
            />
            <ChartNode 
              x={primaryPositions.left.x} 
              y={primaryPositions.left.y} 
              number={primarySquare.left} 
              size={nodeSize}
              label="Spiritual"
            />

            {/* Corner nodes */}
            <ChartNode 
              x={cornerPositions.topRight.x} 
              y={cornerPositions.topRight.y} 
              number={primaryCorners.topRight} 
              size={cornerSize}
            />
            <ChartNode 
              x={cornerPositions.bottomRight.x} 
              y={cornerPositions.bottomRight.y} 
              number={primaryCorners.bottomRight} 
              size={cornerSize}
            />
            <ChartNode 
              x={cornerPositions.bottomLeft.x} 
              y={cornerPositions.bottomLeft.y} 
              number={primaryCorners.bottomLeft} 
              size={cornerSize}
            />
            <ChartNode 
              x={cornerPositions.topLeft.x} 
              y={cornerPositions.topLeft.y} 
              number={primaryCorners.topLeft} 
              size={cornerSize}
            />

            {/* Inner diagonal nodes */}
            <ChartNode 
              x={innerPositions.centerTop.x} 
              y={innerPositions.centerTop.y} 
              number={diagonalSquare.centerTop} 
              size={innerNodeSize}
            />
            <ChartNode 
              x={innerPositions.centerRight.x} 
              y={innerPositions.centerRight.y} 
              number={diagonalSquare.centerRight} 
              size={innerNodeSize}
            />
            <ChartNode 
              x={innerPositions.centerBottom.x} 
              y={innerPositions.centerBottom.y} 
              number={diagonalSquare.centerBottom} 
              size={innerNodeSize}
            />
            <ChartNode 
              x={innerPositions.centerLeft.x} 
              y={innerPositions.centerLeft.y} 
              number={diagonalSquare.centerLeft} 
              size={innerNodeSize}
            />

            {/* Center node */}
            <ChartNode 
              x={center} 
              y={center} 
              number={centerPoint} 
              size={centerSize}
              label="Essence"
              isCenter={true}
            />
          </svg>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-gray-700">Portrait Energy</div>
            <div className="text-2xl font-bold" style={{ color: getEnergyColor(primarySquare.top) }}>
              {primarySquare.top}
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">Talents</div>
            <div className="text-2xl font-bold" style={{ color: getEnergyColor(primarySquare.right) }}>
              {primarySquare.right}
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">Material Purpose</div>
            <div className="text-2xl font-bold" style={{ color: getEnergyColor(primarySquare.bottom) }}>
              {primarySquare.bottom}
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">Spiritual Purpose</div>
            <div className="text-2xl font-bold" style={{ color: getEnergyColor(primarySquare.left) }}>
              {primarySquare.left}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="font-semibold text-gray-700">Central Essence</div>
          <div className="text-3xl font-bold" style={{ color: getEnergyColor(centerPoint) }}>
            {centerPoint}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatrixChart;

