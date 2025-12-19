import { useRef, useCallback, useEffect } from "react";
import { useAppDispatch } from "../context/AppContext";
import { MOCK_DATABASE, CONFIG } from "../constants/data";

export function useQRScanner(videoRef, canvasRef, isActive) {
  const dispatch = useAppDispatch();
  const scanIntervalRef = useRef(null);

  const scanQRCode = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      return;
    }

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // ========================================
    // SIMULASI DETEKSI QR CODE
    // ========================================
    // Dalam produksi, gunakan library jsQR:
    //
    // import jsQR from 'jsqr';
    // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // const code = jsQR(imageData.data, canvas.width, canvas.height);
    //
    // if (code) {
    //   const customer = await CustomerService.fetchByQR(code.data);
    //   if (customer) {
    //     dispatch({ type: 'SET_CUSTOMER', payload: customer });
    //   }
    // }
    // ========================================

    if (Math.random() > 1 - CONFIG.QR_DETECTION_CHANCE) {
      const qrKeys = Object.keys(MOCK_DATABASE);
      const randomKey = qrKeys[Math.floor(Math.random() * qrKeys.length)];
      const customer = MOCK_DATABASE[randomKey];

      dispatch({ type: "SET_CUSTOMER", payload: customer });
      dispatch({ type: "SET_QR_STATUS", payload: "✓ QR Code terdeteksi!" });

      // Stop scanning after successful detection
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    }
  }, [videoRef, canvasRef, dispatch]);

  useEffect(() => {
    if (isActive) {
      dispatch({
        type: "SET_QR_STATUS",
        payload: "Kamera aktif - arahkan ke QR code",
      });

      scanIntervalRef.current = setInterval(scanQRCode, CONFIG.SCAN_INTERVAL);
    }

    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, [isActive, scanQRCode, dispatch]);

  return { scanQRCode };
}
