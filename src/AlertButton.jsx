import axios from 'axios';

const sendAlert = async () => {
  await axios.post('http://localhost:5000/alert', { 
    location: 'Mumbai', 
    severity: 'High' 
  });
  alert('🚨 Alert sent to emergency teams!');
};

const AlertButton = () => (
  <button 
    onClick={sendAlert} 
    style={{ padding: '10px', fontSize: '16px', backgroundColor: 'red', color: 'white' }}>
    Send Disaster Alert 🚀
  </button>
);

export default AlertButton;
