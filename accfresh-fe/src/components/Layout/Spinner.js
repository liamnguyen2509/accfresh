import React from 'react';

const Spinner = () => {
    return (
        <div className="Loader">
            <div className="spinnerPairHolder">
                <div className="spinnerPair">
                    <div className="spinnerPairCercle"></div>
                    <div className="spinnerPairCercle"></div>
                </div>
                <div className="spinnerPair">
                    <div className="spinnerPairCercle"></div>
                    <div className="spinnerPairCercle"></div>
                </div>
                <div className="spinnerPair">
                    <div className="spinnerPairCercle"></div>
                    <div className="spinnerPairCercle"></div>
                </div>
                <div className="spinnerPair">
                    <div className="spinnerPairCercle"></div>
                    <div className="spinnerPairCercle"></div>
                </div>
                <div className="spinnerPair">
                    <div className="spinnerPairCercle"></div>
                    <div className="spinnerPairCercle"></div>
                </div>
            </div>
        </div>
    );
}

export default Spinner;