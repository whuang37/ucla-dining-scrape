import FilteredList from "./FilteredList";
import NavBar from "../navbar"
import styles from "./Page.module.css";

export default function Page() {
    return (
        <div>
            <NavBar/>
            <FilteredList/>
        </div>
    )
}