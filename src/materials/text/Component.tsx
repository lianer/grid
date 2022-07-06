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
        fontSize: `${fontSize.value}px`,
        fontWeight: fontWeight.selected,
        color: color.value,
        opacity: opacity.value,
      }}
    >
      {text.value}
    </div>
  );
};

export default Component;
