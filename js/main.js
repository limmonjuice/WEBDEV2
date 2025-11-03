const apiBase = "http://localhost:2025/api/products"

document.addEventListener("DOMContentLoaded", fetchproducts)

function fetchProducts() {
    fetch(apiBase)
        .then(res => res.json())
        .then(products => {
            const body = document.getElementById("productTableBody")
            body.innerHTML = ""
            var counter = 0;
            products.forEach(product => {
                body.innerHTML += `
              <tr class="text-center">
                <td class="border p-2">${++counter}</td>
                <td class="border p-2">${product.name}</td>
                <td class="border p-2">${product.description}</td>
                <td class="border p-2">
                  <button onclick="openEditModal(${product.id}, '${product.name}', '${product.description}', ${product.stock}, '${product.unit}')" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                  <button onclick="deleteproduct(${product.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>`
            })
        })
        .catch(err => console.error(err))
}

function openCreateModal() {
    document.getElementById("productForm").reset()
    document.getElementById("productId").value = ""
    document.getElementById("modalTitle").innerText = "Add product"
    document.getElementById("productModal").classList.remove("hidden")
}

function openEditModal(id, name, description, stock, unit) {
    document.getElementById("productId").value = id
    document.getElementById("productname").value = name
    document.getElementById("productdescription").value = description
    document.getElementById("modalTitle").innerText = "Edit product"
    document.getElementById("productModal").classList.remove("hidden")
}

function closeModal() {
    document.getElementById("productModal").classList.add("hidden")
}

function saveproduct(e) {
    e.preventDefault()
    const id = document.getElementById("productId").value
    const name = document.getElementById("productname").value
    const description = document.getElementById("productdescription").value

    const product = { name, description, stock, unit }
    const method = id ? "PUT" : "POST"
    const url = id ? `${apiBase}/${id}` : apiBase

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
        .then(res => res.json())
        .then(() => {
            closeModal()
            fetchproducts()
        })
        .catch(err => console.error(err))
}

function deleteproduct(id) {
    if (!confirm("Delete this product?")) return
    fetch(`${apiBase}/${id}`, { method: "DELETE" })
        .then(() => fetchproducts())
        .catch(err => console.error(err))
}
