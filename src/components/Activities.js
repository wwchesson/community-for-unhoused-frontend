import React, {useState, useEffect} from "react";
import { Tiles, H3} from "./StyleElements"
import Activity from "./Activity";

function Activities(){
    const [activities, setActivities] = useState([]);
    const [actFormData, setActFormData] = useState({
        activity: "",
        day_of_week: "",
        instructor: "",
        resident_name: ""

    })

    useEffect(() => {
        fetch("http://localhost:9292/activities")
        .then(r => r.json())
        .then((data) => setActivities(data))
    }, []);

    function handleActInputChange(event) {
        setActFormData({ ...actFormData, [event.target.name]: event.target.value });
    }

    function handleAddNewActivity(newActivity) {
        setActivities([...actFormData, newActivity])
    }
    
      function handleActivitySubmit(e) {
        e.preventDefault();
        fetch("http://localhost:9292/activities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(actFormData)
        })
        .then(r => r.json())
        .then((newActivity) => {
            handleAddNewActivity(newActivity);
            setActFormData({
                activity: "",
                day_of_week: "",
                instructor: "",
                resident_name: ""
        
            })
        })
      }

    return (
        <div className="activities">
        <H3>Activities</H3>
        <Tiles>
            {activities.map((act) => (
                <Activity key={act.id} act={act}></Activity>
            ))}
        </Tiles>
        <br/>
        <div className="new-act-form">
            <H3>Create a New Activity</H3>
            <div className="submit-form">
      <form className="resident-form" onSubmit={handleActivitySubmit}>
        <h3 className="add-resident">
          <strong>New Activity Form</strong>
        </h3>
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
          type="text"
          name="resident_name"
          value={actFormData.resident_name}
          onChange={handleActInputChange}
          placeholder="Resident's name"
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






  
 