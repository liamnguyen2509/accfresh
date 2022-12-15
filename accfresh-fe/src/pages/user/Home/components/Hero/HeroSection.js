import React from "react";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

const HeroSection = () => {
    return (
        <div className="hero-main" style={{padding: "50px 0"}}>
            <div className="container-fluid">
                <div className="row row-custom">
                    <div className="col-lg-6 col-content-otr">
                        <HeroContent />
                    </div>
                    <div className="col-lg-6 col-img-otr">
                        <HeroImage />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;