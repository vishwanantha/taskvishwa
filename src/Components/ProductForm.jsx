import React, { useState, useEffect } from 'react'

function ProductForm({ product = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: product.name || '',
    price: product.price || '',
    oldPrice: product.oldPrice || '',
    category: product.category || '',
    isActive: product.isActive !== undefined ? product.isActive : true,
    description: product.description || '',
  })

  const categories = [
    'Vegetables',
    'Fruits & Nuts',
    'Dairy & Creams',
    'Packaged Food',
    'Staples',
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onSubmit(formData)
//   }
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null
    });
  };
  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
      })
    }
  }, [product])

  return (
    <div className="product-form">
      <h2>{product.id ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Old Price</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-submit">
            {product.id ? "Save Changes" : "Add Product"}
          </button>
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
