
import re
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

"""
Text preprocessor for translation
or any other NLP feature

preproccess_text: the preprocessing pipeline
clean_html: cleaning all html tags from the given corpus
            and returns the cleaned text    
"""
class Preprocess:

    def __init__(self):
        self.CLEANR = re.compile('<.*?>')

    @classmethod
    def preprocess_text(self,data) -> str:
        logger.debug(f"Preprocess the given data: lenght={len(data)}")
        return self.cleanetext(data)


    @classmethod
    def clean_html(self,raw_html) -> str:
        cleaned_text = re.sub(self.CLEANR, '', self.raw_html)

        logger.debug(f"Cleaned text length: {len(cleaned_text)}")
        return cleaned_text