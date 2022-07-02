import { FC } from 'react';
import { TextSchema } from './schema';

const Component: FC<TextSchema> = ({
  text,
  fontSize,
  fontWeight,
  color,
  opacity,
}) => {
  return (
    <div>
      <p>text.val: {text.val}</p>
      <p>fontSize.val: {fontSize.val}</p>
      <p>fontWeight.val: {fontWeight.val}</p>
      <p>color.val: {color.val}</p>
      <p>opacity.val: {opacity.val}</p>
    </div>
  );
};

export default Component;
