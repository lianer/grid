import { Carousel } from 'antd';
import { FC } from 'react';
import { Schema } from './schema';

const Component: FC<Schema> = function ({ attrs: { images, opacity } }) {
  return (
    <Carousel autoplay style={{ width: '100%', opacity: opacity.value / 100 }}>
      {images.value.split(',').map((img) => (
        <img key={img} src={img} />
      ))}
    </Carousel>
  );
};

export default Component;
