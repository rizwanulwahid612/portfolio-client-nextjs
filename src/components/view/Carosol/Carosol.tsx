/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Carousel } from 'antd';

const images = [
    'https://tandteventplanning.com/wp-content/uploads/2019/09/categories-of-event.png',
    'https://www.inventiva.co.in/wp-content/uploads/2022/01/images-8.jpeg',
    // Add other image URLs here
];

const Banner = () => (
    <Carousel autoplay>
        {images.map((imageUrl, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: '#364d79' }}>
                <img src={imageUrl} alt={`Image ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '440px', marginTop: '20px' }} />
            </div>
        ))}
    </Carousel>
);

export default Banner;