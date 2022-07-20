import React, { useEffect, useRef, useState } from 'react';
import {
  getBottomLine,
  getLeftLine,
  getRightLine,
  getTopLine,
} from './getLine';
import { getRect, Rect } from './getRect';
import { Line, LineProps } from './Line';
import { Portal } from './Portal';

type onChangeResult = {
  left: number | null;
  right: number | null;
  top: number | null;
  bottom: number | null;
};

type ReferenceLineOptions = {
  targetSelector: string; // 被拖拽的元素选择器
  otherSelector: string; // 其他对比的元素选择器

  active?: boolean;

  detectOffset?: number; // 检测偏移范围内的元素

  children?: React.ReactNode; // 容器元素

  getContainer?: () => HTMLElement;

  onChange?: (result: onChangeResult) => void; // 当对比结果发生变化的时候回调，可以在回调函数中实现智能吸附等功能
};

const ReferenceLine: React.FC<ReferenceLineOptions> = function (props) {
  const {
    targetSelector = '',
    otherSelector = '',
    active = false,
    detectOffset = 2,
    children = undefined,
    getContainer,
    onChange = undefined,
  } = props;

  const targetRef = useRef<HTMLElement | null>(null);
  const elementsRef = useRef<HTMLElement[]>([]);
  const rectsRef = useRef<Rect[]>([]);
  const mouseRef = useRef<boolean>(false);
  const [lines, setLines] = useState<LineProps>();
  const containerRef = useRef<HTMLElement | null>(null);

  // 初始化获取 DOM 节点，计算 Rect
  const updateElementsAndRects = () => {
    if (!active) return;

    targetRef.current =
      document.body.querySelector<HTMLElement>(targetSelector);

    if (!targetRef.current) {
      return;
    }

    if (getContainer) {
      containerRef.current = getContainer();
    }

    // 获取所有对比的元素
    const _nodeList =
      document.body.querySelectorAll<HTMLElement>(otherSelector);
    elementsRef.current = _nodeList ? [..._nodeList] : [];

    // 排除当前被拖拽的元素
    elementsRef.current = elementsRef.current.filter(
      (el) => el !== targetRef.current,
    );

    // 获取元素的 rect
    rectsRef.current = elementsRef.current.map((el) => {
      // return el.getBoundingClientRect()
      return getRect(el, containerRef.current);
    });

    // console.log('rectsRef.current', rectsRef.current);
  };

  // 更新辅助线视图
  const updateLines = () => {
    if (!active || !targetRef.current || !rectsRef.current) return;

    const targetRect = getRect(targetRef.current, containerRef.current);
    const otherRects = rectsRef.current;

    // console.log('targetRect', targetRect);

    const match = (target: number, source1: number, source2: number) => {
      // 间隙 < 1 就认为是对齐的，因为在缩放过程中，有些组件可能会出现非整数的坐标
      return Math.abs(target - source1) < 1 || Math.abs(target - source2) < 1;
    };

    const leftRects = otherRects.filter((rect) => {
      return match(targetRect.left, rect.left, rect.right);
    });
    const rightRects = otherRects.filter((rect) => {
      return match(targetRect.right, rect.left, rect.right);
    });
    const topRects = otherRects.filter((rect) => {
      return match(targetRect.top, rect.top, rect.bottom);
    });
    const bottomRects = otherRects.filter((rect) => {
      return match(targetRect.bottom, rect.top, rect.bottom);
    });

    const _lines = {
      leftLine: getLeftLine(targetRect, leftRects),
      rightLine: getRightLine(targetRect, rightRects),
      topLine: getTopLine(targetRect, topRects),
      bottomLine: getBottomLine(targetRect, bottomRects),
    };

    setLines(_lines);
  };

  // 更新获取偏移范围内的元素
  const updateOffset = () => {
    if (!active || !targetRef.current || !rectsRef.current) return;

    const targetRect = getRect(targetRef.current, containerRef.current);
    const otherRects = rectsRef.current;

    const horizontalLines = [
      ...new Set(otherRects.map((rect) => [rect.left, rect.right]).flat()),
    ];
    const verticalLines = [
      ...new Set(otherRects.map((rect) => [rect.top, rect.bottom]).flat()),
    ];

    const findNearest = (target: number, source: number[]): number => {
      let minOffset = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < source.length; i++) {
        const pos = source[i];
        const offset = target - pos;
        const dist = Math.abs(offset);
        if (dist <= detectOffset && dist < minOffset) {
          minOffset = offset;
        }
      }
      return minOffset;
    };

    const offset = {
      left: findNearest(targetRect.left, horizontalLines),
      right: findNearest(targetRect.right, horizontalLines),
      top: findNearest(targetRect.top, verticalLines),
      bottom: findNearest(targetRect.bottom, verticalLines),
    };

    const offsetWithoutMax = {
      left: offset.left === Number.MAX_SAFE_INTEGER ? null : offset.left,
      right: offset.right === Number.MAX_SAFE_INTEGER ? null : offset.right,
      top: offset.top === Number.MAX_SAFE_INTEGER ? null : offset.top,
      bottom: offset.bottom === Number.MAX_SAFE_INTEGER ? null : offset.bottom,
    };

    onChange && onChange(offsetWithoutMax);
  };

  useEffect(updateElementsAndRects, [active]);
  useEffect(updateLines, [active]);
  useEffect(updateOffset, [active]);

  return (
    <div
      className="ReferenceLine"
      onMouseDown={() => {
        mouseRef.current = true;
      }}
      onMouseMove={() => {
        if (mouseRef.current) {
          updateLines();
          updateOffset();
        }
      }}
      onMouseUp={() => {
        mouseRef.current = false;
      }}
    >
      {children}
      {active && (
        <Portal getContainer={getContainer}>
          <Line {...lines} />
        </Portal>
      )}
    </div>
  );
};

export default ReferenceLine;
