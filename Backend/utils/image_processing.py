import cv2
import numpy as np
import pytesseract
import re
from PIL import Image
from config import Config

# Set Tesseract path if provided
if Config.TESSERACT_CMD:
    pytesseract.pytesseract.tesseract_cmd = Config.TESSERACT_CMD


def preprocess_image(img):
    """
    Preprocess image for better OCR results.
    
    Args:
        img: numpy array image (RGB)
        
    Returns:
        Preprocessed image (grayscale, thresholded)
    """
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    gray = cv2.resize(gray, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    blur = cv2.GaussianBlur(gray, (3, 3), 0)

    thresh = cv2.adaptiveThreshold(
        blur,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,
        2
    )
    return thresh


def read_serial_number(img):
    """
    Read serial number from preprocessed image using OCR.
    
    Args:
        img: Preprocessed image
        
    Returns:
        tuple: (cleaned_serial, raw_text)
    """
    config = (
        "--psm 7 "
        "-c tessedit_char_whitelist="
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-"
    )

    raw = pytesseract.image_to_string(img, config=config)
    cleaned = re.sub(r"[^A-Za-z0-9-]", "", raw)

    return cleaned.upper(), raw.strip()
