import React from "react";

const HeroContent = () => {
    return (
        <div className="col-content-inr">
            <h1 className="heading-h1 heading">
                Providing customer services since <span className="text-color"> November 2022 </span>
            </h1>
            <div className="staticstics">
                <div className="staticstics-box">
                    <h2 className="heading-h2 static-head">217</h2>
                    <p className="heading-MB static-desc">Product Sold</p>
                </div>
                <div className="staticstics-box">
                    <h2 className="heading-h2 static-head">5 Start (2 reviews)</h2>
                    <p className="heading-MB static-desc">Product Quality</p>
                </div>
            </div>
        </div>
    );
}

export default HeroContent;