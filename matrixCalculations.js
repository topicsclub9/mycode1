/**
 * Matrix Destiny Chart Calculation Logic (JavaScript Version)
 * 
 * Translated from Python to JavaScript for use in React frontend.
 */

// Reduce a number to the range 1-22 by adding its digits
export function reduceTo22(number) {
  while (number > 22) {
    number = number.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return number;
}

// Calculate the basic values from birth date components
export function calculateBasicValues(day, month, year) {
  // Reduce each component to 1-22 range
  const reducedDay = reduceTo22(day);
  const reducedMonth = reduceTo22(month);
  
  // For year, sum all digits first, then reduce
  const yearSum = year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const reducedYear = reduceTo22(yearSum);
  
  // Calculate the sum of day, month, year (reduced)
  const totalSum = reducedDay + reducedMonth + reducedYear;
  const reducedSum = reduceTo22(totalSum);
  
  return {
    day: reducedDay,
    month: reducedMonth,
    year: reducedYear,
    sum: reducedSum
  };
}

// Calculate the complete Matrix Destiny Chart from birth date
export function calculateMatrixChart(day, month, year) {
  // Get basic values
  const basic = calculateBasicValues(day, month, year);
  
  // Primary square positions (straight square)
  const primarySquare = {
    top: basic.day,        // Day of birth (top)
    right: basic.month,    // Month of birth (right)
    bottom: basic.year,    // Year of birth (bottom)
    left: basic.sum        // Sum of day+month+year (left)
  };
  
  // Calculate corner positions of primary square
  const primaryCorners = {
    topRight: reduceTo22(primarySquare.top + primarySquare.right),
    bottomRight: reduceTo22(primarySquare.right + primarySquare.bottom),
    bottomLeft: reduceTo22(primarySquare.bottom + primarySquare.left),
    topLeft: reduceTo22(primarySquare.left + primarySquare.top)
  };
  
  // Diagonal square (inner points)
  const diagonalSquare = {
    centerTop: reduceTo22(primarySquare.top + primaryCorners.topRight),
    centerRight: reduceTo22(primaryCorners.topRight + primarySquare.right),
    centerBottom: reduceTo22(primarySquare.right + primaryCorners.bottomRight),
    centerLeft: reduceTo22(primaryCorners.bottomRight + primarySquare.bottom)
  };
  
  // Calculate center point (essence of matrix)
  const centerSum = diagonalSquare.centerTop + 
                   diagonalSquare.centerRight + 
                   diagonalSquare.centerBottom + 
                   diagonalSquare.centerLeft;
  const centerPoint = reduceTo22(centerSum);
  
  return {
    basicValues: basic,
    primarySquare,
    primaryCorners,
    diagonalSquare,
    centerPoint,
    birthDate: { day, month, year }
  };
}

// Calculate the health chart (chakra information) from matrix data
export function calculateHealthChart(matrixData) {
  // Extract key energies from the matrix
  const energies = [
    matrixData.centerPoint,
    matrixData.primarySquare.top,
    matrixData.primarySquare.right,
    matrixData.primarySquare.bottom,
    matrixData.primarySquare.left,
    matrixData.diagonalSquare.centerTop,
    matrixData.diagonalSquare.centerRight
  ];
  
  const chakras = [
    { name: 'Crown (Sahasrara)', physics: 0, energy: 0, emotions: 0 },
    { name: 'Third eye (Ajna)', physics: 0, energy: 0, emotions: 0 },
    { name: 'Throat (Vishuddha)', physics: 0, energy: 0, emotions: 0 },
    { name: 'Heart (Anahata)', physics: 0, energy: 0, emotions: 0 },
    { name: 'Solar plexus (Manipura)', physics: 0, energy: 0, emotions: 0 },
    { name: 'Sacral (Swadhisthana)', physics: 0, energy: 0, emotions: 0 },
    { name: 'Root (Muladhara)', physics: 0, energy: 0, emotions: 0 }
  ];
  
  // Simple mapping of energies to chakras
  chakras.forEach((chakra, i) => {
    if (i < energies.length) {
      const energyVal = energies[i];
      chakra.physics = energyVal % 10;
      chakra.energy = (energyVal * 2) % 10;
      chakra.emotions = (energyVal * 3) % 10;
    }
  });
  
  return {
    chakras,
    total: {
      physics: chakras.reduce((sum, c) => sum + c.physics, 0),
      energy: chakras.reduce((sum, c) => sum + c.energy, 0),
      emotions: chakras.reduce((sum, c) => sum + c.emotions, 0)
    }
  };
}

// Get the positions and meanings of each point in the matrix chart
export function getChartPositions() {
  return {
    centerPoint: {
      name: 'Central Energy',
      description: 'This is the essence of your matrix - your primary energy.'
    },
    primarySquare: {
      top: {
        name: 'Portrait Energy',
        description: 'Your portrait energy, how others perceive you.'
      },
      right: {
        name: 'Talents',
        description: 'Your talents and stronger qualities from your genes.'
      },
      bottom: {
        name: 'Material Purpose',
        description: 'Your material purpose and earthly mission.'
      },
      left: {
        name: 'Spiritual Purpose', 
        description: 'Your spiritual purpose and soul mission.'
      }
    },
    primaryCorners: {
      topRight: {
        name: 'Manifestation',
        description: 'Your talent for manifestation in this life.'
      },
      bottomRight: {
        name: 'Money Line',
        description: 'Energy that drives your finances.'
      },
      bottomLeft: {
        name: 'Love Line',
        description: 'Love line energy and relationships.'
      },
      topLeft: {
        name: 'Karmic Tail',
        description: 'Challenges from your ancestors that transferred to your life.'
      }
    },
    diagonalSquare: {
      centerTop: {
        name: 'Heart Chakra Energy',
        description: 'These energies are responsible for your heart chakra.'
      },
      centerRight: {
        name: 'Personal Power',
        description: 'Your power from the previous life, one of your talents.'
      },
      centerBottom: {
        name: 'Emotional Center',
        description: 'Energy influencing your emotional well-being.'
      },
      centerLeft: {
        name: 'Family Relations',
        description: 'Energy influencing your relationship with parents.'
      }
    }
  };
}

