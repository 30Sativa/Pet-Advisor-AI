INTENT_REQUIREMENTS = {
    "nutrition": ["species","age"],
    "symptom": ["species","age","weight"],
    "vaccine": ["age"]
}

def check_context(intent, pet_info):

    if not pet_info:
        return False, INTENT_REQUIREMENTS.get(intent, [])

    missing = []

    for field in INTENT_REQUIREMENTS.get(intent, []):
        if pet_info.get(field) is None:
            missing.append(field)

    return len(missing) == 0, missing