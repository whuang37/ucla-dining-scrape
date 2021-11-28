import FoodList from "./FoodList";
import FilterBar from "./FilterBar";
import NavBar from "../navbar"

export default function Page(props) {
    return (
        <div>
            <NavBar/>
            <FilterBar/>
            <div>
                <FoodList meal="Breakfast" hall="De Neve"/>
            </div>
        </div>
    )
}