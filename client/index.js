const list = document.querySelector("#list");
var headers = new Headers();
var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

fetch(`http://localhost:5000/person/getPerson`, requestOptions)
    .then(response => response.json())
    .then(result => {
        const html2 = result.map(
            (person, index) => {
                return `
                        <li class="my-1"> 
                        <div class="row">
                        <div class="col-2">
                        ${person.firstname} ${person.lastname}
                        </div>
                        <div class="col-2">
                        ${person.gender}
                        </div>
                        <div class="col-2">
                        ${person.age}
                        </div>
                        <div class="col-2">
                        ${person.city}, ${person.state}, ${person.country}
                        </div>
                        </div>
                        </li>
			        `;
            }
        ).join("")
        list.innerHTML = html2;
        console.log(result);
    })