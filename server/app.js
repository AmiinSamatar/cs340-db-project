const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const cors = require("cors");
const PORT = 2352;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public"))); // Serve static files correctly
app.use(cors());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// ... rest of your code ...

// // Fetch all customers
// app.get("/customers", (req, res) => {
// 	db.query("SELECT * FROM customers", (err, results) => {
// 		if (err) throw err;
// 		res.json(results);
// 	});
// });

// Customers
app.get("/getCustomers", (req, res) => {
	const query = "SELECT * FROM customers";
	db.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching customer data:", err);
			res.status(500).json({ error: "Error fetching customer data" });
		} else {
			res.json(results);
		}
	});
});

// Products
app.get("/getProducts", (req, res) => {
	const query = "SELECT * FROM products";
	db.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching product data:", err);
			res.status(500).json({ error: "Error fetching product data" });
		} else {
			res.json(results);
		}
	});
});

// Orders
app.get("/getOrders", (req, res) => {
	const query = "SELECT * FROM orders";
	db.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching order data:", err);
			res.status(500).json({ error: "Error fetching order data" });
		} else {
			res.json(results);
		}
	});
});

// Order Products
app.get("/getOrderProducts", (req, res) => {
	const query = "SELECT * FROM order_products";
	db.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching order product data:", err);
			res.status(500).json({ error: "Error fetching order product data" });
		} else {
			res.json(results);
		}
	});
});

// Add a new customer
app.post("/addCustomer", (req, res) => {
	const { name, email, phone } = req.body;
	db.query(
		"INSERT INTO customers (customer_name, email, phone) VALUES (?, ?, ?)",
		[name, email, phone],
		(err, result) => {
			if (err) {
				console.error("Error adding customer:", err);
				res.status(500).json({ error: "Error adding customer" });
			} else {
				res.status(201).send("Customer added");
			}
		}
	);
});

// Add a product
app.post("/addProduct", (req, res) => {
	const { product_name, product_price, quantity_available } = req.body;
	db.query(
		"INSERT INTO products (product_name, price, quantity_available) VALUES (?, ?, ?)",
		[product_name, product_price, quantity_available],
		(err, result) => {
			if (err) {
				console.error("Error adding product:", err);
				res.status(500).json({ error: "Error adding product" });
			} else {
				res.status(201).send("Product added");
			}
		}
	);
});

// Update a customer
app.put("/customers/:id", (req, res) => {
	const { name, email, phone } = req.body;
	db.query(
		"UPDATE customers SET customer_name = ?, email = ?, phone = ? WHERE customer_id = ?",
		[name, email, phone, req.params.id],
		(err, result) => {
			if (err) throw err;
			res.send("Customer updated");
		}
	);
});

// Delete a customer
app.delete("/customers/:id", (req, res) => {
	db.query("DELETE FROM customers WHERE customer_id = ?", [req.params.id], (err, result) => {
		if (err) throw err;
		res.send("Customer deleted");
	});
});

// Delete a product
app.delete("/products/:id", (req, res) => {
	db.query("DELETE FROM products WHERE product_id = ?", [req.params.id], (err, result) => {
		if (err) throw err;
		res.send("Product deleted");
	});
});

// // Cancel an Order and track an order are coming soon
// app.delete("/orders/:id", (req, res) => {
// 	db.query("DELETE FROM orders WHERE order_id = ?", [req.params.id], (err, result) => {
// 		if (err) throw err;
// 		res.send("Product deleted");
// 	});
// });

// Start server
/*
	LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
	console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});