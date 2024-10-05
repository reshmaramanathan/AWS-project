import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #e0f7e9;
`;

const Content = styled.div`
  text-align: left;
`;

const Footer = styled.div`
  margin-top: auto;
  padding: 20px;
  text-align: center;
  background-color: #4caf50;
  color: white;
  width: 100%;
  font-size: 16px;
`;

const AboutPage = () => {
  return (
    <Container>
      <Content>
        <h1>About the Project</h1>
        <p><b>Objective:</b><br></br>This project aims to develop a cloud-based authentication system for attendance management using AWS services to streamline and automate the process of tracking and managing attendance in academic institutions. The system is designed to enhance the efficiency, accuracy, and security of attendance records.</p>
        <p><b>Purpose:</b><br></br> The reason for this framework is to address the impediments of conventional participation administration frameworks, which are frequently manual, inclined to mistakes, and time-consuming. By leveraging AWS technologies, this project seeks to automate the attendance process, reduce administrative overhead, and provide a scalable solution that can be easily integrated into existing academic systems.</p>
        <p><b>Outcome:</b><br></br>The anticipated effect is an adequately functional cloud-located attendance management system that uses AWS duties to substantiate consumers, record attendance, and create reports. The system will offer features to a degree legitimate-opportunity attendance following, mechanised newsgathering, and secure data management. This resolution will help veracity, decrease manual errors, and supply a convenient connection for two together administrators and juniors. <br></br>
        <ul>
        <li>Increased Security: Implements advanced security measures, including biometric and two-factor authentication via Amazon Cognito, to enhance data protection and prevent fraudulent activities.</li>
        <li>Automated Reporting: Automates report generation and data analysis, providing timely and accurate reports with minimal manual intervention.</li>
        <li>Cost-Effectiveness: Reduces operational costs by eliminating the need for on-premises hardware and leveraging pay-as-you-go cloud services.</li>
        </ul>
        </p>
      </Content>
      <Footer>
        <p>Keerthana B 22BIT0051, Harsha Varthini 22BIT0656, Mahima 22BIT0652, Rituparna R 22BIT0622, Reshma 22BIT0581</p>
      </Footer>
    </Container>
  );
};

export default AboutPage;
