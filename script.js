const imageUrls = [
  'https://picsum.photos/id/237/200/300',
  'https://picsum.photos/id/238/200/300',
  'https://picsum.photos/id/239/200/300',
];

// Helper function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image from ${url}`));
  });
}

// Main function to download and display images
async function downloadImages() {
  const loadingDiv = document.getElementById('loading');
  const outputDiv = document.getElementById('output');
  const errorDiv = document.getElementById('error');

  // Clear previous output and error
  outputDiv.innerHTML = '';
  errorDiv.textContent = '';

  // Show loading spinner
  loadingDiv.style.display = 'block';

  const imagePromises = imageUrls.map(async (url) => {
    try {
      const img = await downloadImage(url);
      outputDiv.appendChild(img); // Append loaded image to output div
    } catch (error) {
      errorDiv.textContent += error.message + '\n'; // Append error message
    }
  });

  await Promise.all(imagePromises); // Wait for all image promises to settle
  loadingDiv.style.display = 'none'; // Hide loading spinner after all promises settle
}