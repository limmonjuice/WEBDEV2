import { useState } from "react";

function StepCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div>
      <h2>Step Counter</h2>

      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
        placeholder="Enter step value"
      />

      <button onClick={() => setCount(count + step)}>
        Add
      </button>

      <p>Count: {count}</p>
      <p>Step: {step}</p>
    </div>
  );
}

export default StepCounter;
