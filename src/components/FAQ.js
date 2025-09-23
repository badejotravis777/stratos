// components/FAQ.js
import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "What is Stratos HQ?",
    answer:
      "Stratos HQ is an all-in-one workspace that combines project management, performance tracking, and AI-powered assistance to help teams and individuals stay productive and organized.",
  },
  {
    question: "How does the AI assistant work?",
    answer:
      "The AI assistant leverages advanced algorithms to provide smart task suggestions, automate repetitive processes, and generate actionable insights tailored to your workflow.",
  },
  {
    question: "Can I collaborate with my team in Stratos HQ?",
    answer:
      "Yes, Stratos HQ is built for collaboration. You can share projects, assign tasks, track progress, and communicate seamlessly with your team in one workspace.",
  },
  {
    question: "Is my data secure on Stratos HQ?",
    answer:
      "Absolutely. We use enterprise-grade encryption and follow strict compliance standards to ensure your data is always safe and private.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="faq-title">
          FA<span className="faq-accent">Q</span>
        </h2>

        <p className="faq-subtitle">
          We compiled a list of answers to address your most pressing<br />
          questions regarding our services
        </p>

        <div className="faq-list" role="list">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? "open" : ""}`}
                role="listitem"
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h4 className="faq-q-text">{faq.question}</h4>
                  <span className="faq-icon" aria-hidden="true">
                    {isOpen ? "✕" : "+"}
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`faq-answer ${isOpen ? "open" : ""}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
