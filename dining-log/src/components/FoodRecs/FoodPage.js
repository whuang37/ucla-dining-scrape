import FoodList from "./FoodItem";
import FilterBar from "./FilterBar";

export default function Page(props) {
    return (
        <div>
            <FilterBar/>
            <FoodList meal="Breakfast" hall="De Neve"/>
        </div>
    )
}