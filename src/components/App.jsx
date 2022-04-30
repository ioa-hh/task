import React, {useEffect, useState} from "react";
import "./App.scss";
import jsonp from "jsonp";

export const App = () => {

    //console.log("testObj: ", testObj);

    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (city.length > 0) {
            jsonp(`https://kladr-api.ru/api.php?contentType=city&query=${city}&limit=10`, (error, data) => {
                if (error) {
                    console.error(error);
                } else {
                    setCities(data.result.slice(1));
                }
            })
        } else {
            setCities([]);
        }
    }, [city])

    const onChangeCityInput = (event) => {

        if (event.target.value.length > 0) {
            setShowPopup(true);
        } else {
            setShowPopup(false);
        }

        setCity(event.target.value);
    }

    const onCityClick = (cityName) => {
        setCity(cityName);
        setShowPopup(false);
    }

    const citiesList = cities.map(city => {
        return (
            <div onClick={() => onCityClick(city.name)}
                 key={city.id}
                 className="autocomplete__item"
            >
                {city.name}
            </div>
        );
    })

    return (
        <div className="wrapper">
            <div className="form">
                <div className="form__city">

                    <div className="form__label">Город:</div>

                    <div className="form__input">

                        <input type="text"
                               value={city}
                               onChange={onChangeCityInput}/>

                        {showPopup &&
                            <div className="form__popup autocomplete">
                                {citiesList}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

const testObj = {
    a: 1,
    b: 2,
    c: 3,
    d: [
        "hi",
        "hello"
    ],

    str: "Bye",
    boolVal: false,

    miniObj: {
        a: 0,
        b: -1,
    },

    objectsArray: [
        {a: 2, field: {a: 2, b: 3}},
        {a: 2, megaField: {a: 2, b: 3, c: 4}},
    ]
}

const capitalizeAllFields = (obj) => {

    for (let key in obj) {
        let upperKey = key.toUpperCase();
        obj[upperKey] = obj[key];
        delete obj[key];

        if (typeof obj[upperKey] === "object" && Object.keys(obj[upperKey]).length > 0) {

            if (Array.isArray(obj[upperKey])) {
                obj[upperKey].forEach((item, index) => {

                    if (typeof item === "string") {
                        obj[upperKey][index] = item.toUpperCase();
                    } else {
                        capitalizeAllFields(item);
                    }
                })
            } else {
                capitalizeAllFields(obj[upperKey]);
            }
        }
    }
}

capitalizeAllFields(testObj)