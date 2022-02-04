import React from 'react';

function Error({ error }) {
    return (
        <>
            <div style={{ border: "2px solid red", borderRadius: "7px" }}>
                <h2 style={{ color: "red" }}>{error}</h2>
            </div>
        </>
    )
}

export default Error;
