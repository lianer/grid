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

  return (
    <>
      {[leftLine, rightLine, topLine, bottomLine].map((line) => {
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
