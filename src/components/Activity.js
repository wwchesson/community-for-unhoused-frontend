import React from "react";
import { ActCard } from "./StyleElements";

function Activity({act}) {
    const {activity, instructor, day_of_week} = act
    

    return (
        <ActCard>
            <h3>{activity}</h3>
            <h4>{day_of_week}</h4>
            <h4>Instructor: {instructor}</h4>
        </ActCard>
    )
}

export default Activity