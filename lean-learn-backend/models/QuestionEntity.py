def _base_entity(item):
    """
    Common base entity processing for all question types
    """
    # Handle used field conversion consistently
    used_value = item.get('used', False)
    if isinstance(used_value, str):
        used_value = used_value.lower() == 'true'
    
    return {
        "id": str(item.get("_id", "")),
        "class_": item.get("class_", ""),
        'subject': item.get("subject", ""),
        'topic': item.get("topic", ""),
        'question': item.get("question", ""),
        'resource': item.get('resource', []),
        'used': bool(used_value)
    }

def process_question_entity(item, question_type="tf"):
    """
    Process different types of question entities with a single function
    
    Args:
        item (dict): The question item to process
        question_type (str): Type of question - "tf", "mcq", "formula", or "fill"
    
    Returns:
        dict: Processed entity with appropriate fields
    """
    entity = _base_entity(item)
    
    # Add type-specific fields
    if question_type == "tf":
        entity['answer'] = item.get('answer', "")
    
    elif question_type == "mcq":
        entity.update({
            'options': item.get('options', []),
            'answers': item.get('answers', []),
            'captions': item.get('captions', [])
        })
    
    elif question_type == "formula":
        entity.update({
            'quantities': [
                {
                    "name": q.get("name", ""),
                    "symbol": q.get("symbol", ""),
                    "isUnknown": bool(q.get("isUnknown", False))
                }
                for q in item.get("quantities", [])
            ],
            'formula': item.get("formula", []),
            'options': item.get("options", []),
            'answers': item.get('answers', [])
        })
    
    elif question_type == "fill":
        entity.update({
            'choices': item.get("choices", []),
            'answers': item.get('answers', [])
        })
    
    return entity

def process_question_entities(items, question_type="tf"):
    """
    Process multiple question entities of the same type
    """
    return [process_question_entity(item, question_type) for item in items]

# Example usage - these replace your original functions:
def tfEntity(item):
    return process_question_entity(item, "tf")

def tfEntitys(items):
    return process_question_entities(items, "tf")

def mcqEntity(item):
    return process_question_entity(item, "mcq")

def mcqEntitys(items):
    return process_question_entities(items, "mcq")

def formula_question_entity(item):
    return process_question_entity(item, "formula")

def formula_question_entitys(items):
    return process_question_entities(items, "formula")

def fillquestionEntity(item):
    return process_question_entity(item, "fill")

def fillquestionEntitys(items):
    return process_question_entities(items, "fill")