// src/CameraCapture.js
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  // Capture the image from the webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    sendImageToBackend(imageSrc);
  };

  // Send the captured image to the backend
  const sendImageToBackend = async (image) => {
    try {
      const response = await axios.post("YOUR_BACKEND_API_URL", {
        image: image, // Base64 encoded image
        timestamp: new Date().toISOString(),
      });
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending image:", error);
    }
  };

  return (
    <div>
      <h2>Capture Attendance</h2>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <br />
      <button onClick={captureImage}>Capture Image</button>
      {image && (
        <div>
          <h3>Captured Image:</h3>
          <img src={image} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
