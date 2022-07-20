export type Rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

export function getRect(el: HTMLElement, container: HTMLElement | null): Rect;
export function getRect(el: null, container: HTMLElement | null): null;
export function getRect(
  el: HTMLElement | null,
  container: HTMLElement | null,
): Rect | null {
  if (!el) return null;

  let elRect = el.getBoundingClientRect();
  let containerRect = container?.getBoundingClientRect() || null;

  return {
    left: elRect.left - (containerRect ? containerRect.left : 0),
    right: elRect.right - (containerRect ? containerRect.left : 0),

    top: elRect.top - (containerRect ? containerRect.top : 0),
    bottom: elRect.bottom - (containerRect ? containerRect.top : 0),

    width: elRect.width,
    height: elRect.height,
  };
}
