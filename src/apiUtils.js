import axios from "axios";

export const sendAlert = async (email, alertMessage) => {
  try {
    const response = await axios.post("http://localhost:5000/send-alert", {
      email,
      alertMessage,
    });
    console.log(response.data.message); // Log success message
  } catch (error) {
    console.error(error.response?.data?.error || "Error sending alert");
  }
};
