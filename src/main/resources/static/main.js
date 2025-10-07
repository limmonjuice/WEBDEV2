document.addEventListener("DOMContentLoaded", loadCars);

var apiUrl = 'http://localhost:2020/api';

function loadCars(){
    fetch(`${apiUrl}/cars`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("carTableBody");
            tbody.innnerHTML = ""
            data.forEach(car => {
                var counter = 0;
                tbody.innerHTML +=
                    <tr>
                    <td>${car.id}</td>
                    <td>${car.make}</td>
                    <td>${car.model}</td>
                    <td>${car.year}</td>
                    <td>${car.color}</td>
                    <td>${car.bodyType}</td>
                    <td>${car.engineType}</td>
                    <td>${car.licensePlate}</td>
                    <td>${car.transmission}</td>
                    <td>
                        <button onclick="editCar(${car.id})">Edit</button>
                        <button onclick="deleteCar(${car.id})">Delete</button>
                    </td>
                </tr>
            `;
        })
    })
}

function deleteCar(id) {
            if (confirm("Are you sure you want to delete this car?")) {
                fetch(`${API_URL}/${id}`,
                { method: "DELETE" })
                    .then(() => loadCars());
            }
        }