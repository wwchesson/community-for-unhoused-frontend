import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ResidentsList from "./ResidentsList";
import NavBar from "./NavBar";
import ResidentIntake from "./ResidentIntake";
import Activities from "./Activities";

function App() {
  const [residents, setResidents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    ssn: "",
    age: "",
    email: "",
    needs: "",
    interests: "",
  });

  useEffect(() => {
    fetch("http://localhost:9292/residents")
      .then((r) => r.json())
      .then(setResidents);
  }, []);

  function handleAddResident(newResident) {
    setResidents([...residents, newResident]);
  }

  function handleUpdateResident(updatedResident) {
    const updatedResidents = residents.map((resident) =>
      resident.id === updatedResident.id ? updatedResident : resident
    );
    setResidents(updatedResidents);
  }

  function handleDeleteResident(id) {
    const deleteResident = residents.filter((resident) => resident.id !== id)
    setResidents(deleteResident)
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/residents"
          element={
            <ResidentsList residents={residents} setFormData={setFormData}
           onUpdateResident={handleUpdateResident} onDeleteResident = {handleDeleteResident}
            />
          }
        />
        <Route
          path="/resident_intake"
          element={
            <ResidentIntake
              formData={formData}
              setFormData={setFormData}
              
              onAddResident={handleAddResident}
            />
          }
        />
         <Route
          path="/activities"
          element={
            <Activities
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
