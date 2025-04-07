const imageUrls = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/200',
  'https://this-url-does-not-exist.com/image.jpg', // For testing error
  'https://via.placeholder.com/250',
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

  try {
    const imagePromises = imageUrls.map(url => downloadImage(url));
    const images = await Promise.all(imagePromises); // Wait for all images to load

    // Hide loading spinner
    loadingDiv.style.display = 'none';

    // Display images
    images.forEach(img => outputDiv.appendChild(img));
  } catch (error) {
    // Hide loading spinner
    loadingDiv.style.display = 'none';

    // Display error
    errorDiv.textContent = error.message;
  }
}
