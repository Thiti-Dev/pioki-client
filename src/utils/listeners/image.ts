export function loadImage(url: string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
  
      image.onload = () => {
        resolve(image); // Image loaded successfully
      };
  
      image.onerror = () => {
        reject(new Error(`Failed to load image from URL: ${url}`));
      };
    });
  }