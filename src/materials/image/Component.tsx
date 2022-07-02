import { FC } from 'react';
import { ImageSchema } from './schema';

const Component: FC<ImageSchema> = ({ src, opacity }) => {
  return (
    <img
      src={src.val || 'https://kano.guahao.com/1QE687641013'}
      style={{
        opacity: opacity.val,
      }}
    />
  );
};

export default Component;
