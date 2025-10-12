document.addEventListener("DOMContentLoaded", fetchCars);

const apiUrl = "http://localhost:2020/api";

// =================== FETCH CARS ===================
function fetchCars() {
  fetch(`${apiUrl}/cars`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch cars");
          return res.json();
        })
        .then(cars => {
          const tbody = document.getElementById("carTableBody");
          tbody.innerHTML = "";

          cars.forEach((car) => {
            const row = document.createElement('tr');
            row.className = 'border-b border-gray-200';
            row.innerHTML = `
              <td class="px-6 py-4 text-center text-orange-500 font-bold">${car.id}</td>
              <td class="px-6 py-4 text-center text-gray-700">${car.licensePlate}</td>
              <td class="px-6 py-4 text-center text-gray-700">${car.make}</td>
              <td class="px-6 py-4 text-center text-gray-700">${car.model}</td>
              <td class="px-6 py-4 text-center text-gray-700">${car.year}</td>
              <td class="px-6 py-4 text-center text-gray-700">${car.color}</td>
              <td class="px-6 py-4 text-center text-gray-700">${car.bodyType}</td>
              <td class="px-6 py-4 text-center text-gray-700">${car.engineType}</td>
              <td class="px-6 py-4 text-center text-gray-700">${car.transmission}</td>
              <td class="px-6 py-4 text-center">
                <button onclick="editCar(${car.id})"
                  class="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold mr-2">
                  Edit
                </button>
                <button onclick="deleteCar(${car.id})"
                  class="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                  Delete
                </button>
              </td>
            `;
            tbody.appendChild(row);
          });
        })
        .catch(err => console.error("Error fetching cars:", err));
    };

// =================== MODAL ===================
function openModal() {
  document.getElementById("formSection").classList.remove("hidden");
  document.getElementById("modalTitle").innerText = "Add New Car";
  document.getElementById("carForm").reset();
  document.getElementById("carId").value = "";
}

function closeModal() {
  document.getElementById("formSection").classList.add("hidden");
}

// =================== SAVE CAR ===================
function saveCar(event) {
  event.preventDefault();

  const car = {
    id: document.getElementById("carId").value,
    make: document.getElementById("make").value,
    model: document.getElementById("model").value,
    year: document.getElementById("year").value,
    licensePlate: document.getElementById("licensePlate").value,
    color: document.getElementById("color").value,
    bodyType: document.getElementById("bodyType").value,
    engineType: document.getElementById("engineType").value,
    transmission: document.getElementById("transmission").value
  };

  const method = car.id ? "PUT" : "POST";
  const url = car.id ? `${apiUrl}/cars/${car.id}` : `${apiUrl}/cars`;

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car)
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to save car");
      return res.json();
    })
    .then(() => {
      closeModal();
      fetchCars();
    })
    .catch(err => console.error("Error saving car:", err));
}

// =================== EDIT CAR ===================
function editCar(id) {
  fetch(`${apiUrl}/cars/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch car");
      return res.json();
    })
    .then(car => {
      openModal();
      document.getElementById("modalTitle").innerText = "Edit Car";
      document.getElementById("carId").value = car.id;
      document.getElementById("make").value = car.make;
      document.getElementById("model").value = car.model;
      document.getElementById("year").value = car.year;
      document.getElementById("licensePlate").value = car.licensePlate;
      document.getElementById("color").value = car.color;
      document.getElementById("bodyType").value = car.bodyType;
      document.getElementById("engineType").value = car.engineType;
      document.getElementById("transmission").value = car.transmission;
    })
    .catch(err => console.error("Error editing car:", err));
}

// =================== DELETE CAR ===================
function deleteCar(id) {
  if (!confirm("Are you sure you want to delete this car?")) return;

  fetch(`${apiUrl}/cars/${id}`, { method: "DELETE" })
    .then(res => {
      if (!res.ok) throw new Error("Failed to delete car");
      fetchCars();
    })
    .catch(err => console.error(err));
}
