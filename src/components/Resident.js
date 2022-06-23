import React, { useState } from "react";
import { Card } from "./StyleElements";
import { Link } from "react-router-dom";


function Resident({ resident, onUpdateResident, onDeleteResident }) {
  const { id, name, ssn, age, email, needs, interests } = resident;

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    ssn: "",
    age: "",
    email: "",
    needs: "",
    interests: "",
  });

  function handleUpdateInputChange(event) {
    setUpdateFormData({
      ...updateFormData,
      [event.target.name]: event.target.value,
    });
  }

  function handleEditClick() {
    setShowUpdateForm((showUpdateForm) => !showUpdateForm);
    setUpdateFormData({
      name: name,
      ssn: ssn,
      age: age,
      email: email,
      needs: needs,
      interests: interests,
    });
  }

  function handleDeleteClick() {
    fetch(`http://localhost:9292/residents/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        onDeleteResident(id);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/residents/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFormData),
    })
      .then((r) => r.json())
      .then((updatedResident) => {
        onUpdateResident(updatedResident);
        setShowUpdateForm((showUpdateForm) => !showUpdateForm);
      });
  }

  return (
    <Card>
      <h3><Link to={`/residents/${id}`}>{name}</Link></h3>
      <h5 className="instructions">Click on the link above to see resident's activities</h5>
      <br/>
      <h4>SSN: {ssn}</h4>
      <h4> Age: {age}</h4>
      <h4>Email Address: {email}</h4>
      <h4>Needs: {needs}</h4>
      <h4>Interests: {interests}</h4>
      <div>
        <button onClick={handleDeleteClick}>Delete Resident</button>
        <br />
        <button onClick={handleEditClick}>
          {showUpdateForm ? "Hide Update Form" : "Update Resident"}
        </button>
        {showUpdateForm ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={updateFormData.name}
              onChange={handleUpdateInputChange}
              placeholder="Enter resident's name"
              className="input-update-resident"
            ></input>
            <br />
            <input
              type="text"
              name="SSN"
              value={updateFormData.ssn}
              onChange={handleUpdateInputChange}
              placeholder="SSN"
              className="input-update-resident"
            ></input>
            <br />
            <input
              type="text"
              name="age"
              value={updateFormData.age}
              onChange={handleUpdateInputChange}
              placeholder="Age"
              className="input-update-resident"
            ></input>
            <br />

            <input
              type="text"
              name="email"
              value={updateFormData.email}
              onChange={handleUpdateInputChange}
              placeholder="Email address"
              className="input-update-resident"
            ></input>
            <br />
            <input
              type="text"
              name="needs"
              value={updateFormData.needs}
              onChange={handleUpdateInputChange}
              placeholder="Resident's needs"
              className="input-update-resident"
            ></input>
            <br />
            <input
              type="text"
              name="interests"
              value={updateFormData.interests}
              onChange={handleUpdateInputChange}
              placeholder="Resident's interests"
              className="input-update-resident"
            ></input>
            <br />
            <input
              type="submit"
              name="submit"
              value="Submit"
              className="btn"
            ></input>
          </form>
        ) : null}
      </div>
    </Card>
  );
}

export default Resident;


