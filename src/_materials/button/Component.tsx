import { Button } from 'antd';
import { FC } from 'react';
import { ComponentSchema } from './schema';

const Component: FC<ComponentSchema> = ({
  control: {},
  attrs: { text, size, type },
}) => {
  return (
    <Button type={type.value} size={size.value}>
      {text.value}
    </Button>
  );
};

export default Component;
