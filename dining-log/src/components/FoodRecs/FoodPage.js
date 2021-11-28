import FilteredList from "./FilteredList";
import NavBar from "../navbar"
import styles from "./Page.module.css";

export default function Page(props) {
    return (
        <div>
            <NavBar/>
            <FilteredList/>
            <div>
                <p>Meal Calories: </p>
                <p>Remaining Daily Calories: </p>
                <button class={styles.button}>Log Meal</button>
            </div>
        </div>
    )
}