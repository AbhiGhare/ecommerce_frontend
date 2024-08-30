import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Product from './Product';
import { FaTh, FaList } from 'react-icons/fa';


const SingleProduct = ({ product }) => {
    return (
        <div className="col-lg-12 col-md-12 col-12">
            <div className="single-product">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-md-4 col-12">
                        <div className="product-image">
                            <img src={product.image} alt={product.title} />
                            {product.saleTag && <span className="sale-tag">{product.saleTag}</span>}
                            {product.newTag && <span className="new-tag">{product.newTag}</span>}
                            <div className="button">
                                <a href={product.detailsLink} className="btn">
                                    <i className="lni lni-cart"></i> Add to Cart
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-12">
                        <div className="product-info">
                            <span className="category">{product.category}</span>
                            <h4 className="title">
                                <a href={product.titleLink}>{product.title}</a>
                            </h4>
                            <ul className="review">
                                {Array.from({ length: product.rating }).map((_, index) => (
                                    <li key={index}><i className="lni lni-star-filled"></i></li>
                                ))}
                                {Array.from({ length: 5 - product.rating }).map((_, index) => (
                                    <li key={index}><i className="lni lni-star"></i></li>
                                ))}
                                <li><span>{product.reviewCount} Review(s)</span></li>
                            </ul>
                            <div className="price">
                                <span>${product.price}</span>
                                {product.discountPrice && <span className="discount-price">${product.discountPrice}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Grid() {
    const { categoryName } = useParams(); // Get the category name from URL params
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('hello');

        // Fetch data based on the category name
        const fetchProducts = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/products/category`, {
                    category: categoryName
                });
                console.log(response, 'response');

                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryName]);

    const [activeTab, setActiveTab] = useState('grid');
    const [priceRange, setPriceRange] = useState(100);
    const [filters, setFilters] = useState({
        price: [],
        brand: []
    });

    const handlePriceChange = (e) => {
        setPriceRange(e.target.value);
    };

    const handleFilterChange = (type, value) => {
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            if (newFilters[type].includes(value)) {
                newFilters[type] = newFilters[type].filter(filter => filter !== value);
            } else {
                newFilters[type].push(value);
            }
            return newFilters;
        });
    };
    return (
        <div>
            {/* <div className="breadcrumbs">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="breadcrumbs-content">
                                <h1 className="page-title">Shop Grid</h1>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <ul className="breadcrumb-nav">
                                <li>
                                    <a href="index.html">
                                        <i className="lni lni-home"></i> Home
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">Shop</a>
                                </li>
                                <li>Shop Grid</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
            <section className="product-grids section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-12">
                            <div className="product-sidebar">
                                {/* Start Single Widget: Search */}
                                <div className="single-widget search">
                                    <h3>Search Product</h3>
                                    <form action="#">
                                        <input type="text" placeholder="Search Here..." />
                                        <button type="submit">
                                            <i className="lni lni-search-alt"></i>
                                        </button>
                                    </form>
                                </div>
                                {/* End Single Widget: Search */}

                                {/* Start Single Widget: Categories */}
                                <div className="single-widget">
                                    <h3>All Categories</h3>
                                    <ul className="list">
                                        <li>
                                            <a href="product-grids.html">Computers & Accessories </a><span>(1138)</span>
                                        </li>
                                        <li>
                                            <a href="product-grids.html">Smartphones & Tablets</a><span>(2356)</span>
                                        </li>
                                        <li>
                                            <a href="product-grids.html">TV, Video & Audio</a><span>(420)</span>
                                        </li>
                                        <li>
                                            <a href="product-grids.html">Cameras, Photo & Video</a><span>(874)</span>
                                        </li>
                                        <li>
                                            <a href="product-grids.html">Headphones</a><span>(1239)</span>
                                        </li>
                                        <li>
                                            <a href="product-grids.html">Wearable Electronics</a><span>(340)</span>
                                        </li>
                                        <li>
                                            <a href="product-grids.html">Printers & Ink</a><span>(512)</span>
                                        </li>
                                    </ul>
                                </div>
                                {/* End Single Widget: Categories */}

                                {/* Start Single Widget: Price Range */}
                                <div className="single-widget range">
                                    <h3>Price Range</h3>
                                    <input
                                        type="range"
                                        className="form-range"
                                        name="range"
                                        step="1"
                                        min="100"
                                        max="10000"
                                        value={priceRange}
                                        onChange={handlePriceChange}
                                    />
                                    <div className="range-inner">
                                        <label>$</label>
                                        <input
                                            type="text"
                                            id="rangePrimary"
                                            placeholder={priceRange}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                {/* End Single Widget: Price Range */}

                                {/* Start Single Widget: Filter by Price */}
                                <div className="single-widget condition">
                                    <h3>Filter by Price</h3>
                                    {[
                                        { label: '$50 - $100 (208)', value: '50-100' },
                                        { label: '$100 - $500 (311)', value: '100-500' },
                                        { label: '$500 - $1,000 (485)', value: '500-1000' },
                                        { label: '$1,000 - $5,000 (213)', value: '1000-5000' }
                                    ].map((range) => (
                                        <div className="form-check" key={range.value}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={range.value}
                                                id={`flexCheckPrice${range.value}`}
                                                checked={filters.price.includes(range.value)}
                                                onChange={() => handleFilterChange('price', range.value)}
                                            />
                                            <label className="form-check-label" htmlFor={`flexCheckPrice${range.value}`}>
                                                {range.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {/* End Single Widget: Filter by Price */}

                                {/* Start Single Widget: Filter by Brand */}
                                <div className="single-widget condition">
                                    <h3>Filter by Brand</h3>
                                    {[
                                        { label: 'Apple (254)', value: 'Apple' },
                                        { label: 'Bosh (39)', value: 'Bosh' },
                                        { label: 'Canon Inc. (128)', value: 'Canon' },
                                        { label: 'Dell (310)', value: 'Dell' },
                                        { label: 'Hewlett-Packard (42)', value: 'HP' },
                                        { label: 'Hitachi (217)', value: 'Hitachi' },
                                        { label: 'LG Electronics (310)', value: 'LG' },
                                        { label: 'Panasonic (74)', value: 'Panasonic' }
                                    ].map((brand) => (
                                        <div className="form-check" key={brand.value}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={brand.value}
                                                id={`flexCheckBrand${brand.value}`}
                                                checked={filters.brand.includes(brand.value)}
                                                onChange={() => handleFilterChange('brand', brand.value)}
                                            />
                                            <label className="form-check-label" htmlFor={`flexCheckBrand${brand.value}`}>
                                                {brand.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {/* End Single Widget: Filter by Brand */}
                            </div>
                        </div>
                        <div className="col-lg-9 col-12">
                            <div className="product-grids-head">
                                <div className="product-grid-topbar">
                                    <div className="row align-items-center">
                                        <div className="col-lg-7 col-md-8 col-12">
                                            <div className="product-sorting">
                                                <label htmlFor="sorting">Sort by:</label>
                                                <select className="form-control" id="sorting">
                                                    <option>Popularity</option>
                                                    <option>Low - High Price</option>
                                                    <option>High - Low Price</option>
                                                    <option>Average Rating</option>
                                                    <option>A - Z Order</option>
                                                    <option>Z - A Order</option>
                                                </select>
                                                <h3 className="total-show-product">Showing: <span>1 - 12 items</span></h3>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-4 col-12">
                                            <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedTab) => setActiveTab(selectedTab)}>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="grid" className={activeTab === 'grid' ? 'active' : ''}>
                                                        {/* <i className="lni lni-grid-alt"></i> */}
                                                        <FaTh size={20}/>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="list" className={activeTab === 'list' ? 'active' : ''}>
                                                        {/* <i className="lni lni-list"></i> */}
                                                        <FaList size={20}/>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className={`tab-pane fade show ${activeTab === 'grid' ? 'active' : ''}`} id="nav-grid" role="tabpanel" aria-labelledby="nav-grid-tab">
                                        <div className="row">
                                            {products.map(product => (
                                                <Product
                                                    key={product._id}
                                                    id={product._id}
                                                    image={product.image}
                                                    category={product.category}
                                                    title={product.title}
                                                    rating={product.rating}
                                                    price={product.price}
                                                    oldPrice={product.oldPrice}
                                                    sale={product.sale}
                                                    newProduct={product.new}
                                                />
                                            ))}
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="pagination left">
                                                    <ul className="pagination-list">
                                                        <li><a href="javascript:void(0)">1</a></li>
                                                        <li className="active"><a href="javascript:void(0)">2</a></li>
                                                        <li><a href="javascript:void(0)">3</a></li>
                                                        <li><a href="javascript:void(0)">4</a></li>
                                                        <li><a href="javascript:void(0)"><i className="lni lni-chevron-right"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`tab-pane fade show ${activeTab === 'list' ? 'active' : ''}`} id="nav-list" role="tabpanel" aria-labelledby="nav-list-tab">
                                        <div className="row">
                                            {products.map((product, index) => (
                                                <SingleProduct key={index} product={product} />
                                            ))}
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="pagination left">
                                                    <ul className="pagination-list">
                                                        <li><a href="javascript:void(0)">1</a></li>
                                                        <li className="active"><a href="javascript:void(0)">2</a></li>
                                                        <li><a href="javascript:void(0)">3</a></li>
                                                        <li><a href="javascript:void(0)">4</a></li>
                                                        <li><a href="javascript:void(0)"><i className="lni lni-chevron-right"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Grid
