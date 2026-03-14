INTENTS = {
    "nutrition": ["ăn","thức ăn","dinh dưỡng"],
    "symptom": ["bệnh","ốm","nôn","tiêu chảy","ho","sốt"],
    "vaccine": ["tiêm","vaccine"],
    "general": ["chào","hello"]
}

def detect_intent(message: str):

    msg = message.lower()

    for intent, keywords in INTENTS.items():
        for kw in keywords:
            if kw in msg:
                return intent

    return "general"