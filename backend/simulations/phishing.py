# backend/simulations/phishing.py
from flask import Blueprint, request, jsonify
from faker import Faker
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

phishing_bp = Blueprint('phishing', __name__)
fake = Faker()

def send_simulated_email(target_email, simulation_mode='safe'):
    # Create message container
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Urgent: Your Account Requires Verification"
    msg['From'] = "security@yourcompany.com"
    msg['To'] = target_email
    
    # Create the body of the message
    if simulation_mode == 'safe':
        # Safe mode with obvious signs
        text = f"""Dear User,
        
We've noticed suspicious activity on your account. Please verify your credentials by clicking this link:
        
http://training.yourcompany.com/phishing-test?email={target_email}
        
Note: This is a simulated phishing email for training purposes.
        
IT Department"""
        
        html = f"""<html>
<head></head>
<body>
<p>Dear User,</p>
<p>We've noticed <strong>suspicious activity</strong> on your account. Please verify your credentials by clicking below:</p>
<p><a href="http://training.yourcompany.com/phishing-test?email={target_email}">Verify Account</a></p>
<p style="color: red; font-weight: bold;">Note: This is a simulated phishing email for training purposes.</p>
<p>IT Department</p>
</body>
</html>"""
    else:
        # More realistic simulation
        text = f"""Dear {target_email.split('@')[0]},
        
Our security system detected multiple failed login attempts to your account from a new device in Germany.
        
To protect your account, we require immediate verification:
        
http://account-verify.yourcompany.xyz/secure?id={fake.uuid4()}
        
This link will expire in 24 hours.
        
Security Team"""
        
        html = f"""<html>
<head></head>
<body>
<p>Dear {target_email.split('@')[0]},</p>
<p>Our security system detected <strong>multiple failed login attempts</strong> to your account from a new device in Germany (IP: 185.143.223.67).</p>
<p>To protect your account, we require immediate verification:</p>
<p><a href="http://account-verify.yourcompany.xyz/secure?id={fake.uuid4()}">Secure Your Account Now</a></p>
<p><em>This link will expire in 24 hours.</em></p>
<p>Security Team</p>
</body>
</html>"""
    
    # Record the simulation without actually sending emails
    return {
        'email_details': {
            'to': target_email,
            'subject': msg['Subject'],
            'from': msg['From'],
            'text_version': text,
            'html_version': html,
            'simulation_mode': simulation_mode
        },
        'phishing_indicators': [
            "Generic greeting instead of personal name",
            "Urgent call to action",
            "Suspicious link domain",
            "Request for credentials",
            "Mismatched sender address"
        ] if simulation_mode == 'safe' else [
            "Spoofed sender address",
            "Urgency created with fake login attempts",
            "Fake IP address reference",
            "Link to non-official domain",
            "No physical company address"
        ]
    }

@phishing_bp.route('/simulate', methods=['POST'])
def simulate_phishing():
    data = request.get_json()
    target_email = data.get('email')
    simulation_mode = data.get('mode', 'safe')
    
    if not target_email:
        return jsonify({'error': 'Email address required'}), 400
    
    result = send_simulated_email(target_email, simulation_mode)
    
    # In a real implementation, you would:
    # 1. Store this simulation in your database
    # 2. Track if/when the user clicks the link
    # 3. Provide educational content after interaction
    
    return jsonify(result)