import React from "react";
import { useNavigate } from "react-router-dom";

function ResidentIntake({onAddResident, formData, setFormData}) {
    const navigate = useNavigate();

  function handleIntakeInputChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleIntakeSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:9292/residents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newResident) => {
        onAddResident(newResident);
        setFormData({
            name: "",
            ssn: "",
            age: "",
            email: "",
            needs: "",
            interests: ""
        });
        navigate("/residents");
      });
  }

  return (
    <div className="submit-form">
      <form className="resident-form" onSubmit={handleIntakeSubmit}>
        <h3 className="add-resident">
          <strong>Resident Intake Form</strong>
        </h3>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleIntakeInputChange}
          placeholder="Enter resident's name"
          className="input-text"
        ></input>
        <br />
        <input
          type="text"
          name="SSN"
          value={formData.ssn}
          onChange={handleIntakeInputChange}
          placeholder="SSN"
          className="input-text"
        ></input>
        <br />
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleIntakeInputChange}
          placeholder="Age"
          className="input-text"
        ></input>
        <br />

        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleIntakeInputChange}
          placeholder="Email address"
          className="input-text"
        ></input>
        <br />
        <input
          type="text"
          name="needs"
          value={formData.needs}
          onChange={handleIntakeInputChange}
          placeholder="Resident's needs"
          className="input-text"
        ></input>
        <br />
        <input
          type="text"
          name="interests"
          value={formData.interests}
          onChange={handleIntakeInputChange}
          placeholder="Resident's interests"
          className="input-text"
        ></input>
        <br />
        <br />
        <input
          type="submit"
          name="submit"
          value="Submit"
          className="btn"
        ></input>
      </form>
    </div>
  );
}

export default ResidentIntake;