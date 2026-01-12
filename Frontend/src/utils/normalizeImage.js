export function normalizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new Image();

    reader.onload = () => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const width = img.naturalWidth;
        const height = img.naturalHeight;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Normalize image gagal"));
              return;
            }
            resolve(URL.createObjectURL(blob));
          },
          "image/jpeg",
          1
        );
      };

      img.onerror = () => reject(new Error("Gagal load image"));
      img.src = reader.result;
    };

    reader.onerror = () => reject(new Error("FileReader gagal"));
    reader.readAsDataURL(file);
  });
}
