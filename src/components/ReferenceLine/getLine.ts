const MAX = Number.MAX_SAFE_INTEGER;
const MIN = Number.MIN_SAFE_INTEGER;

type GetLeftLine = (
  targetRect: DOMRect,
  rects: DOMRect[],
) => { left: number; top: number; height: number } | undefined;
export const getLeftLine: GetLeftLine = function (targetRect, rects) {
  if (rects.length === 0) return undefined;
  rects = [targetRect, ...rects];
  const top = rects.reduce((t, r) => Math.min(t, r.top), MAX);
  const height = rects.reduce((h, r) => Math.max(h, r.bottom - top), MIN);
  return { left: targetRect.left, top, height };
};

type GetRightLine = (
  targetRect: DOMRect,
  rects: DOMRect[],
) => { left: number; top: number; height: number } | undefined;
export const getRightLine: GetRightLine = function (targetRect, rects) {
  if (rects.length === 0) return undefined;
  rects = [targetRect, ...rects];
  const top = rects.reduce((t, r) => Math.min(t, r.top), MAX);
  const height = rects.reduce((h, r) => Math.max(h, r.bottom - top), MIN);
  return { left: targetRect.right, top, height };
};

type GetTopLine = (
  targetRect: DOMRect,
  rects: DOMRect[],
) => { top: number; left: number; width: number } | undefined;
export const getTopLine: GetTopLine = function (targetRect, rects) {
  if (rects.length === 0) return undefined;
  rects = [targetRect, ...rects];
  const left = rects.reduce((l, r) => Math.min(l, r.left), MAX);
  const width = rects.reduce((w, r) => Math.max(w, r.right - left), MIN);
  return { top: targetRect.top, left, width };
};

type GetBottomLine = (
  targetRect: DOMRect,
  rects: DOMRect[],
) => { top: number; left: number; width: number } | undefined;
export const getBottomLine: GetBottomLine = function (targetRect, rects) {
  if (rects.length === 0) return undefined;
  rects = [targetRect, ...rects];
  const left = rects.reduce((l, r) => Math.min(l, r.left), MAX);
  const width = rects.reduce((w, r) => Math.max(w, r.right - left), MIN);
  return { top: targetRect.bottom, left, width };
};
