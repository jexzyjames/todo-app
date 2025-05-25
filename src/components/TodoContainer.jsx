import React,{useEffect}from "react";
import check from "../assets/images/icon-check.svg";
import cross from "../assets/images/icon-cross.svg";
import { useState } from "react";
const TodoContainer = ({theme}) => {
  const [todo, setTodo] = useState("");
  const[newTodo, setMewTodo] = useState(todo);

  const [pages, setPages] = useState("all"); // State to manage the current page (all, active, completed)
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete the project", completed: false },
    { id: 2, text: "Read a book", completed: true },
    { id: 3, text: "Go for a walk", completed: false },
  ]);
  
  useEffect(()=>{
    localStorage.setItem('TODOS', JSON.stringify(todo))
  },[todos, theme])
  const handleAddTodo = () => {
    if (todo.trim() === "") return; // Prevent adding empty todos
    const newTodo = {
      id: Date.now(), // Unique ID based on timestamp
      text: todo,
      completed: false,
    };
    if (todos.some((t) => t.text === newTodo.text)) {
      alert("Todo already exists");
      return; // Prevent adding duplicate todos
    }
    setTodos([...todos, newTodo]);
    setTodo(""); // Clear input field after adding
      localStorage.setItem('TODOS', JSON.stringify(todo));

  };
  return (
    <div className="flex fades flex-col mt-[-90px] justify-center md:mt-[-90px]  z-1000 relative w-full md:p-0 mx-auto  max-w-lg items-center md:mx-auto">
      <div className={`fades ${theme === 'light' ? 'bg-white fades !text-black' : 'fades bg-[hsl(235,_24%,_19%)] !text-white'} fades  relative w-[90%] shadow-md mb-4 md:w-full md:!mx-[26px] md:max-w-[450px] rounded-sm flex justify-start gap-4 px-4  py-3`}>
        <input className="" type="radio" name="todo" />
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

      <div className="md:w-full w-[90%]  mx-auto flex justify-center items-center flex-col gap-2 md:max-w-[450px]">
        {todos.length > 0 && todos.map((todo) => (
          <div className={`w-full md:mx-auto fades  ${theme === 'light' ? '!bg-white fades text-black ' : 'text-white fades bg-[hsl(235,_24%,_19%)]'}  `} key={todo.id}>

            {pages === "active" && !todo.completed && (
              <div
                key={todo.id}
                className=" shadow-lg  flex justify-start gap-2 items-center px-4 py-2 "
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
                    
                      localStorage.setItem('TODOS', JSON.stringify(newTodo));

               
                  }}
                  alt="delete"
                  className="ml-auto cursor-pointer"
                />
              </div>
            )}

            {pages === "completed" && todo.completed && (
              <div
                key={todo.id}
                className=" shadow-lg rounded-sm flex justify-start gap-4 items-center px-4 py-3 mt-2"
              >
                {/* <input type="radio" checked={todo.completed} className='cursor-pointer' /> */}
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
                {/* <input type="radio" checked={todo.completed} className='cursor-pointer' /> */}
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
                  ); // Toggle the completed state of the todo
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
                    setTodos(todos.filter((t) => t.id !== todo.id)); // Remove the todo

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
            <div className={` ${theme === 'light' ? 'bg-white' : 'bg-[hsl(235,_24%,_19%)] text-white'}  shadow-lg rounded-sm flex w-[380px] mx-auto md:justify-between gap-3 md:w-full items-center px-4 py-3 mt-2`}>
              <span className="text-gray-400">
                {todos.length} {todos.length === 1 ? "todo" : "items left"} 
              </span>

               <div
          className={`md:flex hidden     p-2 gap-2 font-semibold text-gray-400 justify-between`}
        >
          <p
          className={`${pages === "all" ? "text-blue-500 " : "cursor-pointer"}`} // Highlight 'active' page

            onClick={() => {
              setPages("all"); // Set the current page to 'all'
            }}
          >
            All
          </p>
          <p
          className={`${pages === "active" ? "text-blue-500" : "cursor-pointer"}`} // Highlight 'active' page
            onClick={() => {
              setPages("active"); // Set the current page to 'active'
            }}
          >
            Active
          </p>
          <p
          className={`${pages === "completed" ? "text-blue-500" : "cursor-pointer"}`} // Highlight 'active' page
            onClick={() => {
              setPages("completed"); // Set the current page to 'completed'
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
          className={`${pages === "all" ? "text-blue-500" : ""}`} // Highlight 'active' page

            onClick={() => {
              setPages("all"); // Set the current page to 'all'
            }}
          >
            All
          </p>
          <p
          className={`${pages === "active" ? "text-blue-500" : ""}`} // Highlight 'active' page
            onClick={() => {
              setPages("active"); // Set the current page to 'active'
            }}
          >
            Active
          </p>
          <p
          className={`${pages === "completed" ? "text-blue-500" : ""}`} // Highlight 'active' page
            onClick={() => {
              setPages("completed"); // Set the current page to 'completed'
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
