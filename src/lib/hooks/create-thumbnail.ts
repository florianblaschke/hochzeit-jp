export function createThumbnail(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const fileUrl = URL.createObjectURL(file)
    const video = document.createElement('video');
    video.src = fileUrl

    video.addEventListener('loadeddata', async () => {
      try {
        video.currentTime = 1;
      } catch (err) {
        console.error('Seek failed', err);
      }
    });

    const canvas = document.createElement('canvas');

    video.addEventListener('seeked', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(fileUrl);
        if (blob) { resolve(blob) } else { reject(new Error("thumbnail_generation_failed")) };
      }, "image/webp");
    });
  })
}
