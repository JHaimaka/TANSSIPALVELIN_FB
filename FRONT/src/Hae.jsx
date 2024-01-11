import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

const Hae = () => {
  const [dances, setDances] = useState([]);

  useEffect(() => {
    const fetchDances = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/dances');
        const data = await response.json();

        // Järjestä tapahtumat startDate:n perusteella nousevaan järjestykseen
        const sortedDances = data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        setDances(sortedDances);
      } catch (error) {
        console.error('Virhe tietojen hakemisessa:', error);
      }
    };

    fetchDances();
  }, []);

  return (
    <div className="tietoa">
      <h4>Tanssitapahtumat</h4>
      <Table responsive="sm" size="sm" striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Päivä</th>
              <th>Aika</th>
              <th>Tapahtuma</th>
              <th>Laji</th>
              <th>Paikka</th>              
            </tr>
          </thead>
          <tbody>
            {dances.map((dance) => 
            {
              const startDate = new Date(dance.startDate);
              const day = startDate.toLocaleDateString('fi-FI', { day: 'numeric' });
              const month = startDate.toLocaleDateString('fi-FI', { month: 'numeric' });

              return (
                <tr key={dance._id}>
                  <td>{`${day}.${month}.`}</td>
                  <td>{dance.startTime}</td>
                  <td>{dance.danceEvent}</td>
                  <td>{dance.danceGenre}</td>
                  <td>{dance.dancePlace}</td>                                   
                </tr>
              );
            }
            )}
          </tbody>
      </Table>
    </div>
  );
};

export default Hae;