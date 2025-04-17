import React, { useState } from 'react';
import axios from 'axios';

const DDoS = () => {
  const [logs, setLogs] = useState([]);

  const simulate = async () => {
    const res = await axios.get('http://localhost:5000/simulate/ddos');
    setLogs(res.data.log);
  };

  return (
    <div>
      <h2>DDoS Simulation</h2>
      <button onClick={simulate}>Start Attack</button>
      {logs.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
};

export default DDoS;
