import React, { useState } from "react";
import "./NewHireLaptopSetup.css";

const NewHireLaptopSetup = () => {
  const [userName, setUserName] = useState("");
  const [serviceTag, setServiceTag] = useState("");
  const [requestNumber, setRequestNumber] = useState("");
  const [bookingLink, setBookingLink] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isFormComplete = userName && serviceTag && requestNumber && bookingLink;

  const generateTemplate = () => {
    return `Subject: Laptop Setup Request - ${userName}

Hi ${userName},

Your laptop is shipped at provided address.

- Laptop Service Tag: ${serviceTag}
- Request/Incident Number: ${requestNumber}
- Technician Booking: <a href="${bookingLink}" target="_blank">LINK</a>

Thanks,  
[Your Name]`;
  };

  const handleGenerateTemplate = () => {
    setEmailTemplate(generateTemplate());
    setIsGenerated(true);
  };

  const copyToClipboard = () => {
    if (!isFormComplete || !isGenerated) return;
    navigator.clipboard.writeText(
      emailTemplate.replace(/<a.*?>(.*?)<\/a>/g, "LINK")
    );
    alert("Template copied to clipboard!");
  };

  return (
    <div className="container">
      <h2>New Hire Laptop Setup</h2>

      <label>User's Name:</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <label>Laptop Service Tag:</label>
      <input
        type="text"
        value={serviceTag}
        onChange={(e) => setServiceTag(e.target.value)}
      />

      <label>Request/Incident Number:</label>
      <input
        type="text"
        value={requestNumber}
        onChange={(e) => setRequestNumber(e.target.value)}
      />

      <label>Technician Booking Link:</label>
      <input
        type="url"
        value={bookingLink}
        onChange={(e) => setBookingLink(e.target.value)}
        placeholder="Enter booking link"
      />

      <button onClick={handleGenerateTemplate} disabled={!isFormComplete}>
        Generate Template
      </button>

      <h3>Preview:</h3>

      {!isEditing ? (
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: emailTemplate }}
        />
      ) : (
        <textarea
          className="editable-preview"
          value={emailTemplate}
          onChange={(e) => setEmailTemplate(e.target.value)}
        />
      )}

      {isGenerated && (
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "View Formatted Template" : "Edit Template"}
        </button>
      )}

      <button
        onClick={copyToClipboard}
        disabled={!isFormComplete || !isGenerated}
      >
        Copy Template
      </button>
    </div>
  );
};

export default NewHireLaptopSetup;
