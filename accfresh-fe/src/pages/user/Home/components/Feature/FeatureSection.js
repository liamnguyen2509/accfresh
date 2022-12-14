import React from "react";

import Product from "./Product";

const FeatureSection = () => {
    return (
        <div className="feature-main" style={{margin: "50 0"}}>
            <div className="container-fluid">
                <div className="wrapper" style={{margin: "0 0 30 0"}}>
                    <h2 className="heading heading-h2">Products</h2>
                    {/* <a href="./Pages/Explore-Artwork.html" className="view-all">
                        <p className="view heading-SB">View All Artwork</p>
                        <i className="ri-arrow-right-line arrow-right"></i>
                    </a> */}
                </div>
                <div className="row row-custom">
                    <Product name="Walmart" img="assets/img/hero-img-home-1.jpg" price="0.50" />
                </div>
            </div>
        </div>
    );
}

export default FeatureSection;