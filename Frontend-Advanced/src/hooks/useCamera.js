import { useRef, useCallback } from "react";
import { useAppDispatch } from "../context/AppContext";

export function useCamera() {
  const videoRef = useRef(null);
  const dispatch = useAppDispatch();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera on mobile
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      dispatch({ type: "SET_ERROR", payload: null });
    } catch (error) {
      console.error("Camera error:", error);
      dispatch({
        type: "SET_ERROR",
        payload: {
          type: "CAMERA_ERROR",
          message: "Tidak dapat mengakses kamera. Periksa izin browser.",
        },
      });
    }
  }, [dispatch]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  const captureImage = useCallback((canvas) => {
    const video = videoRef.current;
    if (!video || !canvas) return null;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL("image/jpeg");
  }, []);

  return {
    videoRef,
    startCamera,
    stopCamera,
    captureImage,
  };
}
