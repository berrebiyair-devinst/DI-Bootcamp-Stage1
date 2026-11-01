import { useState } from "react";

function Calculate() {
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [result, setResult] = useState(0);
    const[operation, setOperation] = useState("+");
    const handleCalculate = () => {
        switch (operation) {
            case "+":
                setResult(number1 + number2);
                break;
            case "-":
                setResult(number1 - number2);
                break;
            case "*":
                setResult(number1 * number2);
                break;
            case "/":
                setResult(number1 / number2);
                if (number2 === 0) {
                    setResult("Error: Division by zero");
                }
                break;
            default:
                setResult(0);
        };
        const handlecalculate = () => {
          setNumber1(0);
          setNumber2(0);
          setResult(0);
          setOperation("+");
        };


    };

    return (
        <div>
            <h1>Calculate</h1>
            <input
                type="number"
                value={number1}
                onChange={(e) => setNumber1(Number(e.target.value))}
            />
            <input
                type="number"
                value={number2}
                onChange={(e) => setNumber2(Number(e.target.value))}
            />
            <button onClick={handleCalculate}>Calculate</button>
            <p>Result: {result}</p>
            <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                <option value="+">Addition</option>
                <option value="-">Soustraction</option>
                <option value="*">Multiplication</option>
                <option value="/">Division</option>
            </select>
        </div>
    );
}

export default Calculate;