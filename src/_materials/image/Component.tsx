import { FC } from 'react';
import { ImageSchema } from './schema';

const Component: FC<ImageSchema> = ({
  stage = false,
  onCompUpdate,
  attrs: { src, opacity },
}) => {
  return (
    <img
      src={src.value}
      style={{
        width: '100%',
        opacity: opacity.value,
      }}
      onError={(e) => {
        if (stage && onCompUpdate) {
          onCompUpdate({
            src: { value: 'https://kano.guahao.com/1QE687641013' },
          });
        }
      }}
    />
  );
};

export default Component;