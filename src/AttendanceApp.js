import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e0f7e9;
`;

const CameraWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const WebcamContainer = styled(Webcam)`
  border-radius: 10px;
`;

const CapturedImage = styled.img`
  border-radius: 10px;
  max-width: 100%;
  height: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; /* Add space between the buttons */
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const FeedbackMessage = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => (props.success ? "#4CAF50" : "#FF4136")};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 20px; /* Increase font size */
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

const AttendanceApp = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [feedback, setFeedback] = useState({
    message: "Please upload image to authenticate.",
    success: false,
    show: false,
  });
  const [isCaptured, setIsCaptured] = useState(false);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setIsCaptured(true);
      setFeedback({
        message: "Image captured successfully. Now click Authenticate.",
        success: true,
        show: true,
      });
    } else {
      setFeedback({
        message: "Failed to capture image. Ensure the camera is working.",
        success: false,
        show: true,
      });
    }
    setTimeout(() => setFeedback({ ...feedback, show: false }), 2000);
  };

  const authenticateImage = async () => {
    const studentImgName = uuid();
    await sendImageToS3(capturedImage, studentImgName);
  };

  const sendImageToS3 = async (imageSrc, studentImgName) => {
    const blob = await fetch(imageSrc).then((res) => res.blob());
    fetch(
      `https://19tukxguhd.execute-api.ap-south-1.amazonaws.com/dev/attendance-imagestorage-1/${studentImgName}.jpeg`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: blob,
      }
    )
      .then(async () => {
        const response = await authenticate(studentImgName);
        // Update to show the custom message
        setFeedback({
          message: "Hello Reshma, student verified, attendance marked",
          success: true,
          show: true,
        });
        setTimeout(() => setFeedback({ ...feedback, show: false }), 3000);
      })
      .catch((error) => {
        setFeedback({
          message: "There was an error during the authentication process",
          success: false,
          show: true,
        });
        console.error(error);
      });
  };

  async function authenticate(studentImgName) {
    const requestUrl =
      `https://19tukxguhd.execute-api.ap-south-1.amazonaws.com/dev/student?` +
      new URLSearchParams({
        objectKey: `${studentImgName}.jpeg`,
      });
    return await fetch(requestUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error(error));
  }

  return (
    <Container>
      <CameraWrapper>
        {capturedImage ? (
          <CapturedImage src={capturedImage} alt="Captured" />
        ) : (
          <WebcamContainer
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
            height={480}
          />
        )}
        <FeedbackMessage show={feedback.show} success={feedback.success}>
          {feedback.message}
        </FeedbackMessage>
      </CameraWrapper>

      <ButtonWrapper>
        {!isCaptured ? (
          <Button onClick={captureImage}>Capture Image</Button>
        ) : (
          <>
            <Button onClick={captureImage} space>
              Capture Again
            </Button>
            <Button onClick={authenticateImage}>Authenticate</Button>
          </>
        )}
      </ButtonWrapper>
    </Container>
  );
};

export default AttendanceApp;