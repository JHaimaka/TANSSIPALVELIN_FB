import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Kirjaudu = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);

  const validateEmail = (inputEmail) => {
    // Yksinkertainen sähköpostin tarkistus
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Tarkistetaan sähköposti ennen lähettämistä
      const isEmailValid = validateEmail(email);
      setEmailIsValid(isEmailValid);

      if (!isEmailValid) {
        return; // Jos sähköposti ei ole kelvollinen, ei jatketa
      }

      if (isNewUser) {
        const createUserResponse = await fetch('http://localhost:3000/luo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (createUserResponse.ok) {
          setModalMessage('Käyttäjän lisäys onnistui');

          const loginResponse = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            localStorage.setItem('userToken', loginData.token);
            window.location.href = '/Lisaa';
          } else {
            setModalMessage('Kirjautuminen epäonnistui. Muista valita se täppä! Yritä uudelleen tai ota yhteyttä ylläpitoon.');
          }
        } else {
          setModalMessage('Käyttäjän lisäys epäonnistui. Muista valita se täppä! Ota yhteyttä sivujen ylläpitäjään.');
        }
      } else {
        const loginResponse = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          localStorage.setItem('userToken', loginData.token);
          window.location.href = '/Lisaa';
        } else {
          setModalMessage('Kirjautuminen epäonnistui. Yritä uudelleen tai ota yhteyttä sivujen ylläpitäjään.');
        }
      }

      setShowModal(true);
    } catch (error) {
      console.error('Virhe sisäänkirjautumisessa:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="tietoa">
      <h4 className="mb-4">Kirjaudu sisään tapahtuman lisäämiseksi</h4>
      <form>
        <div className={`mb-3 ${emailIsValid ? '' : 'invalid-email'}`}>
          <label htmlFor="email" className="form-label">
            Email:
            <input
              type="text"
              className={`form-control ${emailIsValid ? '' : 'is-invalid'}`}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!emailIsValid && (
              <div className="invalid-feedback">Syötä kelvollinen sähköpostiosoite.</div>
            )}
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Salasana:
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="isNewUser" className="form-check-label">
            Uusi käyttäjä - valitse täppä lisätäksesi sähköpostiosoitteesi ja salasanasi järjestelmään...
            <input
              type="checkbox"
              className="form-check-input"
              id="isNewUser"
              checked={isNewUser}
              onChange={() => setIsNewUser(!isNewUser)}
            />
          </label>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Kirjaudu sisään
        </button>
      </form>
  
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ilmoitus</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Kirjaudu;
