import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #e0f7e9;
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

const CheckAttendancePage = ({ attendanceLog }) => {
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
          {attendanceLog.map((entry, index) => (
            <TableRow key={index}>
              <TableData>{entry.name}</TableData>
              <TableData>{entry.rollNumber}</TableData>
              <TableData>{entry.date}</TableData>
              <TableData>{entry.time}</TableData>
            </TableRow>
          ))}
        </tbody>
      </AttendanceTable>
    </Container>
  );
};

export default CheckAttendancePage;