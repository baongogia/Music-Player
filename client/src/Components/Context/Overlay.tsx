import React from "react";
import ReactDOM from "react-dom";

// CSS cho lớp phủ
const overlayStyles: React.CSSProperties = {
  position: "absolute",
  zIndex: 10,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

interface OverlayProps {
  onClick: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div style={overlayStyles} onClick={onClick}></div>,
    document.getElementById("overlay-root") as HTMLElement
  );
};

export default Overlay;
