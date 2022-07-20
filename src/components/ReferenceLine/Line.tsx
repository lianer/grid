import { isEqual, uniqWith } from 'lodash-es';

export type LineCSSStyle = {
  left: number;
  top: number;
  width?: number;
  height?: number;
};

export type LineProps = {
  leftLine?: LineCSSStyle;
  rightLine?: LineCSSStyle;
  topLine?: LineCSSStyle;
  bottomLine?: LineCSSStyle;
};

const biggerSize = 20;

export const Line: React.FC<LineProps> = function (props) {
  const { leftLine, rightLine, topLine, bottomLine } = props;

  // 去重，部分元素（比如图片）在首次加载的时候，它的高度为 0，会出现上边框和下边框重叠的情况，导致 key 不是唯一性的问题
  const lines = uniqWith(
    [leftLine, rightLine, topLine, bottomLine].filter((v) => !!v),
    isEqual,
  );

  return (
    <>
      {lines.map((line) => {
        if (!line) return null;

        let { left, top, width, height } = line;
        const isHorizontal = height === undefined;

        if (isHorizontal) {
          left -= biggerSize;
          width! += biggerSize * 2;
          height = 1;
        } else {
          top -= biggerSize;
          height! += biggerSize * 2;
          width = 1;
        }

        return (
          <div
            key={JSON.stringify(line)}
            className="z-10 absolute border-dashed border-b border-r border-pink-700"
            style={{ left, top, width, height }}
          ></div>
        );
      })}
    </>
  );
};
