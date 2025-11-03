const apiBase = "http://localhost:2026/api/products";

document.addEventListener("DOMContentLoaded", fetchProducts);

function fetchProducts() {
    fetch(apiBase)
        .then(res => res.json())
        .then(products => {
            const body = document.getElementById("productTableBody");
            body.innerHTML = "";
            let counter = 0;
            products.forEach(product => {
                body.innerHTML += `
                    <tr class="text-center">
                        <td class="border p-2">${++counter}</td>
                        <td class="border p-2">${product.name}</td>
                        <td class="border p-2">${product.description}</td>
                        <td class="border p-2">${product.stock}</td>
                        <td class="border p-2">${product.unit}</td>
                        <td class="border p-2">${product.price}</td>
                        <td class="border p-2">
                            <button onclick="openEditModal(${product.id}, '${product.name}', '${product.description}', ${product.stock}, '${product.unit}', ${product.price})" 
                                class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                            <button onclick="deleteProduct(${product.id})" 
                                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                        </td>
                    </tr>`;
            });
        })
        .catch(err => console.error("Fetch products error:", err));
}

function openCreateModal() {
    document.getElementById("productForm").reset();
    document.getElementById("productId").value = "";
    document.getElementById("modalTitle").innerText = "Add Product";
    document.getElementById("productModal").classList.remove("hidden");
}

function openEditModal(id, name, description, stock, unit, price) {
    document.getElementById("productId").value = id;
    document.getElementById("productname").value = name;
    document.getElementById("productdescription").value = description;
    document.getElementById("productstock").value = stock;
    document.getElementById("productunit").value = unit;
    document.getElementById("productprice").value = price;
    document.getElementById("modalTitle").innerText = "Edit Product";
    document.getElementById("productModal").classList.remove("hidden");
}

function closeModal() {
    const modal = document.getElementById("productModal");
    modal.classList.add("hidden");

    const errorFields = ["Name", "Description", "Stock", "Unit", "Price"];
    errorFields.forEach(field => {
        const errorEl = document.getElementById(`error${field}`);
        if (errorEl) {
            errorEl.innerText = "";
            errorEl.classList.remove("text-red-500", "text-sm");
        }
    });

    document.getElementById("productForm").reset();
}


function saveProduct(e) {
    e.preventDefault();
    const id = document.getElementById("productId").value;
    const name = document.getElementById("productname").value;
    const description = document.getElementById("productdescription").value;
    const stock = parseInt(document.getElementById("productstock").value);
    const unit = document.getElementById("productunit").value;
    const price = parseFloat(document.getElementById("productprice").value);

    const product = { name, description, stock, unit, price };
    const method = id ? "PUT" : "POST";
    const url = id ? `${apiBase}/${id}` : apiBase;

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
        .then(async res => {
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw errorData;
            }
            return res.json();
        })
        .then(() => {
            closeModal();
            fetchProducts();
        })
        .catch(async err => {
        console.error("Save product error:", err);

        const errorFields = ["Name", "Description", "Stock", "Unit", "Price"];
        errorFields.forEach(field => {
            const errorEl = document.getElementById(`error${field}`);
            if (errorEl) {
                errorEl.innerText = "";
                errorEl.classList.remove("text-red-500");
            }
        });

        let errorData = {};
        try {
            errorData = await err.json?.() || err;
        } catch {
            errorData = err;
        }

        for (const [field, message] of Object.entries(errorData)) {
            const fieldCapitalized = field.charAt(0).toUpperCase() + field.slice(1);
            const errorEl = document.getElementById(`error${fieldCapitalized}`);
            if (errorEl) {
                errorEl.innerText = message;
                errorEl.classList.add("text-red-500", "text-sm");
            }
        }
    });

}

function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;
    fetch(`${apiBase}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error("Failed to delete product");
            fetchProducts();
        })
        .catch(err => console.error("Delete product error:", err));
}
