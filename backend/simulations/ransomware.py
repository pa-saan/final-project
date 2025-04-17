import os
import base64
import time
from datetime import datetime

LOG_PATH = "simulation/logs/ransomware.log"
SAMPLE_DIR = "sample_data"

def log_event(message):
    with open(LOG_PATH, "a") as log:
        log.write(f"[{datetime.now()}] {message}\n")

def fake_encrypt_file(file_path):
    with open(file_path, "rb") as f:
        content = f.read()
        encoded = base64.b64encode(content)

    with open(file_path, "wb") as f:
        f.write(encoded)

    os.rename(file_path, file_path + ".encrypted")
    log_event(f"Encrypted file: {os.path.basename(file_path)}")

def simulate_ransomware_attack():
    log_event("Ransomware attack started.")
    
    for file_name in os.listdir(SAMPLE_DIR):
        file_path = os.path.join(SAMPLE_DIR, file_name)
        if not file_name.endswith(".encrypted"):
            fake_encrypt_file(file_path)
            time.sleep(0.5)  # simulate delay

    # Drop ransom note
    note_path = os.path.join(SAMPLE_DIR, "READ_ME.txt")
    with open(note_path, "w") as f:
        f.write("Your files have been encrypted.\nSend 2 BTC to this address.")
    log_event("Ransom note dropped.")

    return {"status": "success", "message": "Ransomware simulation completed."}
