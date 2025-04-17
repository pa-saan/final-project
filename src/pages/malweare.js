import React, { useState } from 'react';
import axios from 'axios';

const Malware = () => {
  const [log, setLog] = useState([]);
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  const handleSimulate = async () => {
    try {
      const res = await axios.get('http://localhost:5000/simulate/malware');
      setLog(res.data.log);
      setStatus(res.data.status);
      setNote(res.data.note);
    } catch (error) {
      console.error("Error simulating malware:", error);
    }
  };

  return (
    <div>
      <h2>Malware Infection Simulation</h2>
      <button onClick={handleSimulate}>Simulate Infection</button>
      {status && <p><strong>Status:</strong> {status}</p>}
      {note && <p><em>{note}</em></p>}
      <div>
        {log.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default Malware;
