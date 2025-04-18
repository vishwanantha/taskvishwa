import React from 'react';
import './ProductList.css'; // Create this CSS file

function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p className="no-products">No products found. Add a product to get started.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={`product-card ${product.isActive ? 'active' : 'inactive'}`}
            >
              <h3>{product.name}</h3>
              <p><strong>Price:</strong> ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
              {product.oldPrice && (
                <p className="old-price">
                  <strong>Old Price:</strong> ${typeof product.oldPrice === 'number' ? product.oldPrice.toFixed(2) : product.oldPrice}
                </p>
              )}
              <p><strong>Category:</strong> {product.category}</p>
              <p className="description">{product.description}</p>
              <div className={`status ${product.isActive ? 'active' : 'inactive'}`}>
                {product.isActive ? "Active" : "Inactive"}
              </div>
              <div className="product-actions">
                <button className="btn btn-edit" onClick={() => onEdit(product)}>Edit</button>
                <button className="btn btn-delete" onClick={() => onDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;                                            