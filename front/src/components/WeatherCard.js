import React from "react";

const WeitherCard = ()=>{

    const [weitherTemp, setWeitherTemp] = React.useState('Loading');
    const [weitherFeels, setWeitherFeels] = React.useState('Loading');
    const [weitherTemp_min, setWeitherTemp_min] = React.useState('Loading');
    const [weitherTemp_max, setweitherTemp_max] = React.useState('Loading');
    const [weitherPressure, setweitherPressure] = React.useState('Loading');
    const [weitherhum, setWeitherhum] = React.useState('Loading');
    const [descr, setDescr] = React.useState('Loading');
    const [cityL, setCityL] = React.useState('Rubavu');
    const [city, setCity] = React.useState(null);
    const [unit, setUnit] = React.useState('°C');
    const [icon, setIcon] = React.useState(null);

    React.useEffect(()=>{
        tempConv()
    },[unit]);

    function citySub(){
        setCity('Loading');
        setDescr('Loading');
        setweitherPressure('Loading');
        setWeitherhum('Loading');
        setWeitherTemp('Loading');
        setWeitherFeels('Loading');
        setWeitherTemp_min('Loading');
        setweitherTemp_max('Loading');
        fetch(`/api?city=${cityL}`).then(res => res.json())
        .then(data => {
            const main = data.main;
            setCity(data.city);
            setDescr(data.description);
            setIcon(data.icon);
            setweitherPressure(main.pressure);
            setWeitherhum(main.humidity);
            setWeitherTemp(main.temp);
            setWeitherFeels(main.feels_like);
            setWeitherTemp_min(main.temp_min);
            setweitherTemp_max(main.temp_max);
        });
    }

    function tempConv(){
        if(descr ==='Loading'){
            citySub();
        }
        else{
            if(unit ==='°F'){
                setWeitherTemp(((weitherTemp*1.8)+32).toFixed(3));
                setWeitherFeels(((weitherFeels*1.8)+32).toFixed(3));
                setWeitherTemp_min(((weitherTemp_min*1.8)+32).toFixed(3));
                setweitherTemp_max(((weitherTemp_max*1.8)+32).toFixed(3));  
            }
            else{
                setWeitherTemp(((weitherTemp-32)*(5/9)).toFixed(2));
                setWeitherFeels(((weitherFeels-32)*(5/9)).toFixed(2));
                setWeitherTemp_min(((weitherTemp_min-32)*(5/9)).toFixed(2));
                setweitherTemp_max(((weitherTemp_max-32)*(5/9)).toFixed(2));  
            }
        }
    }

    return(
<section className="vh-100">
  <div className="container py-5 h-100">

    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-8 col-lg-6 col-xl-4">

        <h3 className="mb-4 pb-2 fw-normal">Check the weather forecast</h3>

        <div className="input-group rounded mb-3">
          <input type="search" className="form-control rounded" placeholder="City" aria-label="Search"
            aria-describedby="search-addon" onChange={(e)=> setCityL(e.target.value) } />
          <button onClick={citySub}>
            <span className="input-group-text border-0 fw-bold" id="search-addon">
              Check!
            </span>
          </button>
        </div>

        <div className="mb-4 pb-2">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
              value='°C' onChange={(e) => setUnit(e.target.value)}/>
            <label className="form-check-label" htmlFor="inlineRadio1">Celsius</label>
          </div>

          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
              value='°F'  onChange={(e) => setUnit(e.target.value)}/>
            <label className="form-check-label" htmlFor="inlineRadio2">Farenheit</label>
          </div>
        </div>

        <div className="card shadow-0 border">
          <div className="card-body p-4">

            <h4 className="mb-1 sfw-normal">{city != null ? city : cityL}</h4>
            <p className="mb-2">Current temperature: <strong>{weitherTemp+unit}</strong></p>
            <p>Feels like: <strong>{weitherFeels+unit}</strong></p>
            <p>Max: <strong>{weitherTemp_max+unit}</strong>, Min: <strong>{weitherTemp_min+unit}</strong></p>

            <div className="d-flex flex-row align-items-center">
              <p className="mb-0 me-4">{descr}</p>
              <img src={icon}></img>
            </div>

          </div>
        </div>

      </div>
    </div>

  </div>
</section>

    )
}

export default WeitherCard;