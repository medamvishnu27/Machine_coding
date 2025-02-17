import React, { useEffect, useState } from "react";

const Accordion = () => {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null); // Track the currently open FAQ ID

  useEffect(() => {
    fetch("http://localhost:3000/FAQ") // Ensure JSON Server is running
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched FAQs:", data);
        setFaqs(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const toggleFAQ = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id)); // Toggle logic
  };

  return (
    <div className="accordion-container">
  {faqs.map(({ id, question, answer }) => (
    <div key={id} className={`faq-item ${openId === id ? "open" : ""}`}>
      <div 
        className="faq-question" 
        onClick={() => toggleFAQ(id)}
      >
        <span>{question}</span>
        <button>{openId === id ? "-" : "+"}</button>
      </div>
      {openId === id && <p className="faq-answer">{answer}</p>}
    </div>
  ))}
</div>

  );
};

export default Accordion;
