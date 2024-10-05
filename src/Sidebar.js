import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #333;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
`;

const SidebarLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 15px 0;
  border-bottom: 1px solid #555;
  transition: background 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <h2>Attendance App</h2>
      <SidebarLink to="/">Home</SidebarLink>
      <SidebarLink to="/about">About</SidebarLink>
      <SidebarLink to="/check-attendance">Check Attendance</SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
