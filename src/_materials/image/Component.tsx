import { isEmpty } from 'lodash-es';
import { FC, useEffect, useState } from 'react';
import { ImageSchema } from './schema';

const Component: FC<ImageSchema> = ({
  stage = false,
  onCompUpdate,
  attrs: { src, opacity },
}) => {
  const [fallback, setFallback] = useState(isEmpty(src));

  useEffect(() => {
    setFallback(false);
  }, [src]);

  return fallback ? (
    <div
      className="FallbackImage w-full h-[6rem] bg-gray-200 text-center leading-[6rem] text-[1.125rem] text-gray-400"
      style={{ opacity: opacity.value / 100 }}
    >
      默认图
    </div>
  ) : (
    <img
      src={src.value}
      style={{
        width: '100%',
        opacity: opacity.value / 100,
      }}
      onError={(e) => setFallback(true)}
    />
  );
};

export default Component;
