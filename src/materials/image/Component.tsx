import { FC } from 'react';
import { ImageSchema } from './schema';

const Component: FC<ImageSchema> = ({
  stage = false,
  onCompUpdate,
  attrs: { src, opacity },
}) => {
  return (
    <img
      src={src.val}
      style={{
        opacity: opacity.val,
      }}
      onError={(e) => {
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
