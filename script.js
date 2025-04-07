async function downloadImages() {
  const loadingDiv = document.getElementById('loading');
  const outputDiv = document.getElementById('output');
  const errorDiv = document.getElementById('error');

  outputDiv.innerHTML = '';
  errorDiv.textContent = '';
  loadingDiv.style.display = 'block';

  const imagePromises = imageUrls.map(async (url) => {
    try {
      const img = await downloadImage(url);
      outputDiv.appendChild(img);
    } catch (error) {
      // Handle individual error for this image
      errorDiv.textContent += error.message + '\n'; // Append error message
    }
  });

  await Promise.all(imagePromises); // Wait for all image promises to settle

  loadingDiv.style.display = 'none'; // Hide loading spinner after all promises settle
}