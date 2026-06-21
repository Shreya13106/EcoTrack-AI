def calculate_carbon_footprint(data):

    transport_km = float(data.get("transport", 0))
    electricity = float(data.get("electricity", 0))
    food_type = data.get("food", "vegetarian")

    # CO₂ calculations

    transport_emission = transport_km * 0.21
    electricity_emission = electricity * 0.5

    if food_type == "non-vegetarian":
        food_emission = 50
    else:
        food_emission = 20

    total_emission = (
        transport_emission +
        electricity_emission +
        food_emission
    )

    # Eco Score

    if total_emission < 100:
        eco_score = "Excellent 🌱"
    elif total_emission < 200:
        eco_score = "Good ✅"
    else:
        eco_score = "Needs Improvement ⚠️"

    return {
        "transport_emission": round(transport_emission, 2),
        "electricity_emission": round(electricity_emission, 2),
        "food_emission": round(food_emission, 2),
        "total_emission": round(total_emission, 2),
        "eco_score": eco_score
    }