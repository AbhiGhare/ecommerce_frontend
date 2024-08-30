import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product'; // Import the Product component

const TrendingProductArea = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        console.log(response.data,'product detat');
        
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="trending-product section" style={{ marginTop: '12px' }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>Trending Product</h2>
              <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map((product) => (
            <Product
              key={product._id}
              id={product._id}
              image={product.image}
              category={product.category}
              title={product.name}
              reviews={5} // You may need to adjust this based on your actual review data
              price={product.price}
              discountPrice={product.price > 500 ? `${product.price - 50}` : undefined} // Example condition for discount
              saleTag={product.price > 500 ? '-10%' : undefined} // Example condition for sale tag
              newTag={product.stock < 5 ? 'New' : undefined} // Example condition for new tag
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProductArea;
