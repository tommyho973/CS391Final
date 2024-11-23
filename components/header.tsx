// Made by Camille Christie (added styled-components - Michelle Sun)
"use client";
import Link from "next/link";
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 600;
  padding: 1rem;
`;

const Nav = styled.nav`
  padding: 0.5rem;
  margin: 1rem;
`;

const StyledLink = styled(Link)`
  padding: 0.25rem;
  margin: 0.5rem;
  font-size: 1.25rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Title>Daily Task Tracker</Title>
      <Nav>
        <StyledLink href="/">Home</StyledLink>
        <StyledLink href="/addtask">Add Task</StyledLink>
      </Nav>
    </HeaderContainer>
  );
}