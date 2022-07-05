import { AttrUtils } from '@/lib/AttrUtils';
import { PropsWithChildren } from 'react';

const Position: React.FC<PropsWithChildren<{ position: AttrUtils.Position }>> =
  function ({ children, position }) {
    return (
      <section
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {children}
      </section>
    );
  };

export default Position;
