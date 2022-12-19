import React from "react";

import Layout from "../../../components/Layout/Layout";
import HeroSection from "./components/Hero/HeroSection";
import FeatureSection from "./components/Feature/FeatureSection";

const Home = (props) => {
    return (
        <Layout>
            {/* <HeroSection /> */}
            <FeatureSection />
        </Layout>
    ); 
}

export default Home;