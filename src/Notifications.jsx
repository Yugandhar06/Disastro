import React, { useState } from "react";
import axios from "axios";
import "./Notifications.css";
const Notification = () => {
    const [emailSubject, setEmailSubject] = useState("");
    const [emailMessage, setEmailMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/sendNotification", {
                subject: emailSubject,
                message: emailMessage
            });

            alert(response.data.message || "Notification sent successfully!");
        } catch (error) {
            alert("Error sending notification. Please try again.");
        }

        setEmailSubject("");
        setEmailMessage("");
    };

    return (
        <div className="notification-container">
            <h2>Send Notification</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Enter notification message"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    required
                />
                <button type="submit">Send Notification</button>
            </form>
        </div>
    );
};

export default Notification;
