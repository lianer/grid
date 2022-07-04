import { Carousel } from 'antd';
import { FC } from 'react';
import { Schema } from './schema';

const Component: FC<Schema> = function ({ attrs: { opacity, images } }) {
  return (
    <Carousel autoplay style={{ opacity: opacity.val }}>
      {images.val.map((img) => (
        <img key={img} src={img} />
      ))}
    </Carousel>
  );
};

export default Component;
