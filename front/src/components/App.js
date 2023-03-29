import React from "react";
import { render } from "react-dom";
import WeitherCard from "./WeatherCard";

const App = ()=>{
    return(
        <div className="center">
            <WeitherCard />
        </div>
    )
}

const appDiv = document.getElementById('app');

render(<App/>,appDiv);

export default App;