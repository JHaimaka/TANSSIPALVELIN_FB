import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Lisaa = () => {
  const [danceEvent, setDanceEvent] = useState('');
  const [danceGenre, setDanceGenre] = useState('');
  const [dancePlace, setDancePlace] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        danceEvent,
        danceGenre,
        dancePlace,
        startDate,
        startTime,
        endDate,
        endTime,
      };

      // Tulosta lomaketiedot JSON-muodossa konsoliin
      console.log('Lomaketiedot:', JSON.stringify(formData));

      const response = await fetch('http://localhost:3000/lisaa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`, // Lisätty tokeni otsakkeisiin
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setModalMessage('Tapahtuman lisäys onnistui');
      } else {
        setModalMessage('Tapahtuman lisäys epäonnistui. Ota yhteyttä ylläpitoon.');
      }

      setShowModal(true);
    } catch (error) {
      console.error('Virhe tapahtuman lisäyksessä:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="tietoa">
      <h1 className="mb-4">Lisää tapahtuma</h1>
      <form>
        <div className="mb-3 row">
          <div className="col">
            <label htmlFor="danceEvent" className="form-label">
              Tapahtuma:
              <input
                type="text"
                className="form-control"
                id="danceEvent"
                value={danceEvent}
                onChange={(e) => setDanceEvent(e.target.value)}
              />
            </label>
          </div>
          <div className="col">
            <label htmlFor="danceGenre" className="form-label">
              Lajityyppi:
              <input
                type="text"
                className="form-control"
                id="danceGenre"
                value={danceGenre}
                onChange={(e) => setDanceGenre(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="dancePlace" className="form-label">
            Paikka:
            <input
              type="text"
              className="form-control"
              id="dancePlace"
              value={dancePlace}
              onChange={(e) => setDancePlace(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <label htmlFor="startDate" className="form-label">
              Alkupäivä:
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
          </div>
          <div className="col">
            <label htmlFor="startTime" className="form-label">
              Alkuaika:
              <input
                type="time"
                className="form-control"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <label htmlFor="endDate" className="form-label">
              Loppupäivä:
              <input
                type="date"
                className="form-control"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>
          <div className="col">
            <label htmlFor="endTime" className="form-label">
              Loppuaika:
              <input
                type="time"
                className="form-control"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </label>
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Lisää tapahtuma
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

export default Lisaa;
