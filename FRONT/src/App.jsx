import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Koti from './Koti';
import Tietoa from './Tietoa';
import Hae from './Hae';
import Lisaa from './Lisaa';
import Kirjaudu from './Kirjaudu'; 
import Footer from './Footer';

const App = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar bg="dark" expand="lg" variant="dark" fixed="top" expanded={expanded}>
          <Container>

            <Image src="tango.jpeg" className="custom-logo" />
            {/* <Image src="tango.jpeg" rounded fluid/> */}

            <Navbar.Brand as={Link} to="/">Tanssipalvelin</Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setExpanded(!expanded)}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Koti</Nav.Link>
                <Nav.Link as={Link} to="/Tietoa" onClick={() => setExpanded(false)}>Tietoa</Nav.Link>
                <Nav.Link as={Link} to="/Hae" onClick={() => setExpanded(false)}>Hae</Nav.Link>
                {/* <Nav.Link as={Link} to="/Lisaa" onClick={() => setExpanded(false)}>Lisaa</Nav.Link> */}
                <Nav.Link as={Link} to="/Kirjaudu" onClick={() => setExpanded(false)}>Kirjaudu</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Koti />} />
          <Route path="/Tietoa" element={<Tietoa />} />
          <Route path="/Hae" element={<Hae />} />
          <Route path="/Lisaa" element={<Lisaa />} />
          <Route path="/Kirjaudu" element={<Kirjaudu />} /> 
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;