import React from 'react';

const Image = ({ image, name }) => {
    return (
        <div className="card__img">
            <img src={image} alt={name} />
        </div>
    )
}

export default Image;