import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #e0f7e9; /* Slight green background */
  height: 100vh;
`;

const AttendanceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
`;

const TableHeader = styled.th`
  background-color: #4caf50;
  color: white;
  padding: 12px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const mockData = [
  { name: "John Doe", rollNumber: "12345", date: "2024-10-01", time: "09:00 AM" },
  { name: "Jane Smith", rollNumber: "67890", date: "2024-10-01", time: "09:05 AM" },
];

const CheckAttendancePage = () => {
  return (
    <Container>
      <h1>Check Attendance</h1>
      <AttendanceTable>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Roll Number</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Time</TableHeader>
          </tr>
        </thead>
        <tbody>
          {mockData.map((student, index) => (
            <TableRow key={index}>
              <TableData>{student.name}</TableData>
              <TableData>{student.rollNumber}</TableData>
              <TableData>{student.date}</TableData>
              <TableData>{student.time}</TableData>
            </TableRow>
          ))}
        </tbody>
      </AttendanceTable>
    </Container>
  );
};

export default CheckAttendancePage;
