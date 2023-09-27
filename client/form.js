var age = 0;
let dob = "";
function calculateAge(date) {
    const now = new Date();
    const diff = Math.abs(now - date);
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    return age
}

var picker = new Pikaday({
    field: document.getElementById('birth_date'),
    yearRange: [1900, 2020],
    onSelect: function (date) {
        dob = date;
        age = calculateAge(date);
        document.getElementById('age').innerHTML = "Age: " + age;
    }
});

//Country
const country = document.querySelector("#country");
let countryName = "";
let iso2Country = "";
const handleCountryChange = (e) => {
    countryName = e.options[e.selectedIndex].text;
    iso2Country = e.value;
    fillStates(e.value);
}

var headers = new Headers();
headers.append("X-CSCAPI-KEY", "a1VGQ1VCbWZhTkpEbnJOUmJISHpXUjZ2OFVud2NQWXVGUmFrVnNVMA==");

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    .then(response => response.json())
    .then(result => {
        var html;
        result.map((element, index) => {
            html += `<option value="${element.iso2}">${element.name}</option>`
        })
        country.innerHTML = html;
    })
    .catch(error => console.log('error', error));

//State

const state = document.querySelector("#state");
let iso2State = "";
let stateName = "";
const handleStateChange = (e) => {
    iso2State = e.value;
    stateName = e.options[e.selectedIndex].text;
    fillCities(iso2Country, iso2State)
}

const fillStates = (code) => {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "a1VGQ1VCbWZhTkpEbnJOUmJISHpXUjZ2OFVud2NQWXVGUmFrVnNVMA==");

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch(`https://api.countrystatecity.in/v1/countries/${code}/states`, requestOptions)
        .then(response => response.json())
        .then(result => {
            var html;
            result.map((element, index) => {
                html += `<option value="${element.iso2}">${element.name}</option>`
            })
            state.innerHTML = html;
        })
        .catch(error => console.log('error', error));
}

//City

const city = document.querySelector("#city");
let cityName = "";
const handleCityChange = (e) => {
    cityName = e.value;
}

const fillCities = (code1, code2) => {

    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "a1VGQ1VCbWZhTkpEbnJOUmJISHpXUjZ2OFVud2NQWXVGUmFrVnNVMA==");

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch(`https://api.countrystatecity.in/v1/countries/${code1}/states/${code2}/cities`, requestOptions)
        .then(response => response.json())
        .then(result => {
            var html;
            result.map((element, index) => {
                html += `<option value="${element.name}">${element.name}</option>`
            })
            city.innerHTML = html;
        })
        .catch(error => console.log('error', error));
}

//form-submission

const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const gender = document.querySelectorAll('input[name="gender"]');

const handleSubmit = async () => {

    if (age < 14) {
        alert("Older than 14")
        return;
    }
    if (countryName == "") {
        alert("Fill out Country");
        return;
    }
    if (stateName == "") {
        alert("Fill out State");
        return;
    }
    if (cityName == "") {
        alert("Fill out city");
        return;
    }
    let selectedGender = ""
    for (const radioButton of gender) {
        if (radioButton.checked) {
            selectedGender = radioButton.value;
            break;
        }
    }

    const body = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        country: countryName,
        state: stateName,
        city: cityName,
        gender: selectedGender,
        dob: dob,
        age: age
    }

    try {
        const rawResponse = await fetch('http://localhost:5000/person/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const content = await rawResponse.json();
        if(content.errors){
            alert(`${content.errors[0].msg}`)
        }else{
            window.location.href="index.html"
        }
    } catch (error) {
        console.log(error);
    }

}

//back button

const back=()=>{
    window.location.href="index.html"
}
