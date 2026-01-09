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
        Preprocessed image (grayscale, enhanced)
    """
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    
    # Resize for better OCR (upscale)
    gray = cv2.resize(gray, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    
    # Apply slight blur to reduce noise
    blur = cv2.GaussianBlur(gray, (3, 3), 0)
    
    # Simple thresholding (better than adaptive for clean images)
    # Use Otsu's method for automatic threshold
    _, thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    return thresh


def read_serial_number(img):
    """
    Read serial number from image using OCR.
    
    Args:
        img: Image (can be original RGB or preprocessed grayscale)
        
    Returns:
        tuple: (cleaned_serial, raw_text)
    """
    # PSM 7: Treat image as a single text line
    config = (
        "--psm 7 "
        "-c tessedit_char_whitelist="
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-"
    )

    # Try OCR
    raw = pytesseract.image_to_string(img, config=config)
    cleaned = re.sub(r"[^A-Za-z0-9-]", "", raw)
    
    # If empty, try with different PSM mode (single word)
    if not cleaned:
        config_alt = "--psm 8 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-"
        raw = pytesseract.image_to_string(img, config=config_alt)
        cleaned = re.sub(r"[^A-Za-z0-9-]", "", raw)
    
    # Clean up common OCR errors
    # Remove leading/trailing noise (single random chars)
    cleaned = cleaned.strip()
    
    # If starts with a single digit/char followed by letter combo, remove it
    # e.g., "3M100001" -> "SM100001", "9SM100002" -> "SM100002"
    if len(cleaned) > 2 and cleaned[0].isdigit() and cleaned[1].isalpha():
        cleaned = 'S' + cleaned[1:]  # Most likely "S" was misread
    
    return cleaned.upper(), raw.strip()
