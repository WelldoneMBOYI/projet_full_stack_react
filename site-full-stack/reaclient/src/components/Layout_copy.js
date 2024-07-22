import { useMemo, useRef, useState, useEffect} from "react";
// On s'abonne aux val globales du context
import { useAppContext } from "../context"
import { Button, Navbar, Nav, Container } from 'react-bootstrap';

export default function Layout({ children }) {
    const { addPost } = useAppContext(); 


    // Tester la l'insertion
    useEffect(() => {
        addPost({title: "some new title", content: "some new content"})
    }, [])
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1>Welcome to React-Bootstrap</h1>
        {/* <Button variant="primary">Primary Button</Button> */}
        <div>
            {children}
        </div>
      </Container>
    </div>
  );
}

