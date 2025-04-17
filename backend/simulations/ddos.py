import time

def run_ddos_simulation():
    log = []
    for i in range(1, 6):
        log.append(f"Sending massive request #{i} to target...")
        time.sleep(0.3)  # simulate time delay
    return log
