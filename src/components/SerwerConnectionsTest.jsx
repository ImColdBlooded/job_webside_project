import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const SerwerConnectionsTest = () => {
  const [connectData, setConnectData] = useState({ Proba: [], time: [] });
  const [diagramVisibility, setDiagramVisibility] = useState(false);
  const [buttonMessage, setButtonMessage] = useState(true);

  const handleGetConnectData = async () => {
    const connectData_url = 'http://localhost/stronaZOfertamiPracy/serwerConnectionTest.php';

    try {
      const response = await axios.post(connectData_url);

      if (response.data.status === 'success') {
        const formattedData = {
          Proba: response.data.connTime.map((item, index) => `Proba ${index + 1}`),
          time: response.data.connTime.map(item => item.time),
        };
        setConnectData(formattedData);
        setDiagramVisibility(true);
      } else if (response.data.error) {
        console.log(response.data.error);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const data = {
    labels: connectData.Proba,
    datasets: [
      {
        label: 'Connection Time (ms)',
        data: connectData.time,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Connection Time Data',
      },
    },
  };

  const handleRetry = () => {
    setDiagramVisibility(false);
    setButtonMessage(false);
    handleGetConnectData();
  };

  return (
    <>
      {diagramVisibility ? (
        <Container>
          <Row>
            <Bar data={data} options={options} />
            <Button onClick={handleRetry}>Ponów próbę</Button>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            <Button onClick={handleRetry}>
              {buttonMessage ? 'Przeprowadz test połączenia' : 'Trwa ładowanie danych'}
            </Button>
          </Row>
        </Container>
      )}
    </>
  );
};
