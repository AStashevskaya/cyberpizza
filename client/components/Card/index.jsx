import React from 'react';

import Price from './Price';
import Image from './Image';
import AddBtn from './AddBtn'
import Description from './Description';

import './index.scss'

const Card = ({item}) => {
    const { name, image, price, description, enabled} = item

    const onAdd = () => {
        console.log('plus one')
    }

    return (
        <div className="card">
            <Image image={image} name={name} />
            <AddBtn handleClick={onAdd} />
            <Price price={price} />
            <Description  description={description} />
        </div>
    )
}

export default Card