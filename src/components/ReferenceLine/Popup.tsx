import { useRef } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
  getContainer?: () => HTMLElement;
};
export const Portal: React.FC<PortalProps> = function (props) {
  const { children, getContainer = () => document.body } = props;

  const containerRef = useRef<HTMLElement>();

  const initRef = useRef(false);
  if (!initRef.current) {
    containerRef.current = getContainer();
    initRef.current = true;
  }

  return containerRef.current
    ? createPortal(children, containerRef.current)
    : null;
};
