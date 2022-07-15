import { FC } from 'react';
import { TextSchema } from './schema';

const mergeTextDecoration = (underline: boolean, through: boolean) => {
  if (underline && through) {
    return 'underline line-through';
  } else if (underline) {
    return 'underline';
  } else if (through) {
    return 'line-through';
  } else {
    return 'none';
  }
};

const Component: FC<TextSchema> = ({
  control: {},
  attrs: { text, font, color, opacity },
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        fontFamily: font.typeface,
        fontSize: `${font.size}px`,
        fontWeight: font.bold ? 'bold' : 'normal',
        fontStyle: font.italic ? 'italic' : '',
        textDecoration: mergeTextDecoration(font.underline, font.through),
        color: color.value,
        opacity: opacity.value / 100,
      }}
    >
      {text.value}
    </div>
  );
};

export default Component;
