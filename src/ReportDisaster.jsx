import { useState } from "react";
import "./ReportDisaster.css"; // Optional for styling

const ReportDisaster = () => {
  const [formData, setFormData] = useState({
    area: "",
    disasterType: "",
    message: "",
    photo: null,
    video: null,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));

    // Preview files before submission
    if (name === "photo") {
      setPhotoPreview(URL.createObjectURL(file));
    } else if (name === "video") {
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Send this data to backend
    console.log("🚨 Disaster Report Sent:", formData);

    // Simulate notifying admin
    alert("Admin has been notified!");

    setSuccessMessage("Report sent successfully!");
    setFormData({ area: "", disasterType: "", message: "", photo: null, video: null });
    setPhotoPreview(null);
    setVideoPreview(null);
  };

  return (
    <div className="report-disaster-container">
      <h2>Report a Disaster</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <label>
          Area:
          <input type="text" name="area" value={formData.area} onChange={handleChange} required />
        </label>

        <label>
          Disaster Type:
          <input type="text" name="disasterType" value={formData.disasterType} onChange={handleChange} required />
        </label>

        <label>
          More Information:
          <textarea name="message" value={formData.message} onChange={handleChange} rows="4" required></textarea>
        </label>

        <label>
          Upload Photo:
          <input type="file" name="photo" accept="image/*" onChange={handleFileChange} />
        </label>
        {photoPreview && <img src={photoPreview} alt="Photo Preview" className="preview" />}

        <label>
          Upload Video:
          <input type="file" name="video" accept="video/*" onChange={handleFileChange} />
        </label>
        {videoPreview && (
          <video controls className="preview">
            <source src={videoPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <button type="submit">Send</button>

        {successMessage && <p className="success">{successMessage}</p>}
      </form>
    </div>
  );
};

export default ReportDisaster;
