import React from "react";
import "./FAQ.css";

const FAQs = () => {
  const faqList = [
    {
      question: "What is this website about?",
      answer: "This site provides disaster-related resources, survival tips, real-time alerts, and interactive tools to help users stay prepared and safe during emergencies.",
    },
    {
      question: "How can I access the Emergency Alerts?",
      answer: "Emergency Alerts are available on the Dashboard or through the Emergency Alerts section. You need to log in to access detailed alerts and real-time data.",
    },
    {
      question: "How do I report a disaster?",
      answer: "Go to the Report a Disaster section, enter the location, and submit the details. Your report will be sent to the admin for review.",
    },
    {
      question: "Who can use this website?",
      answer: "This platform is open to the public. Anyone looking for disaster-related information, safety tips, or interactive tools can use it.",
    },
    {
      question: "How can I volunteer or donate to disaster relief organizations?",
      answer: "Visit the Additional Resources page for links to trusted organizations like UNICEF, Red Cross, and Volunteer.gov.",
    },
    {
      question: "Is this website free to use?",
      answer: "Yes! All tools and resources are available for free. You only need an account to access advanced features like reporting disasters or interacting with live alerts.",
    },
    {
      question: "How do I reset my password?",
      answer: "If you forget your password, click the 'Forgot Password' button on the login page. Follow the instructions to reset your password.",
    },
    {
      question: "How do I create an account?",
      answer: "Go to the Signup page, fill in your details (First Name, Last Name, Gmail, etc.), and click 'Signup.' You'll gain access to the site's features.",
    },
  ];

  return (
    <div className="faqs">
      <h1>❓ Frequently Asked Questions (FAQs)</h1>
      <div className="faq-list">
        {faqList.map((faq, index) => (
          <div key={index} className="faq-item">
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
