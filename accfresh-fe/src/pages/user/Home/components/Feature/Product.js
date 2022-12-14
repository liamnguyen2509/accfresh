import React from "react";

const Product = (props) => {
    return (
        <div className="col-lg-3 col-otr">
            <div className="col-inr box-4">
                <div className="cover-img-otr">
                    <a href="./Pages/Single-Artwork.html">
                        <img className="cover-img" src={props.img} alt={props.name} />
                    </a>
                    <span className="heart-icon-otr2 heart4">
                        <i className="ri-heart-line heart-icon2 heart-4"></i>
                    </span>
                </div>
                <a href="./Pages/Single-Artwork.html" className="art-name heading-MB-Mon">{props.name}</a>
                <div className="bid-main">
                    <p className="bid heading-S">Starting at</p>
                    <p className="Price heading-SB">$ {props.price}</p>
                </div>
            </div>
        </div>
    );
}

export default Product;