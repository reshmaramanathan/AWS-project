const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
app.use(bodyParser.json({ limit: '50mb' })); // To handle large image files

AWS.config.update({
  region: 'your-region', // e.g., 'us-west-2'
});

const rekognition = new AWS.Rekognition();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Endpoint to verify user
app.post('/verify', async (req, res) => {
  const { image, timestamp } = req.body;

  try {
    // Step 1: Send image to AWS Rekognition for facial analysis
    const rekognitionParams = {
      Image: {
        Bytes: Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64')
      },
      MaxFaces: 1,
    };

    const rekognitionData = await rekognition.detectFaces(rekognitionParams).promise();

    if (rekognitionData.FaceDetails.length > 0) {
      // Step 2: If a face is detected, search DynamoDB for user data (this requires face comparison)
      const dynamoParams = {
        TableName: 'Attendance',
        Key: { 'FaceID': 'some-identifier-from-rekognition-or-your-database' },
      };

      const userData = await dynamoDB.get(dynamoParams).promise();

      if (userData.Item) {
        // Step 3: If user is found, mark attendance in the DynamoDB
        const attendanceParams = {
          TableName: 'AttendanceRecords',
          Item: {
            'UserId': userData.Item.UserId,
            'Timestamp': timestamp,
            'Name': userData.Item.Name,
          },
        };

        await dynamoDB.put(attendanceParams).promise();

        // Return success to frontend
        res.json({ verified: true, name: userData.Item.Name });
      } else {
        res.json({ verified: false });
      }
    } else {
      res.json({ verified: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing image' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
