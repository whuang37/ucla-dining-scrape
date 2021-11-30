import FilteredList from "./FilteredList";
import NavBar from "../navbar"
import styles from "./Page.module.css";

export default function Page(props) {
    return (
        <div>
            <NavBar/>
            <FilteredList dailyCalories={props.dailyCalories} />
        </div>
    )
}