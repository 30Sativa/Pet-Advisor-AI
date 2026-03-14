URGENCY_LEVELS = {
    "critical": ["khó thở","ngất","co giật","không phản ứng","bất tỉnh","tím tái"],
    "high": ["nôn ra máu","tiêu chảy ra máu","sốc nhiệt","đau đớn dữ dội"]
}

def check_urgency(message: str):

    msg = message.lower()

    for kw in URGENCY_LEVELS["critical"]:
        if kw in msg:
            return "critical", True

    for kw in URGENCY_LEVELS["high"]:
        if kw in msg:
            return "high", False

    return "normal", False