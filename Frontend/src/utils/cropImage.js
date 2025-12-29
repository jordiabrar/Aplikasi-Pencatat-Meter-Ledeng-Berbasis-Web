export async function getCroppedImg(imageSrc, crop) {
  if (!crop || crop.width < 5 || crop.height < 5) {
    throw new Error("Crop area tidak valid");
  }

  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const width = Math.floor(crop.width);
  const height = Math.floor(crop.height);

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(
    image,
    Math.floor(crop.x),
    Math.floor(crop.y),
    width,
    height,
    0,
    0,
    width,
    height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Crop gagal"));
        resolve(blob);
      },
      "image/jpeg",
      0.95
    );
  });
}

function createImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
