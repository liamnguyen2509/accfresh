import React from "react";

import classes from './Group.module.css';

const Group = (props) => {
    const onClickGroupHandler = () => {
        props.onClick(props.id);
    }

    return (
        <div className="col-lg-2 col-otr" onClick={onClickGroupHandler} style={{ cursor: "pointer" }}>
            <div className="col-inr box-4">
                <div className="cover-img-otr" style={{ display: "table-cell", textAlign: "center", verticalAlign: "middle" }}>
                    <img className="cover-img" src={props.image} alt={props.name} />
                    <p className={classes["stock-label"]}>
                        Stock: {props.stock > 1000 ? `${Math.round(props.stock/1000)}k+` : props.stock}
                    </p>
                </div>
                <p className="art-name heading-MB-Mon">{props.name}</p>
                <div className="bid-main">
                        <p className="bid heading-S">Starting at: </p>
                        <p className="Price heading-SB">${props.price}</p>
                    </div>
            </div>
        </div>
    );
}

export default Group;