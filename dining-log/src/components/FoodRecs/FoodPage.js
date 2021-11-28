import FoodList from "./FoodList";
import FilterBar from "./FilterBar";
import NavBar from "../navbar"
import styles from "./Page.module.css";

export default function Page(props) {
    return (
        <div>
            <NavBar/>
            <FilterBar/>
            <div>
                <FoodList meal="Breakfast" hall="De Neve"/>
            </div>
            <div>
                <p>Meal Calories: </p>
                <p>Remaining Daily Calories: </p>
                <button class={styles.button}>Log Meal</button>
            </div>
        </div>
    )
}