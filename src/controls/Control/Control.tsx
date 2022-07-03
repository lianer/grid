import {
  AutoHeightControlSchema,
  BasicControlSchema,
  ControlSchema,
} from '@/types';
import { PropsWithChildren } from 'react';
import AutoHeightControl from '../AutoHeightControl/AutoHeightControl';
import BasicControl from '../BasicControl/BasicControl';

const Control: React.FC<PropsWithChildren<{ control: ControlSchema }>> =
  function ({ children, control }) {
    switch (control.type) {
      case 'AutoHeightControlSchema':
        return (
          <AutoHeightControl control={control as AutoHeightControlSchema}>
            {children}
          </AutoHeightControl>
        );
      case 'BasicControlSchema':
      default:
        return (
          <BasicControl control={control as BasicControlSchema}>
            {children}
          </BasicControl>
        );
    }
  };

export default Control;
