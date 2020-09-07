import React from "react";
import block from "bem-cn";

import "./Preloader.scss";

interface IOwnProps {
  isShow: boolean;
  children: JSX.Element;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  position?: React.CSSProperties["position"];
}

const b = block("preloader");

type TProps = IOwnProps;

const Preloader: React.FC<TProps> = (props: TProps) => {
  const { isShow, position = 'relative', children, width, height } = props;

  if (!isShow) {
    return children;
  }

  return (
    <div className={b({ position })}>
      <div
        className={b("spinner")}
        style={{
          width: width ? width : '100%',
          height: height ? height : '100%',
          backgroundImage: `url(${require('../../images/loader-inline.svg')})`
        }}
      />
    </div>
  );
};

export default Preloader;
