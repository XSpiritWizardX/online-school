import { useEffect, useRef, useState } from "react";
import Desmos from "desmos";
import "./GraphingCalculator.css";

const calculatorTypes = {
  graphing: Desmos.GraphingCalculator,
  scientific: Desmos.ScientificCalculator,
  fourFunction: Desmos.FourFunctionCalculator,
  geometry: Desmos.GeometryCalculator,
};

const GraphingCalculator = () => {
  const [selected, setSelected] = useState("graphing");
  const calcContainer = useRef(null);
  const calcInstance = useRef(null);

  const loadCalculator = (type) => {
    if (calcInstance.current) {
      calcInstance.current.destroy();
    }

    const options = {
      keypad: true,
      expressions: true,
      settingsMenu: true,
      zoomButtons: true,
      
    };

    calcInstance.current = calculatorTypes[type](calcContainer.current, options);

    // Default content
    if (type === "graphing") {
      calcInstance.current.setExpression({ id: "eq1", latex: "y=x^2" });
    }
  };

  useEffect(() => {
    loadCalculator(selected);
    return () => {
      if (calcInstance.current) {
        calcInstance.current.destroy();
      }
    };
  }, [selected]);

  return (
    <div className="graphing-calc-wrapper">
      <h2> Multi Calculator</h2>
      <div className="calc-buttons">
        <button onClick={() => setSelected("graphing")}>Graphing</button>
        <button onClick={() => setSelected("scientific")}>Scientific</button>
        <button onClick={() => setSelected("fourFunction")}>Basic</button>
      </div>
      <div id="desmos-calculator" ref={calcContainer}></div>
    </div>
  );
};

export default GraphingCalculator;
