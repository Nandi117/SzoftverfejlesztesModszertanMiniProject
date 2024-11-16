

from flask import request, jsonify
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)




def translate():
    data = request.json
    text = data.get("text", "")
    logger.debug(f"Translate given text. text={text}")

    if not text:
        return jsonify({"error" : "No text provided"}), 400
    
    translation_result = translator(text, max_length=200)
    translated_text = translation_result[0]["translation_text"]

    return jsonify({"translated_text": translated_text})
