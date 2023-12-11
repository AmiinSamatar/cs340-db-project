document.addEventListener("DOMContentLoaded", fetchCustomers);
document.addEventListener("DOMContentLoaded", fetchProducts);
document.addEventListener("DOMContentLoaded", fetchOrders);
document.getElementById("addCustomerForm").addEventListener("submit", addCustomer);
document.getElementById("addProductsForm").addEventListener("submit", addProducts);

function fetchCustomers() {
	fetch("/getCustomers")
		.then((response) => response.json())
		.then((customers) => {
			const customerList = document.getElementById("customerList");
			customerList.innerHTML = ""; // Clear existing customers
			customers.forEach((customer) => {
				const row = customerList.insertRow();
				row.innerHTML = `
                    <td>${customer.customer_id}</td>
                    <td>${customer.customer_name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm" onclick="editCustomer('${customer.customer_id}')">Edit</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteCustomer('${customer.customer_id}')">Delete</button>
                    </td>
                `;
			});
		});
}

// fetch products
function fetchProducts() {
	fetch("/getProducts")
		.then((response) => response.json())
		.then((products) => {
			const productList = document.getElementById("productList");
			// Clear existing products
			productList.innerHTML = "";
			products.forEach((product) => {
				const row = productList.insertRow();
				row.innerHTML = `
                    <td>${product.product_id}</td>
                    <td>${product.product_name}</td>
                    <td>${product.price}</td>
                    <td>${product.quantity_available}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm" onclick="editProduct('${product.product_id}')">Edit</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteProduct('${product.product_id}')">Delete</button>
                    </td>
                `;
			});
		});
}

// fetch orders
function fetchOrders() {
	fetch("/getOrders")
		.then((response) => response.json())
		.then((products) => {
			const orderList = document.getElementById("orderList");
			// Clear existing products
			orderList.innerHTML = "";
			products.forEach((order) => {
				const row = orderList.insertRow();
				row.innerHTML = `
                    <td>${order.order_id}</td>
					<td>${order.customer_id}</td>
                    <td>${order.order_date}</td>
                    <td>${order.total_amount}</td>
                    
                    <td>
						<button type="button" class="btn btn-success btn-sm" onclick="trackOrder('${order.order_id}')">Track Order</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="cancelOrder('${order.order_id}')">Cancel</button>
                    </td>
                `;
			});
		});
}

// fetch products order
function productOrders() {
	fetch("/getOrders")
		.then((response) => response.json())
		.then((products) => {
			const orderList = document.getElementById("orderList");
			// Clear existing products
			orderList.innerHTML = "";
			products.forEach((order) => {
				const row = orderList.insertRow();
				row.innerHTML = `
                    <td>${order.order_id}</td>
					<td>${order.customer_id}</td>
                    <td>${order.order_date}</td>
                    <td>${order.total_amount}</td>
                    
                    <td>
						<button type="button" class="btn btn-success btn-sm" onclick="trackOrder('${order.order_id}')">Track Order</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="cancelOrder('${order.order_id}')">Cancel</button>
                    </td>
                `;
			});
		});
}

function addCustomer(event) {
	event.preventDefault();
	const customer = {
		name: document.getElementById("name").value,
		email: document.getElementById("email").value,
		phone: document.getElementById("phone").value,
	};

	fetch("/addCustomer", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(customer),
	}).then(() => {
		fetchCustomers(); // Refresh customer list
		document.getElementById("addCustomerForm").reset();
	});
}

function addProducts(event) {
	event.preventDefault();
	const product = {
		product_name: document.getElementById("p_name").value,
		product_price: document.getElementById("price").value,
		quantity_available: document.getElementById("quantity").value,
	};

	fetch("/addProduct", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(product),
	}).then(() => {
		fetchProducts(); // Refresh customer list
		document.getElementById("addProductsForm").reset();
	});
}

function editCustomer(customer_id) {
	// Implement logic to edit a customer
	// This could involve displaying a modal or a separate form
}

function deleteCustomer(customer_id) {
	fetch(`/customers/${customer_id}`, { method: "DELETE" }).then(() => fetchCustomers()); // Refresh customer list after deletion
}

function deleteProduct(product_id) {
	// Refresh products list after deletion
	fetch(`/products/${product_id}`, { method: "DELETE" }).then(() => fetchProducts());
}

function trackOrder(order_id) {
	// // Refresh orders list after deletion
	// fetch(`/orders/${order_id}`, { method: "DELETE" }).then(() => fetchOrders());
}

function cancelOrder(order_id) {
	// // Refresh orders list after deletion
	// fetch(`/orders/${order_id}`, { method: "DELETE" }).then(() => fetchOrders());
}
