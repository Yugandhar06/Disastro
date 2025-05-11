import React, { useState } from 'react';
import axios from 'axios';
import './Feedback.css';

const Feedback = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    feedback: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9099/api/feedback', formData);

      // Debugging: Log API response
      console.log("Server Response:", response.data);

      // Ensure response has a message before displaying
      alert(response.data?.message || "Feedback submitted successfully!");

      // Reset form after successful submission
      setFormData({ customerName: '', email: '', feedback: '' });

    } catch (error) {
      console.error("Error submitting feedback:", error);

      // Improved error handling
      alert(error.response?.data?.message || 'Error submitting feedback. Please try again.');
    }
  };

  return (
    <div className='container'>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Your Name"
          value={formData.customerName} // Fixed here
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="feedback"
          placeholder="Your Feedback"
          value={formData.feedback}
          onChange={handleChange}
          required rows={8} cols={50}
        ></textarea>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;