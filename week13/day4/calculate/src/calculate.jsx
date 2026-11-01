
import { useState } from "react";

function Calculate() {
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [result, setResult] = useState(0);
    const [operation, setOperation] = useState("+");

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
                if (number2 === 0) {
                    setResult("Error: Division by zero");
                } else {
                    setResult(number1 / number2);
                }
                break;

            default:
                setResult(0);
        }
    };

    const handleReset = () => {
        setNumber1(0);
        setNumber2(0);
        setResult(0);
        setOperation("+");
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

            <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
            >
                <option value="+">Addition</option>
                <option value="-">Soustraction</option>
                <option value="*">Multiplication</option>
                <option value="/">Division</option>
            </select>

            <button onClick={handleCalculate}>
                Calculate
            </button>

            <button onClick={handleReset}>
                Reset
            </button>

            <p>Result: {result}</p>
        </div>
    );
}

export default Calculate;
