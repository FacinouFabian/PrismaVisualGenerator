import * as React from "react";
import Xarrow from "react-xarrows";

const boxStyle = {
  border: "grey solid 2px",
  borderRadius: "10px",
  padding: "5px",
};

const AboutPage = () => {
  const box1Ref = React.useRef(null);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        color: "#fff",
      }}
    >
      <div ref={box1Ref} style={boxStyle}>
        hey
      </div>
      <p id="elem2" style={boxStyle}>
        hey2
      </p>

      <Xarrow
        start={box1Ref} //can be react ref
        label={<div>test</div>}
        end="elem2" //or an id
        headColor="#fff"
        dashness={{
          strokeLen: 10,
          nonStrokeLen: 2,
          animation: 1,
        }}
      />
    </div>
  );
};
export default AboutPage;
