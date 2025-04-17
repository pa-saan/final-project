from flask import Flask, jsonify
from flask_cors import CORS

# Import simulations
from simulations.phishing import run_phishing_simulation
from simulations.ransomware import run_ransomware_simulation
from simulations.ddos import run_ddos_simulation
from simulations.packet_sniffing import run_packet_sniffing_simulation

app = Flask(__name__)
CORS(app)

@app.route('/simulate/phishing')
def phishing():
    result = run_phishing_simulation()
    return jsonify(result)

@app.route('/simulate/ransomware')
def ransomware():
    result = run_ransomware_simulation()
    return jsonify(result)

@app.route('/simulate/ddos')
def ddos():
    result = run_ddos_simulation()
    return jsonify({"log": result})

@app.route('/simulate/packet-sniffing')
def sniffing():
    result = run_packet_sniffing_simulation()
    return jsonify({"packets": result})

if __name__ == '__main__':
    app.run(debug=True)
