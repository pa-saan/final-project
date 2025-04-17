def run_packet_sniffing_simulation():
    packets = [
        {"src": "192.168.0.2", "dst": "192.168.0.10", "protocol": "HTTP"},
        {"src": "192.168.0.3", "dst": "192.168.0.11", "protocol": "HTTPS"},
        {"src": "192.168.0.4", "dst": "192.168.0.12", "protocol": "DNS"}
    ]
    return packets
