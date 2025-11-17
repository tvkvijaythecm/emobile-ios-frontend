import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";

const CalculatorApp = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    
    if (prevValue !== null && operation && !newNumber) {
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(result);
    } else {
      setPrevValue(current);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return a / b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (prevValue !== null && operation) {
      const current = parseFloat(display);
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleNegate = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const Button = ({
    children,
    onClick,
    className = "",
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`h-20 rounded-full text-3xl font-light active:opacity-70 transition-opacity ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="relative w-full min-h-screen bg-black">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-50" />
      <StatusBar />

      <div className="relative z-10 pt-12 pb-4 px-6">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-1 text-blue-500 font-normal"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="relative z-10 flex flex-col justify-end h-[calc(100vh-100px)] px-4 pb-4">
        <div className="text-right text-white text-7xl font-thin mb-4 px-2">
          {display}
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button
            onClick={handleClear}
            className="bg-[#A5A5A5] text-black"
          >
            AC
          </Button>
          <Button
            onClick={handleNegate}
            className="bg-[#A5A5A5] text-black"
          >
            +/-
          </Button>
          <Button
            onClick={handlePercent}
            className="bg-[#A5A5A5] text-black"
          >
            %
          </Button>
          <Button
            onClick={() => handleOperation("÷")}
            className="bg-[#FF9F0A] text-white"
          >
            ÷
          </Button>

          <Button onClick={() => handleNumber("7")} className="bg-[#333333] text-white">
            7
          </Button>
          <Button onClick={() => handleNumber("8")} className="bg-[#333333] text-white">
            8
          </Button>
          <Button onClick={() => handleNumber("9")} className="bg-[#333333] text-white">
            9
          </Button>
          <Button
            onClick={() => handleOperation("×")}
            className="bg-[#FF9F0A] text-white"
          >
            ×
          </Button>

          <Button onClick={() => handleNumber("4")} className="bg-[#333333] text-white">
            4
          </Button>
          <Button onClick={() => handleNumber("5")} className="bg-[#333333] text-white">
            5
          </Button>
          <Button onClick={() => handleNumber("6")} className="bg-[#333333] text-white">
            6
          </Button>
          <Button
            onClick={() => handleOperation("-")}
            className="bg-[#FF9F0A] text-white"
          >
            -
          </Button>

          <Button onClick={() => handleNumber("1")} className="bg-[#333333] text-white">
            1
          </Button>
          <Button onClick={() => handleNumber("2")} className="bg-[#333333] text-white">
            2
          </Button>
          <Button onClick={() => handleNumber("3")} className="bg-[#333333] text-white">
            3
          </Button>
          <Button
            onClick={() => handleOperation("+")}
            className="bg-[#FF9F0A] text-white"
          >
            +
          </Button>

          <Button
            onClick={() => handleNumber("0")}
            className="col-span-2 bg-[#333333] text-white text-left pl-8"
          >
            0
          </Button>
          <Button onClick={handleDecimal} className="bg-[#333333] text-white">
            .
          </Button>
          <Button
            onClick={handleEquals}
            className="bg-[#FF9F0A] text-white"
          >
            =
          </Button>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-20" />
    </div>
  );
};

export default CalculatorApp;