import { FC } from 'react';
import { TextSchema } from './schema';

const Component: FC<TextSchema> = ({
  control: {},
  attrs: { text, fontSize, fontWeight, color, opacity },
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        fontSize: `${fontSize.val}px`,
        fontWeight: fontWeight.val,
        color: color.val,
        opacity: opacity.val,
      }}
    >
      {text.val}
    </div>
  );
};

export default Component;
