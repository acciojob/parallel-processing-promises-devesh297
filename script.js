const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loading = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

async function downloadImages() {
  // Reset UI
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.style.display = "block";

  try {
    // Create an array of image download promises
    const promises = images.map(image => downloadImage(image.url));

    // Wait for all images to download (in order)
    const downloadedImages = await Promise.all(promises);

    // Append images in correct order
    downloadedImages.forEach(img => output.appendChild(img));
  } catch (error) {
    errorDiv.textContent = error.message;
  } finally {
    loading.style.display = "none";
  }
}

btn.addEventListener("click", downloadImages);
