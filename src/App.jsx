import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoContainer from "./components/TodoContainer";

function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);
  return (
    <div className=" ">
      <Header theme={theme} setTheme={setTheme} />
      <div
        className={`bg-[#fafafa] fadas ${
          theme === "light"
            ? "bg-[#fafafa] fades"
            : "bg-[hsl(235,_21%,_11%)] fades"
        } w-full min-h-screen  dark:bg-[#161722] dark:text-white`}
      >
        <TodoContainer theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}

export default App;
