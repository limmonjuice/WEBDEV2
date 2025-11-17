import { useState } from "react";

function StepCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="step-counter">
      <h2>Step Counter</h2>
      
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
        placeholder="Enter step value"
      />

      <h3>{count}</h3>
      
      <div>
        <button onClick={() => setCount(count + step)}>
          Add {step}
        </button>
        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default StepCounter;
