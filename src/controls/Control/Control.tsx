import { PropsWithChildren } from 'react';
import BasicControl from '../BasicControl/BasicControl';

const Control: React.FC<PropsWithChildren<any>> = function ({
  children,
  ...props
}) {
  switch (props.$control) {
    case 'BasicControlSchema':
    default:
      // props = props as BasicControlSchema;
      return <BasicControl {...props}>{children}</BasicControl>;
  }
};

export default Control;
