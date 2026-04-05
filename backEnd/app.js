const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mysqlConnection = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  database: "mydb",
});

mysqlConnection.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected to MySQL");
});

// ---------- CREATE TABLES (without product_category in Products) ----------
app.get("/install", (req, res) => {
  // Products table
  const createProducts = `CREATE TABLE IF NOT EXISTS Products(
    product_id INT AUTO_INCREMENT,
    product_url VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_category VARCHAR(255) NOT NULL,
    PRIMARY KEY (product_id)
  )`;

  // ProductDescription table
const createProductDescription = `CREATE TABLE IF NOT EXISTS ProductDescription(
    description_id INT AUTO_INCREMENT,
    product_id INT NOT NULL,
    product_brief_description VARCHAR(255) NOT NULL,
    product_description TEXT NOT NULL,
    product_img TEXT NOT NULL,  
    product_link TEXT NOT NULL, 
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
  )`;

  // ProductPrice table
  const createProductPrice = `CREATE TABLE IF NOT EXISTS ProductPrice(
    price_id INT AUTO_INCREMENT,
    product_id INT NOT NULL,
    starting_price VARCHAR(255) NOT NULL,
    price_range VARCHAR(255) NOT NULL,
    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
  )`;

  // ProductCategory table (optional, not linked to Products in this example)
  const createProductCategory = `CREATE TABLE IF NOT EXISTS ProductCategory(
    category_id INT AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (category_id)
  )`;

  mysqlConnection.query(createProducts, (err) => {
    if (err) console.log("Products error:", err);
  });
  mysqlConnection.query(createProductDescription, (err) => {
    if (err) console.log("ProductDescription error:", err);
  });
  mysqlConnection.query(createProductPrice, (err) => {
    if (err) console.log("ProductPrice error:", err);
  });
  mysqlConnection.query(createProductCategory, (err) => {
    if (err) console.log("ProductCategory error:", err);
  });

  res.send("Tables created/checked successfully. product_category removed from Products.");
});

// ---------- FIX DATABASE: drop problematic columns ----------
app.get("/fix-db", (req, res) => {
  const fixQuery = `ALTER TABLE Products MODIFY COLUMN product_price VARCHAR(255) NULL DEFAULT NULL`;
  mysqlConnection.query(fixQuery, (err) => {
    if (err) {
      // Column might not exist or already fixed
      return res.send("Fix attempted: " + err.message);
    }
    res.send("Database fixed! product_price column now has a default value.");
  });
});

// ---------- ADD PRODUCT (safe, no missing column error) ----------
app.post("/add-product", (req, res) => {
  const {
    product_name,
    product_url,
    product_category,
    product_brief_description,
    product_description,
    product_img,
    product_link,
    starting_price,
    price_range,
  } = req.body;

  // Insert into Products
  const insertProduct = `INSERT INTO Products (product_url, product_name, product_category) VALUES (?, ?, ?)`;
  mysqlConnection.query(insertProduct, [product_url, product_name, product_category], (err, result) => {
    if (err) {
      console.error("Products insert error:", err);
      return res.status(500).send("Error inserting product: " + err.message);
    }

    const productId = result.insertId;

    // Insert into ProductDescription
    const insertDesc = `INSERT INTO ProductDescription 
      (product_id, product_brief_description, product_description, product_img, product_link) 
      VALUES (?, ?, ?, ?, ?)`;
    mysqlConnection.query(
      insertDesc,
      [productId, product_brief_description, product_description, product_img, product_link],
      (err) => {
        if (err) {
          console.error("Description insert error:", err);
          return res.status(500).send("Error inserting description: " + err.message);
        }

        // Insert into ProductPrice
        const insertPrice = `INSERT INTO ProductPrice (product_id, starting_price, price_range) VALUES (?, ?, ?)`;
        mysqlConnection.query(insertPrice, [productId, starting_price, price_range], (err) => {
          if (err) {
            console.error("Price insert error:", err);
            return res.status(500).send("Error inserting price: " + err.message);
          }
          res.send("Product added successfully");
        });
      }
    );
  });
});

// ---------- GET ALL PRODUCTS (with JOIN) ----------
//  Category dinamic Route
app.get("/products/:category", (req, res) => {
  
  const categoryName = req.params.category;

  const query = `
    SELECT * FROM Products
    INNER JOIN ProductDescription ON Products.product_id = ProductDescription.product_id
    INNER JOIN ProductPrice ON Products.product_id = ProductPrice.product_id
    WHERE Products.product_category = ?
  `;

  // [categoryName] is used to safely insert the category into the query, preventing SQL injection  
  mysqlConnection.query(query, [categoryName], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "የዳታቤዝ ስህተት አጋጥሟል" });
    }
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "በዚህ ምድብ ምንም ምርት አልተገኘም" });
    }

    res.json({ 
      category: categoryName, 
      count: rows.length,
      products: rows 
    });
  });
});

// ---------- SERVE THE FRONTEND FORM (to avoid unsafe frame error) ----------
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Product Manager</title>
      <style>
        body { font-family: Arial; margin: 40px; }
        input, textarea { width: 300px; padding: 8px; margin: 5px 0; display: block; }
        button { padding: 10px 20px; background: blue; color: white; border: none; cursor: pointer; }
        .product { border: 1px solid #ccc; margin: 10px 0; padding: 10px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <h1>Product Manager</h1>
      
      <h2>Add New Product</h2>
      <form id="productForm">
        <input type="text" name="product_name" placeholder="Product Name" required>
        <input type="text" name="product_url" placeholder="Product URL" required>
        <input type="text" name="product_brief_description" placeholder="Brief Description" required>
        <textarea name="product_description" placeholder="Full Description" required></textarea>
        <input type="text" name="product_img" placeholder="Image URL" required>
        <input type="text" name="product_link" placeholder="Product Link" required>
        <input type="text" name="starting_price" placeholder="Starting Price" required>
        <input type="text" name="price_range" placeholder="Price Range" required>
        <button type="submit">Submit</button>
      </form>
      <div id="message"></div>

      <h2>All Products</h2>
      <button id="loadBtn">Load Products</button>
      <div id="products"></div>

      <script>
        // Add product
        document.getElementById('productForm').onsubmit = async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const response = await fetch('/add-product', {
            method: 'POST',
            body: new URLSearchParams(formData)
          });
          const msg = await response.text();
          document.getElementById('message').innerHTML = \`<p style="color:green">\${msg}</p>\`;
          e.target.reset();
        };

        // Load products
        document.getElementById('loadBtn').onclick = async () => {
          const res = await fetch('/iphones');
          const data = await res.json();
          const productsDiv = document.getElementById('products');
          if (data.products && data.products.length) {
            productsDiv.innerHTML = data.products.map(p => \`
              <div class="product">
                <h3>\${p.product_name}</h3>
                <p>\${p.product_description}</p>
                <p>Price: \${p.starting_price} - \${p.price_range}</p>
                <a href="\${p.product_link}" target="_blank">View Details</a>
              </div>
            \`).join('');
          } else {
            productsDiv.innerHTML = "<p>No products found.</p>";
          }
        };
      </script>
    </body>
    </html>
  `);
});

// ---------- START SERVER ----------
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});


