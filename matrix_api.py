"""
Matrix Destiny Chart API

Complete API for generating and interpreting Matrix Destiny Charts.
Combines calculation logic with arcana interpretations.
"""

from matrix_calculations import calculate_matrix_chart, calculate_health_chart, get_chart_positions
from arcana_data import get_arcana_info, get_all_arcana

def generate_complete_matrix(day, month, year, name=""):
    """
    Generate a complete Matrix Destiny Chart with full interpretations.
    
    Args:
        day (int): Day of birth
        month (int): Month of birth  
        year (int): Year of birth
        name (str): Person's name (optional)
    
    Returns:
        dict: Complete matrix chart with interpretations
    """
    # Calculate the basic matrix
    matrix_data = calculate_matrix_chart(day, month, year)
    
    # Calculate health chart
    health_data = calculate_health_chart(matrix_data)
    
    # Get chart positions and their meanings
    positions = get_chart_positions()
    
    # Create interpretations for each position
    interpretations = {}
    
    # Center point interpretation
    center_arcana = get_arcana_info(matrix_data['center_point'])
    interpretations['center_point'] = {
        'number': matrix_data['center_point'],
        'position_info': positions['center_point'],
        'arcana_info': center_arcana
    }
    
    # Primary square interpretations
    interpretations['primary_square'] = {}
    for pos, number in matrix_data['primary_square'].items():
        arcana_info = get_arcana_info(number)
        interpretations['primary_square'][pos] = {
            'number': number,
            'position_info': positions['primary_square'][pos],
            'arcana_info': arcana_info
        }
    
    # Primary corners interpretations
    interpretations['primary_corners'] = {}
    for pos, number in matrix_data['primary_corners'].items():
        arcana_info = get_arcana_info(number)
        interpretations['primary_corners'][pos] = {
            'number': number,
            'position_info': positions['primary_corners'][pos],
            'arcana_info': arcana_info
        }
    
    # Diagonal square interpretations
    interpretations['diagonal_square'] = {}
    for pos, number in matrix_data['diagonal_square'].items():
        arcana_info = get_arcana_info(number)
        interpretations['diagonal_square'][pos] = {
            'number': number,
            'position_info': positions['diagonal_square'][pos],
            'arcana_info': arcana_info
        }
    
    # Create life purpose analysis
    life_purpose = analyze_life_purpose(matrix_data)
    
    # Create talents analysis
    talents = analyze_talents(matrix_data)
    
    # Create challenges analysis
    challenges = analyze_challenges(matrix_data)
    
    return {
        'personal_info': {
            'name': name,
            'birth_date': {
                'day': day,
                'month': month,
                'year': year
            }
        },
        'matrix_data': matrix_data,
        'health_chart': health_data,
        'interpretations': interpretations,
        'life_analysis': {
            'purpose': life_purpose,
            'talents': talents,
            'challenges': challenges
        }
    }

def analyze_life_purpose(matrix_data):
    """
    Analyze life purpose based on key matrix positions.
    
    Args:
        matrix_data (dict): Matrix calculation results
    
    Returns:
        dict: Life purpose analysis
    """
    center_energy = matrix_data['center_point']
    spiritual_purpose = matrix_data['primary_square']['left']
    material_purpose = matrix_data['primary_square']['bottom']
    
    center_arcana = get_arcana_info(center_energy)
    spiritual_arcana = get_arcana_info(spiritual_purpose)
    material_arcana = get_arcana_info(material_purpose)
    
    return {
        'soul_essence': {
            'number': center_energy,
            'arcana': center_arcana['name'],
            'description': f"Your core essence is {center_arcana['name']}. {center_arcana['description']}"
        },
        'spiritual_mission': {
            'number': spiritual_purpose,
            'arcana': spiritual_arcana['name'],
            'description': f"Your spiritual purpose is guided by {spiritual_arcana['name']}. {spiritual_arcana['life_guidance']['spirituality']}"
        },
        'material_mission': {
            'number': material_purpose,
            'arcana': material_arcana['name'],
            'description': f"Your material purpose is influenced by {material_arcana['name']}. {material_arcana['life_guidance']['career']}"
        }
    }

def analyze_talents(matrix_data):
    """
    Analyze natural talents based on matrix positions.
    
    Args:
        matrix_data (dict): Matrix calculation results
    
    Returns:
        dict: Talents analysis
    """
    talents_energy = matrix_data['primary_square']['right']
    manifestation_energy = matrix_data['primary_corners']['top_right']
    personal_power = matrix_data['diagonal_square']['center_right']
    
    talents_arcana = get_arcana_info(talents_energy)
    manifestation_arcana = get_arcana_info(manifestation_energy)
    power_arcana = get_arcana_info(personal_power)
    
    return {
        'natural_talents': {
            'number': talents_energy,
            'arcana': talents_arcana['name'],
            'description': f"Your natural talents are expressed through {talents_arcana['name']}.",
            'career_paths': talents_arcana['career_paths']
        },
        'manifestation_ability': {
            'number': manifestation_energy,
            'arcana': manifestation_arcana['name'],
            'description': f"You manifest through {manifestation_arcana['name']} energy.",
            'positive_traits': manifestation_arcana['positive_traits']
        },
        'personal_power': {
            'number': personal_power,
            'arcana': power_arcana['name'],
            'description': f"Your personal power comes from {power_arcana['name']}.",
            'strengths': power_arcana['positive_traits']
        }
    }

def analyze_challenges(matrix_data):
    """
    Analyze life challenges based on matrix positions.
    
    Args:
        matrix_data (dict): Matrix calculation results
    
    Returns:
        dict: Challenges analysis
    """
    karmic_tail = matrix_data['primary_corners']['top_left']
    center_energy = matrix_data['center_point']
    
    karmic_arcana = get_arcana_info(karmic_tail)
    center_arcana = get_arcana_info(center_energy)
    
    return {
        'karmic_challenges': {
            'number': karmic_tail,
            'arcana': karmic_arcana['name'],
            'description': f"Your karmic challenges are related to {karmic_arcana['name']}.",
            'challenges': karmic_arcana['challenges'],
            'growth_path': f"Work on {', '.join(karmic_arcana['challenges'][:2])}"
        },
        'core_lessons': {
            'number': center_energy,
            'arcana': center_arcana['name'],
            'description': f"Your core life lessons involve mastering {center_arcana['name']} energy.",
            'challenges': center_arcana['challenges']
        }
    }

def get_relationship_compatibility(person1_matrix, person2_matrix):
    """
    Analyze compatibility between two people based on their matrices.
    
    Args:
        person1_matrix (dict): First person's matrix data
        person2_matrix (dict): Second person's matrix data
    
    Returns:
        dict: Compatibility analysis
    """
    # Compare center energies
    center1 = person1_matrix['center_point']
    center2 = person2_matrix['center_point']
    
    # Compare love line energies
    love1 = person1_matrix['primary_corners']['bottom_left']
    love2 = person2_matrix['primary_corners']['bottom_left']
    
    arcana1 = get_arcana_info(center1)
    arcana2 = get_arcana_info(center2)
    love_arcana1 = get_arcana_info(love1)
    love_arcana2 = get_arcana_info(love2)
    
    # Simple compatibility scoring (this could be more sophisticated)
    compatibility_score = 0
    
    # Same center energy = high compatibility
    if center1 == center2:
        compatibility_score += 30
    # Complementary energies (opposite numbers)
    elif abs(center1 - center2) == 11:
        compatibility_score += 25
    # Similar energy ranges
    elif abs(center1 - center2) <= 3:
        compatibility_score += 20
    else:
        compatibility_score += 10
    
    # Love line compatibility
    if love1 == love2:
        compatibility_score += 25
    elif abs(love1 - love2) <= 2:
        compatibility_score += 15
    else:
        compatibility_score += 5
    
    # Add some randomness for other factors
    compatibility_score += 20  # Base compatibility
    
    return {
        'overall_score': min(compatibility_score, 100),
        'center_energy_match': {
            'person1': {'number': center1, 'arcana': arcana1['name']},
            'person2': {'number': center2, 'arcana': arcana2['name']},
            'compatibility': 'High' if abs(center1 - center2) <= 3 else 'Medium' if abs(center1 - center2) <= 7 else 'Challenging'
        },
        'love_energy_match': {
            'person1': {'number': love1, 'arcana': love_arcana1['name']},
            'person2': {'number': love2, 'arcana': love_arcana2['name']},
            'compatibility': 'High' if abs(love1 - love2) <= 2 else 'Medium' if abs(love1 - love2) <= 5 else 'Challenging'
        },
        'relationship_advice': generate_relationship_advice(arcana1, arcana2, love_arcana1, love_arcana2)
    }

def generate_relationship_advice(center1, center2, love1, love2):
    """
    Generate relationship advice based on arcana combinations.
    
    Args:
        center1, center2, love1, love2: Arcana information dictionaries
    
    Returns:
        list: List of relationship advice strings
    """
    advice = []
    
    # Advice based on center energies
    advice.append(f"Person 1 ({center1['name']}) should focus on: {center1['life_guidance']['relationships']}")
    advice.append(f"Person 2 ({center2['name']}) should focus on: {center2['life_guidance']['relationships']}")
    
    # Advice based on love energies
    advice.append(f"In love, Person 1 expresses through {love1['name']}: {love1['life_guidance']['relationships']}")
    advice.append(f"In love, Person 2 expresses through {love2['name']}: {love2['life_guidance']['relationships']}")
    
    return advice

# Test the complete API
if __name__ == "__main__":
    print("Testing Complete Matrix API:")
    print("=" * 50)
    
    # Test with example birth date
    result = generate_complete_matrix(25, 11, 1985, "Test Person")
    
    print(f"Name: {result['personal_info']['name']}")
    print(f"Birth Date: {result['personal_info']['birth_date']['month']}/{result['personal_info']['birth_date']['day']}/{result['personal_info']['birth_date']['year']}")
    print()
    
    print("LIFE PURPOSE ANALYSIS:")
    print("-" * 30)
    purpose = result['life_analysis']['purpose']
    print(f"Soul Essence: {purpose['soul_essence']['arcana']} ({purpose['soul_essence']['number']})")
    print(f"Description: {purpose['soul_essence']['description']}")
    print()
    
    print("NATURAL TALENTS:")
    print("-" * 30)
    talents = result['life_analysis']['talents']
    print(f"Main Talents: {talents['natural_talents']['arcana']} ({talents['natural_talents']['number']})")
    print(f"Career Paths: {', '.join(talents['natural_talents']['career_paths'][:3])}")
    print()
    
    print("LIFE CHALLENGES:")
    print("-" * 30)
    challenges = result['life_analysis']['challenges']
    print(f"Karmic Challenges: {challenges['karmic_challenges']['arcana']} ({challenges['karmic_challenges']['number']})")
    print(f"Growth Path: {challenges['karmic_challenges']['growth_path']}")
    print()
    
    print("HEALTH CHART:")
    print("-" * 30)
    health = result['health_chart']
    for chakra in health['chakras'][:3]:  # Show first 3 chakras
        print(f"{chakra['name']}: Physics={chakra['physics']}, Energy={chakra['energy']}, Emotions={chakra['emotions']}")
    print(f"Total: Physics={health['total']['physics']}, Energy={health['total']['energy']}, Emotions={health['total']['emotions']}")

