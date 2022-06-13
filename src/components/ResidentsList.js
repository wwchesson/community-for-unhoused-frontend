import React from "react";
import { Tiles, H3} from "./StyleElements"
import Resident from "./Resident"

function Residents({residents, onUpdateResident, onDeleteResident}) {


  
    return (
        <div className="residents">
            <H3>Residents</H3>
            <Tiles>
            {residents.map((resident) => (
              <Resident key={resident.id} resident={resident} onUpdateResident={onUpdateResident} onDeleteResident={onDeleteResident}/>
            ))}
            </Tiles>
        </div>
    )
}

export default Residents;