import React, { useEffect } from "react";
import "./downArrow.css";

export default function DownArrow({ scrolling, fadeIn, setFadeIn }) {
  useEffect(() => {
    setFadeIn({
      opacity: 1,
      paddingTop: "0px",
    });
  }, []);

  return (
    <div className='downArrowWrapper'>
      <div className='downArrowFixed' style={fadeIn} onClick={scrolling}>
        <div className='downArrowCircle'>
          <h1>
            <span class='material-symbols-rounded'>arrow_downward</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
