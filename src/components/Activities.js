import React, {useState, useEffect} from "react";
import { Tiles, H3} from "./StyleElements"
import Activity from "./Activity";
import {useParams} from "react-router-dom"

function Activities(){
    const [resident, setResident] = useState({activities: []});
    const { id } = useParams();
    const [actFormData, setActFormData] = useState({
        activity: "",
        day_of_week: "",
        instructor: ""
    })

    useEffect(() => {
        fetch(`http://localhost:9292/residents/${id}`)
        .then(r => r.json())
        .then((data) => {
          setResident(data)})
    }, []);

    function handleActInputChange(event) {
        setActFormData({ ...actFormData, [event.target.name]: event.target.value });
    }

    function handleAddNewActivity(newActivity) {
        const residentCopy = {...resident};
        residentCopy.activities.push(newActivity);
        setResident(residentCopy)
    }
    
      function handleActivitySubmit(e) {
        e.preventDefault();
        const activityData = {...actFormData, resident_id: id}
        fetch("http://localhost:9292/activities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activityData)
        })
        .then(r => r.json())
        .then((newActivity) => {
            handleAddNewActivity(newActivity);
            setActFormData({
                activity: "",
                day_of_week: "",
                instructor: "",
            })
        })
      }

      const activityCard = resident.activities.map((act) => <Activity key={act.id} act={act}/>)

    return (
        <div className="activities">
          <br/>
        <H3><strong>{resident.name}'s Activities</strong></H3>
        <Tiles>
           {activityCard}
        </Tiles>
        <br/>
        <div className="new-act-form">
            <div className="submit-form">
      <form className="resident-form" onSubmit={handleActivitySubmit}>
        <h1 className="add-resident">
          New Activity Form
        </h1>
        <input
          type="text"
          name="activity"
          value={actFormData.activity}
          onChange={handleActInputChange}
          placeholder="Enter activity's name"
          className="input-text"
        ></input>
        <br />
        <input
          type="text"
          name="day_of_week"
          value={actFormData.day_of_week}
          onChange={handleActInputChange}
          placeholder="Day of week"
          className="input-text"
        ></input>
        <br />
        <input
          type="text"
          name="instructor"
          value={actFormData.instructor}
          onChange={handleActInputChange}
          placeholder="Instructor's name"
          className="input-text"
        ></input>
      
        <br />
        <input
          type="submit"
          name="submit"
          value="Submit"
          className="btn"
        ></input>
      </form>
        </div>
    </div>
    </div>
    )
}

export default Activities;






  
 