import React from "react";
import { useState } from 'react';



export default function Food(props) {
const [checked, setChecked] = useState(false);
    return (
        <form> 
        <input
            type="checkbox"
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
        />
        {props.name}
        </form>
    )
}