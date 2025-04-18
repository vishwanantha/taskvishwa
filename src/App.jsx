
import React, { useState, useEffect } from 'react';
import Modal from './Components/Modal';
import ProductList from './Components/ProductList';
import ProductForm from './Components/ProductForm';

function App() {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (product) => {
    try {
      const response = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async (product) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${product.id}`, {
        method: 'PATCH', // Changed from PUT to PATCH
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const updatedProduct = await response.json();
      setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE',
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProductClick = () => {
    setIsFormOpen(true);
    setEditingProduct(null);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };
 
  return (
    <div className="app-container">
      <header className="header">
        <h1>Product Management</h1>
        <button className="btn btn-add" onClick={handleAddProductClick}>
          Add Product
        </button>
      </header>

      <ProductList
        products={products}
        onEdit={openEditForm}
        onDelete={handleDeleteProduct}
      />

      {isFormOpen && !editingProduct && (
        <Modal onClose={() => setIsFormOpen(false)}>
          <ProductForm
            onSubmit={handleAddProduct}
            onCancel={() => setIsFormOpen(false)}
          />
        </Modal>
      )}

      {isFormOpen && editingProduct && (
        <Modal onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}>
          <ProductForm
            product={editingProduct}
            onSubmit={handleEditProduct}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingProduct(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;






// import React, { useState } from 'react'

// import Modal from './Components/Modal'

// import ProductList from './Components/ProductList'
// import ProductForm from './Components/ProductForm'
// function App() {
//   const [products, setProducts] = useState([
//     {
//       id: "1",
//       name: "Apple",
//       price: 1.99,
//       oldPrice: 2.49,
//       category: "Fruits & Nuts",
//       isActive: true,
//       description: "Fresh red apples from local farms.",
//     },
//     {
//       id: "2",
//       name: "Banana",
//       price: 0.99,
//       oldPrice: 1.29,
//       category: "Fruits & Nuts",
//       isActive: true,
//       description: "Organic yellow bananas.",
//     },
//     {
//       id: "3",
//       name: "Carrot",
//       price: 1.49,
//       oldPrice: 1.79,
//       category: "Vegetables",
//       isActive: true,
//       description: "Crunchy orange carrots, perfect for salads.",
//     },
//   ])

//   const [isFormOpen, setIsFormOpen] = useState(false)
//   const [editingProduct, setEditingProduct] = useState(null)

//   const handleAddProduct = (product) => {
//     const newProduct = { ...product, id: Date.now().toString() }
//     setProducts([...products, newProduct])
//     setIsFormOpen(false)
//   }

//   const handleEditProduct = (product) => {
//     setProducts(products.map((p) => (p.id === product.id ? product : p)))
//     setEditingProduct(null)
//   }

//   const handleDeleteProduct = (id) => {
//     setProducts(products.filter((product) => product.id !== id))
//   }

//   const handleAddProductClick = () => {
//     setIsFormOpen(true)
//     setEditingProduct(null) 
//   }

//   const openEditForm = (product) => {
//     setEditingProduct(product)
//     setIsFormOpen(true) 
//   }


  
//   return (
//     <div className="app-container">
//       <header className="header">
//         <h1>Product Management</h1>
//         <button className="btn btn-add" onClick={handleAddProductClick}>
//           Add Product
//         </button>
//       </header>
 
//       <ProductList      
//         products={products} 
//         onEdit={openEditForm} 
//         onDelete={handleDeleteProduct} 
//       />


//   {isFormOpen && !editingProduct && (
//     <Modal onClose={() => setIsFormOpen(false)}>
//       <ProductForm 
//         onSubmit={handleAddProduct} 
//         onCancel={() => setIsFormOpen(false)} 
//       />
//     </Modal>
//   )}
  
//   {isFormOpen && editingProduct && (
//     <Modal onClose={() => {
//       setIsFormOpen(false)
//       setEditingProduct(null)
//     }}>
//       <ProductForm 
//         product={editingProduct}
//         onSubmit={handleEditProduct}
//         onCancel={() => {
//           setIsFormOpen(false)
//           setEditingProduct(null)
//         }}
//       />
//     </Modal>
//   )}
  
//     </div>
//   )
// }

// export default App
//    {/*   {isFormOpen && (
//         <ProductForm 
//           onSubmit={handleAddProduct} 
//           onCancel={() => setIsFormOpen(false)} 
//         />
//       )}

//       {editingProduct && (
//         <ProductForm 
//           product={editingProduct} 
//           onSubmit={handleEditProduct} 
//           onCancel={() => setEditingProduct(null)} 
//         />
//       )}
//        */}