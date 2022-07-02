import { FC } from 'react';
import { ImageSchema } from './schema';

const Component: FC<ImageSchema> = ({
  stage = false,
  onCompUpdate,
  props: { src, opacity },
}) => {
  console.log('image src', src);

  return (
    <img
      src={src.val}
      style={{
        opacity: opacity.val,
      }}
      onError={(e) => {
        console.log('image error');

        if (stage && onCompUpdate) {
          onCompUpdate({
            src: { val: 'https://kano.guahao.com/1QE687641013' },
          });
        }
      }}
    />
  );
};

export default Component;
