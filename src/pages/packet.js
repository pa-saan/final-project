import React, { useState } from 'react';
import axios from 'axios';

const PacketSniffing = () => {
  const [packets, setPackets] = useState([]);

  const simulate = async () => {
    const res = await axios.get('http://localhost:5000/simulate/packet-sniffing');
    setPackets(res.data.packets);
  };

  return (
    <div>
      <h2>Packet Sniffing Simulation</h2>
      <button onClick={simulate}>Sniff Packets</button>
      <ul>
        {packets.map((pkt, index) => (
          <li key={index}>
            {pkt.src} → {pkt.dst} ({pkt.protocol})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PacketSniffing;
