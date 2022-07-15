import { AttrUtils } from '@/lib/AttrUtils';
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

const getJustifyContent = (vertical: AttrUtils.TextAlignVertical) => {
  switch (vertical) {
    case 'top':
      return 'flex-start';
    case 'middle':
      return 'center';
    case 'bottom':
      return 'flex-end';
  }
};

const Component: FC<TextSchema> = ({
  control: {},
  attrs: { text, font, color, opacity, align },
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: getJustifyContent(align.vertical),
        width: '100%',
        height: '100%',
        fontFamily: font.typeface,
        fontSize: `${font.size}px`,
        lineHeight: 1.2,
        fontWeight: font.bold ? 'bold' : 'normal',
        fontStyle: font.italic ? 'italic' : '',
        textDecoration: mergeTextDecoration(font.underline, font.through),
        textAlign: align.horizontal,
        wordBreak: 'break-all',
        color: color.value,
        opacity: opacity.value / 100,
      }}
    >
      <span>{text.value}</span>
    </div>
  );
};

export default Component;
