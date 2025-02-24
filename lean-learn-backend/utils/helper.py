def validate_question(question):
    if question["type"] == "formula" and not question.get("formula"):
        return "The 'formula' field is required for formula questions."
    if question["type"] == "mcq" and (not question.get("options") or len(question["options"]) < 2):
        return "MCQ questions require at least two options."
    if "class_name" not in question or not question["class_name"]:
        return "The 'class_name' field is required."
    if "topic" not in question or not question["topic"]:
        return "The 'topic' field is required."
    return None
