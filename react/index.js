const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
  
  // Make sure bodyParser is properly configured
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));



const productsFilePath = path.join(__dirname, 'products.json');


let products = [];


try {
  const data = fs.readFileSync(productsFilePath, 'utf8');
  products = JSON.parse(data);
} catch (err) {
  if (err.code === 'ENOENT') {
   
    products = [
      {
        id: "1",
        name: "Apple",
        price: 1.99,
        oldPrice: 2.49,
        category: "Fruits & Nuts",
        isActive: true,
        description: "Fresh red apples from local farms.",
      },
      {
        id: "2",
        name: "Banana",
        price: 0.99,
        oldPrice: 1.29,
        category: "Fruits & Nuts",
        isActive: true,
        description: "Organic yellow bananas.",
      },
      {
        id: "3",
        name: "Carrot",
        price: 1.49,
        oldPrice: 1.79,
        category: "Vegetables",
        isActive: true,
        description: "Crunchy orange carrots, perfect for salads.",
      },
    ];

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  } else {
    console.error('Error reading products file:', err);
  }
}

// Helper function to save products to file
function saveProductsToFile() {
  fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
    if (err) {
      console.error('Error saving products:', err);
    }
  });
}

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});



// Create new product
app.post('/api/products', (req, res) => {
  // Validate price is a number
  if (isNaN(req.body.price)) {
    return res.status(400).json({ message: 'Price must be a number' });
  }
  
 
    const newProduct = { 
        name: req.body.name,
        price: Number(req.body.price),
        oldPrice: req.body.oldPrice ? Number(req.body.oldPrice) : null,
        category: req.body.category || '', 
        isActive: req.body.isActive !== undefined ? req.body.isActive : true, 
        description: req.body.description || '', 
        id: Date.now().toString() 
      };
  
  
  products.push(newProduct);
  saveProductsToFile();
  res.status(201).json(newProduct);
});

// Update product
app.patch('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  
  // Convert prices to numbers if needed
  if (req.body.price) req.body.price = Number(req.body.price);
  if (req.body.oldPrice) req.body.oldPrice = Number(req.body.oldPrice);
  
  products[index] = { ...products[index], ...req.body };
  saveProductsToFile();
  res.json(products[index]);
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  saveProductsToFile();
  res.json({ message: 'Product deleted successfully' });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Products data will be saved to: ${productsFilePath}`);
});