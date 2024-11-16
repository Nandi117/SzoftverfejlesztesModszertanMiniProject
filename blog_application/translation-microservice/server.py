


from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import logging
from logger_config import config_logger
app = Flask(__name__)


config_logger()
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


cors = CORS(app)

translator = pipeline("translation_en_to_hu", model="Helsinki-NLP/opus-mt-en-hu")



@app.route("/api/translate", methods=["POST"])
def translate():
    data = request.json
    text = data.get("text", "")
    logger.debug(f"Translate given text. text={text}")

    if not text:
        return jsonify({"error" : "No text provided"}), 400
    
    translation_result = translator(text, max_length=200)
    translated_text = translation_result[0]["translation_text"]

    return jsonify({"translated_text": translated_text})


if __name__ == '__main__':
    app.run(debug=True, port=8000)