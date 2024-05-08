import { useState, useRef } from "react"; // 変数の監視
import TodoList from "./TodoList";
import DeletedTodoList from "./DeletedTodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]);
  
  const todoNameRef = useRef();

  const handleAddTodo = () => {
    // タスクを追加する
    const name = todoNameRef.current.value;
    if(name === "") return;
    setTodos((prevTodos) => {
      return [{id: uuidv4(), name: name, completed: false}, ...prevTodos]
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  // const handleClear = () => {
  //   const newTodos = todos.filter((todo) => !todo.completed);
  //   setTodos(newTodos);
  // };
  const handleClear = () => {
    const newTodos = todos.filter((todo) => {
      if (todo.completed) {
        setDeletedTodos((prevDeletedTodos) => [todo, ...prevDeletedTodos]);
      }
      return !todo.completed;
    });
    setTodos(newTodos);
  };

  return(
    <>
      <input type="text" ref={todoNameRef}/>
      <button onClick={handleAddTodo}>タスクを追加</button>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.length}</div>
      <hr></hr>
      <DeletedTodoList deletedTodos={deletedTodos} />
      <div>削除されたタスク:{deletedTodos.length}</div>
    </>
  );
}

export default App;
