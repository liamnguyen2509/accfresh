import React, { useEffect, useState } from "react";

import Group from "./Group";

import { GetGroups } from '../../api';

const FeatureSection = () => {
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        GetGroups()
        .then(res => setGroups(res.data.data.filter(group => group.isActive === true)))
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }, []);

    return (
        <div className="feature-main" style={{margin: "50px 0"}}>
            <div className="container-fluid">
                <div className="wrapper" style={{margin: "0 0 30px 0"}}>
                    <h2 className="heading heading-h2">Products</h2>
                </div>
                <div className="row row-custom">
                    {
                        
                        groups.map(group => (
                            <Group 
                                key={group._id}
                                id={group._id}
                                name={group.name} 
                                image={group.image} 
                                stock={group.stock} 
                                price={group.price.$numberDecimal} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default FeatureSection;