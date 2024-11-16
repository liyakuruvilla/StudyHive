import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // set the base64 image string to state
      };
      reader.readAsDataURL(file);  // Convert the image to base64
    }
  };

  // Function to upload the image and fetch analysis results
  const analyzeImage = async () => {
    if (!image) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Send the Base64 image string to the backend
      const response = await fetch('http://localhost:5001/api/analyze-image', {
        method: 'POST',  // Use POST instead of GET
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64: image }),  // Send the base64 string
      });

      if (!response.ok) {
        throw new Error('Error fetching data from API');
      }

      const data = await response.json();
      if (data.caption) {
        console.log('Caption:', data.caption.text, 'Confidence:', data.caption.confidence);
      }
      if (data.textBlocks) {
        console.log('Text blocks from image:');
        data.textBlocks.forEach((block, index) => {
          console.log(`Text Block ${index + 1}: ${block.text}`);
        });
      }

      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while analyzing the image');
      setLoading(false);
    }
  };

  return (
    <div className="image-upload">
      <h1>Upload Image for Text Recognition</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={analyzeImage} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Image'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default ImageUpload;
