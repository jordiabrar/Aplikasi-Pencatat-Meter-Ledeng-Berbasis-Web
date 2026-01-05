import { useCallback } from "react";
import { useAppDispatch } from "../context/AppContext";
import { CONFIG } from "../constants/data";

export function useOCR() {
  const dispatch = useAppDispatch();

  const runOCR = useCallback(
    () => {
      dispatch({ type: "SET_PROCESSING", payload: true });

      // ========================================
      // SIMULASI OCR PROCESSING
      // ========================================
      // Dalam produksi, gunakan Tesseract.js:
      //
      // import Tesseract from 'tesseract.js';
      //
      // Tesseract.recognize(
      //   _imageData,
      //   'eng',
      //   {
      //     logger: m => console.log(m),
      //     tessedit_char_whitelist: '0123456789'
      //   }
      // ).then(({ data: { text } }) => {
      //   const cleanedText = text.replace(/\D/g, '');
      //   dispatch({ type: 'SET_METER_VALUE', payload: cleanedText });
      //   dispatch({ type: 'SET_PROCESSING', payload: false });
      // });
      // ========================================

      setTimeout(() => {
        const randomMeter = Math.floor(Math.random() * 9000 + 1000).toString();
        dispatch({ type: "SET_METER_VALUE", payload: randomMeter });
        dispatch({ type: "SET_PROCESSING", payload: false });
      }, CONFIG.OCR_DELAY);
    },
    [dispatch]
  );

  return { runOCR };
}
