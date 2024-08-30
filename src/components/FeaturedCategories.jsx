import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';

// import './FeaturedCategories.css'; // Ensure to include any necessary styles
import p1 from '../assets/images/featured-categories/fetured-item-1.png'
import p2 from '../assets/images/featured-categories/fetured-item-2.png'
import p3 from '../assets/images/featured-categories/fetured-item-3.png'
import p4 from '../assets/images/featured-categories/fetured-item-4.png'
import p5 from '../assets/images/featured-categories/fetured-item-5.png'
import p6 from '../assets/images/featured-categories/fetured-item-6.png'
const FeaturedCategories = () => {
  const categories = [
    {
      title: 'TV & Audios',
      items: [
        { name: 'Smart Television', link: 'product-grids.html' },
        { name: 'QLED TV', link: 'product-grids.html' },
        { name: 'Audios', link: 'product-grids.html' },
        { name: 'Headphones', link: 'product-grids.html' },
        { name: 'View All', link: 'product-grids.html' },
      ],
      imgSrc: p1,
      alt: 'TV & Audios'
    },
    {
      title: 'Desktop & Laptop',
      items: [
        { name: 'Smart Television', link: 'product-grids.html' },
        { name: 'QLED TV', link: 'product-grids.html' },
        { name: 'Audios', link: 'product-grids.html' },
        { name: 'Headphones', link: 'product-grids.html' },
        { name: 'View All', link: 'product-grids.html' },
      ],
      imgSrc: p2,
      alt: 'Desktop & Laptop'
    },
    {
      title: 'Cctv Camera',
      items: [
        { name: 'Smart Television', link: 'product-grids.html' },
        { name: 'QLED TV', link: 'product-grids.html' },
        { name: 'Audios', link: 'product-grids.html' },
        { name: 'Headphones', link: 'product-grids.html' },
        { name: 'View All', link: 'product-grids.html' },
      ],
      imgSrc: p3,
      alt: 'Cctv Camera'
    },
    {
      title: 'Dslr Camera',
      items: [
        { name: 'Smart Television', link: 'product-grids.html' },
        { name: 'QLED TV', link: 'product-grids.html' },
        { name: 'Audios', link: 'product-grids.html' },
        { name: 'Headphones', link: 'product-grids.html' },
        { name: 'View All', link: 'product-grids.html' },
      ],
      imgSrc: p4,
      alt: 'Dslr Camera'
    },
    {
      title: 'Smart Phones',
      items: [
        { name: 'Smart Television', link: 'product-grids.html' },
        { name: 'QLED TV', link: 'product-grids.html' },
        { name: 'Audios', link: 'product-grids.html' },
        { name: 'Headphones', link: 'product-grids.html' },
        { name: 'View All', link: 'product-grids.html' },
      ],
      imgSrc: p5,
      alt: 'Smart Phones'
    },
    {
      title: 'Game Console',
      items: [
        { name: 'Smart Television', link: 'product-grids.html' },
        { name: 'QLED TV', link: 'product-grids.html' },
        { name: 'Audios', link: 'product-grids.html' },
        { name: 'Headphones', link: 'product-grids.html' },
        { name: 'View All', link: 'product-grids.html' },
      ],
      imgSrc: p6,
      alt: 'Game Console'
    }
  ];

  return (
    <section className="featured-categories section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>Featured Categories</h2>
              <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
            </div>
          </div>
        </div>
        <div className="row">
          {categories.map((category, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-12">
              <div className="single-category">
                <h3 className="heading">{category.title}</h3>
                <ul>
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a href={item.link}>{item.name}</a>
                    </li>
                  ))}
                </ul>
                <div className="images">
                  <img src={category.imgSrc} alt={category.alt} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
