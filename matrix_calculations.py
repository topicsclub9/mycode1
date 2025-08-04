"""
Matrix Destiny Chart Calculation Logic

Based on the research from YouTube video and other sources, this module
implements the calculation methodology for generating a Matrix Destiny Chart
from a birth date.
"""

def reduce_to_22(number):
    """
    Reduce a number to the range 1-22 by adding its digits.
    If the result is still > 22, repeat the process.
    """
    while number > 22:
        number = sum(int(digit) for digit in str(number))
    return number

def calculate_basic_values(day, month, year):
    """
    Calculate the basic values from birth date components.
    
    Args:
        day (int): Day of birth
        month (int): Month of birth
        year (int): Year of birth
    
    Returns:
        dict: Dictionary containing reduced day, month, year, and their sum
    """
    # Reduce each component to 1-22 range
    reduced_day = reduce_to_22(day)
    reduced_month = reduce_to_22(month)
    
    # For year, sum all digits first, then reduce
    year_sum = sum(int(digit) for digit in str(year))
    reduced_year = reduce_to_22(year_sum)
    
    # Calculate the sum of day, month, year (reduced)
    total_sum = reduced_day + reduced_month + reduced_year
    reduced_sum = reduce_to_22(total_sum)
    
    return {
        'day': reduced_day,
        'month': reduced_month,
        'year': reduced_year,
        'sum': reduced_sum
    }

def calculate_matrix_chart(day, month, year):
    """
    Calculate the complete Matrix Destiny Chart from birth date.
    
    The chart consists of:
    - Primary square (straight): 4 main points
    - Diagonal square: 4 diagonal points
    - Center point: The essence of the matrix
    
    Args:
        day (int): Day of birth
        month (int): Month of birth
        year (int): Year of birth
    
    Returns:
        dict: Complete matrix chart data
    """
    # Get basic values
    basic = calculate_basic_values(day, month, year)
    
    # Primary square positions (straight square)
    primary_square = {
        'top': basic['day'],        # Day of birth (top)
        'right': basic['month'],    # Month of birth (right)
        'bottom': basic['year'],    # Year of birth (bottom)
        'left': basic['sum']        # Sum of day+month+year (left)
    }
    
    # Calculate corner positions of primary square
    primary_corners = {
        'top_right': reduce_to_22(primary_square['top'] + primary_square['right']),
        'bottom_right': reduce_to_22(primary_square['right'] + primary_square['bottom']),
        'bottom_left': reduce_to_22(primary_square['bottom'] + primary_square['left']),
        'top_left': reduce_to_22(primary_square['left'] + primary_square['top'])
    }
    
    # Diagonal square (inner points)
    diagonal_square = {
        'center_top': reduce_to_22(primary_square['top'] + primary_corners['top_right']),
        'center_right': reduce_to_22(primary_corners['top_right'] + primary_square['right']),
        'center_bottom': reduce_to_22(primary_square['right'] + primary_corners['bottom_right']),
        'center_left': reduce_to_22(primary_corners['bottom_right'] + primary_square['bottom'])
    }
    
    # Calculate center point (essence of matrix)
    center_sum = (diagonal_square['center_top'] + 
                  diagonal_square['center_right'] + 
                  diagonal_square['center_bottom'] + 
                  diagonal_square['center_left'])
    center_point = reduce_to_22(center_sum)
    
    return {
        'basic_values': basic,
        'primary_square': primary_square,
        'primary_corners': primary_corners,
        'diagonal_square': diagonal_square,
        'center_point': center_point,
        'birth_date': {
            'day': day,
            'month': month,
            'year': year
        }
    }

def calculate_health_chart(matrix_data):
    """
    Calculate the health chart (chakra information) from matrix data.
    This is a simplified version - the exact methodology may vary.
    
    Args:
        matrix_data (dict): Matrix chart data from calculate_matrix_chart
    
    Returns:
        dict: Health chart with chakra information
    """
    # Extract key energies from the matrix
    energies = [
        matrix_data['center_point'],
        matrix_data['primary_square']['top'],
        matrix_data['primary_square']['right'],
        matrix_data['primary_square']['bottom'],
        matrix_data['primary_square']['left'],
        matrix_data['diagonal_square']['center_top'],
        matrix_data['diagonal_square']['center_right']
    ]
    
    chakras = [
        {'name': 'Crown (Sahasrara)', 'physics': 0, 'energy': 0, 'emotions': 0},
        {'name': 'Third eye (Ajna)', 'physics': 0, 'energy': 0, 'emotions': 0},
        {'name': 'Throat (Vishuddha)', 'physics': 0, 'energy': 0, 'emotions': 0},
        {'name': 'Heart (Anahata)', 'physics': 0, 'energy': 0, 'emotions': 0},
        {'name': 'Solar plexus (Manipura)', 'physics': 0, 'energy': 0, 'emotions': 0},
        {'name': 'Sacral (Swadhisthana)', 'physics': 0, 'energy': 0, 'emotions': 0},
        {'name': 'Root (Muladhara)', 'physics': 0, 'energy': 0, 'emotions': 0}
    ]
    
    # Simple mapping of energies to chakras (this would need more research for accuracy)
    for i, chakra in enumerate(chakras):
        if i < len(energies):
            energy_val = energies[i]
            chakra['physics'] = energy_val % 10
            chakra['energy'] = (energy_val * 2) % 10
            chakra['emotions'] = (energy_val * 3) % 10
    
    return {
        'chakras': chakras,
        'total': {
            'physics': sum(c['physics'] for c in chakras),
            'energy': sum(c['energy'] for c in chakras),
            'emotions': sum(c['emotions'] for c in chakras)
        }
    }

def get_chart_positions():
    """
    Get the positions and meanings of each point in the matrix chart.
    
    Returns:
        dict: Chart positions with their meanings
    """
    return {
        'center_point': {
            'name': 'Central Energy',
            'description': 'This is the essence of your matrix - your primary energy.'
        },
        'primary_square': {
            'top': {
                'name': 'Portrait Energy',
                'description': 'Your portrait energy, how others perceive you.'
            },
            'right': {
                'name': 'Talents',
                'description': 'Your talents and stronger qualities from your genes.'
            },
            'bottom': {
                'name': 'Material Purpose',
                'description': 'Your material purpose and earthly mission.'
            },
            'left': {
                'name': 'Spiritual Purpose', 
                'description': 'Your spiritual purpose and soul mission.'
            }
        },
        'primary_corners': {
            'top_right': {
                'name': 'Manifestation',
                'description': 'Your talent for manifestation in this life.'
            },
            'bottom_right': {
                'name': 'Money Line',
                'description': 'Energy that drives your finances.'
            },
            'bottom_left': {
                'name': 'Love Line',
                'description': 'Love line energy and relationships.'
            },
            'top_left': {
                'name': 'Karmic Tail',
                'description': 'Challenges from your ancestors that transferred to your life.'
            }
        },
        'diagonal_square': {
            'center_top': {
                'name': 'Heart Chakra Energy',
                'description': 'These energies are responsible for your heart chakra.'
            },
            'center_right': {
                'name': 'Personal Power',
                'description': 'Your power from the previous life, one of your talents.'
            },
            'center_bottom': {
                'name': 'Emotional Center',
                'description': 'Energy influencing your emotional well-being.'
            },
            'center_left': {
                'name': 'Family Relations',
                'description': 'Energy influencing your relationship with parents.'
            }
        }
    }

# Test the calculation with the example from the YouTube video
if __name__ == "__main__":
    # Test with November 25, 1985 (from YouTube example)
    test_day = 25
    test_month = 11
    test_year = 1985
    
    print(f"Testing with birth date: {test_month}/{test_day}/{test_year}")
    print()
    
    # Calculate basic values
    basic = calculate_basic_values(test_day, test_month, test_year)
    print("Basic Values:")
    print(f"Day: {test_day} -> {basic['day']}")
    print(f"Month: {test_month} -> {basic['month']}")
    print(f"Year: {test_year} -> {basic['year']}")
    print(f"Sum: {basic['day']} + {basic['month']} + {basic['year']} = {basic['sum']}")
    print()
    
    # Calculate full matrix
    matrix = calculate_matrix_chart(test_day, test_month, test_year)
    
    print("Primary Square:")
    print(f"Top (Day): {matrix['primary_square']['top']}")
    print(f"Right (Month): {matrix['primary_square']['right']}")
    print(f"Bottom (Year): {matrix['primary_square']['bottom']}")
    print(f"Left (Sum): {matrix['primary_square']['left']}")
    print()
    
    print("Primary Corners:")
    print(f"Top-Right: {matrix['primary_corners']['top_right']}")
    print(f"Bottom-Right: {matrix['primary_corners']['bottom_right']}")
    print(f"Bottom-Left: {matrix['primary_corners']['bottom_left']}")
    print(f"Top-Left: {matrix['primary_corners']['top_left']}")
    print()
    
    print("Diagonal Square (Inner Points):")
    print(f"Center Top: {matrix['diagonal_square']['center_top']}")
    print(f"Center Right: {matrix['diagonal_square']['center_right']}")
    print(f"Center Bottom: {matrix['diagonal_square']['center_bottom']}")
    print(f"Center Left: {matrix['diagonal_square']['center_left']}")
    print()
    
    print(f"Center Point: {matrix['center_point']}")
    print()
    
    # Test health chart
    health = calculate_health_chart(matrix)
    print("Health Chart:")
    for chakra in health['chakras']:
        print(f"{chakra['name']}: Physics={chakra['physics']}, Energy={chakra['energy']}, Emotions={chakra['emotions']}")
    print(f"Total: Physics={health['total']['physics']}, Energy={health['total']['energy']}, Emotions={health['total']['emotions']}")

