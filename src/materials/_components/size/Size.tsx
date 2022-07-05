import { AttrUtils } from '@/lib/AttrUtils';
import { PropsWithChildren } from 'react';

const Size: React.FC<PropsWithChildren<{ size: AttrUtils.Size }>> = function ({
  children,
  size,
}) {
  return (
    <section
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      {children}
    </section>
  );
};

export default Size;
