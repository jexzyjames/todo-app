import React,{useEffect}from "react";
import check from "../assets/images/icon-check.svg";
import cross from "../assets/images/icon-cross.svg";
import { useState } from "react";
const TodoContainer = ({theme}) => {
  const [todo, setTodo] = useState("");

  const [pages, setPages] = useState("all"); 
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete the project", completed: false },
    { id: 2, text: "Read a book", completed: true },
    { id: 3, text: "Go for a walk", completed: false },
  ]);
  useEffect(() => {
    const storedTodos = localStorage.getItem('TODOS');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));   
    }
    else {
      localStorage.setItem('TODOS', JSON.stringify(todos));
    }


  }, []);
  
  useEffect(()=>{
    localStorage.setItem('TODOS', JSON.stringify(todos))
  },[todos, theme])
  const handleAddTodo = () => {
    if (todo.trim() === "") return; 
    const newTodo = {
      id: Date.now(), 
      text: todo,
      completed: false,
    };
    if (todos.some((t) => t.text === newTodo.text)) {
      alert("Todo already exists");
      return; 
    }
    setTodos([...todos, newTodo]);
    localStorage.setItem('TODOS', JSON.stringify(todo));
    setTodo(""); 

  };
  return (
    <div className="flex fades flex-col mt-[-90px] justify-center md:mt-[-90px]  z-1000 relative w-full md:p-0 mx-auto  max-w-lg items-center md:mx-auto">
      <div className={`fades ${theme === 'light' ? 'bg-white fades !text-black' : 'fades bg-[hsl(235,_24%,_19%)] !text-white'} fades  relative w-[90%] shadow-md mb-4 md:w-full md:!mx-[26px] md:max-w-[450px] rounded-sm flex justify-start gap-4 px-4  py-3`}>
        <input className="" checked={false} type="radio" name="todo" />
        <input
          className=" border-0 outline-0 "
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleAddTodo();
            }
          }}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="Create a new note"
        />
      </div>

      <div className="md:w-full w-[90%]  mx-auto flex justify-center items-center flex-col md:max-w-[450px]">
        {todos.length > 0 && todos.map((todo) => (
          <div className={`w-full  md:mx-auto fades  ${theme === 'light' ? '!bg-white border border-t-0 border-r-0 border-l-0 border-b-[#999] fades text-black ' : 'text-white  border-[1px]  border-b-[#fafafa28] border-t-0 border-r-0 border-l-0 fades bg-[hsl(235,_24%,_19%)]'}  `} key={todo.id}>

            {pages === "active" && !todo.completed && (
              <div
                key={todo.id}
                onClick={()=>{
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t
                    )
                  ); 
                }}
                className=" rounded-sm flex justify-start gap-4 items-center px-4 py-3 mt-1 "
              >
                <input type="radio" checked={todo.completed} className='cursor-pointer' />
                {todo.completed && (
                  <img
                    className="rounded-full p-1 bg-[linear-gradient(to_right,_hsl(192,_100%,_67%),_hsl(280,_87%,_65%))]"
                    src={check}
                    alt=""
                  />
                )}
                <span
                  className={`${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <img
                  src={cross}
                  onClick={()=>{
                    // setTodos([])
                    setTodos(todos.filter((t) => t.id !== todo.id)); 
                    
                      localStorage.setItem('TODOS', JSON.stringify(todos));

               
                  }}
                  alt="delete"
                  className="ml-auto cursor-pointer"
                />
              </div>
            )}

            {pages === "completed" && todo.completed && (
              <div
                key={todo.id}
                className=" rounded-sm flex justify-start gap-4 items-center px-4 py-3 mt-1"
              >
               {todo.completed === 'false' && <input type="radio" checked={todo.completed} className='cursor-pointer' />}
                {todo.completed && (
                  <img
                    className="rounded-full p-1 bg-[linear-gradient(to_right,_hsl(192,_100%,_67%),_hsl(280,_87%,_65%))]"
                    src={check}
                    alt=""
                  />
                )}
                <span
                  className={`${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <img
                  src={cross}
                  alt="delete"
                  onClick={()=> {
                    setTodos(todos.filter((t) => t.id !== todo.id)); 

                  }}
                  className="ml-auto cursor-pointer"
                />
              </div>
            )}

            {pages === "all" && (
              <div
                key={todo.id}
                className="  rounded-sm flex justify-start gap-4 items-center px-4 py-3 mt-1"
              >
               {todo.completed === 'false' || !todo.completed && <input type="radio" checked={todo.completed} className='cursor-pointer' />}
                {todo.completed && (
                  <img
                    className="rounded-full p-1 bg-[linear-gradient(to_right,_hsl(192,_100%,_67%),_hsl(280,_87%,_65%))]"
                    src={check}
                    alt=""
                  />
                )}
                <span
                onClick={()=>{
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t
                    )
                  ); 
                }}
                  className={` cursor-pointer${
                    todo.completed ? " italic line-through  cursor-pointer text-gray-400" : " cursor-pointer"
                  }`}
                >
                
                  {todo.text}
                </span>
                <img
                  src={cross}
                   onClick={()=> {
                    setTodos(todos.filter((t) => t.id !== todo.id));

                  }}
                  alt="delete"
                  className="ml-auto cursor-pointer"
                />
              </div>
            )}
          </div>
        ))}

        <div className="flex md:w-full justify-between md:justify-center items-center">
          {todos.length === 0 ? (
            <div className="bg-white shadow-lg rounded-sm flex justify-center items-center px-4 py-3 mt-2">
              <span className="text-gray-400">No todos available</span>
            </div>
          ) :
            <div className={` ${theme === 'light' ? 'bg-white' : 'bg-[hsl(235,_24%,_19%)] text-white'}  shadow-lg rounded-sm flex max-w-[400px] w-[350px] md:mx-auto md:justify-start gap-3 md:w-full items-center px-4 py-3 mt-2`}>
              <span className="text-gray-400">
                {todos.length} {todos.length === 1 ? "todo" : "items left"} 
              </span>

               <div
          className={`md:flex hidden     p-2 gap-2 font-semibold text-gray-400 justify-between`}
        >
          <p
          className={` cursor-pointer ${pages === "all" ? "text-blue-500 cursor-pointer" : "cursor-pointer"}`} // Highlight 'active' page

            onClick={() => {
              setPages("all"); 
            }}
          >
            All
          </p>
          <p
          className={` cursor-pointer ${pages === "active" ? "text-blue-500 cursor-pointer" : "cursor-pointer"}`} // Highlight 'active' page
            onClick={() => {
              setPages("active"); 
            }}
          >
            Active
          </p>
          <p
          className={`cursor-pointer ${pages === "completed" ? "text-blue-500 cursor-pointer" : "cursor-pointer"}`} // Highlight 'active' page
            onClick={() => {
              setPages("completed"); 
            }}
          >
            Completed
          </p>
        </div>

              <span className="text-gray-400 md:ml-0 ml-auto cursor-pointer">Clear completed</span>
            </div>
        
        }
        </div>

        <div
          className={`flex w-full md:hidden mt-5 ${theme === 'light' ? 'bg-white' : 'bg-[hsl(235,_24%,_19%)] text-white'}   rounded-sm shadow-sm p-2 gap-4 font-semibold text-gray-400 justify-center`}
        >
          <p
          className={`cursor-pointer ${pages === "all" ? "text-blue-500" : ""}`}

            onClick={() => {
              setPages("all"); 
            }}
          >
            All
          </p>
          <p
          className={` cursor-pointer ${pages === "active" ? "text-blue-500" : ""}`}
            onClick={() => {
              setPages("active"); 
            }}
          >
            Active
          </p>
          <p
          className={`cursor-pointer ${pages === "completed" ? "text-blue-500" : ""}`} 
            onClick={() => {
              setPages("completed"); 
            }}
          >
            Completed
          </p>
        </div>

      </div>
    </div>
  );
};

export default TodoContainer;
