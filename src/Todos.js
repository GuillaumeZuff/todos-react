import React from "react";
import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import "./Todo.css";

const loadTodos = () => {
  const todosStr = window.localStorage.getItem("todos");
  if (todosStr) {
    const todosParsed = JSON.parse(todosStr);
    return todosParsed || [];
  }
  return [];
};

function saveTodos(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

const Todo = (props) => {
  const { todo, toggleDone, handleDelete } = props;
  const date = new Date(todo.date);
  return (
    <div className="todo">
      <div
        className={todo.done ? "todoLabelDone" : "todoLabel"}
        onClick={() => {
          toggleDone();
        }}
      >
        <div>{todo.label}</div>
        <div className="todoDate">
          <i>
            {date.getDay()}.{date.getMonth() + 1}.{date.getFullYear()}
          </i>
        </div>
      </div>
      <DeleteButton handleClick={handleDelete} />
    </div>
  );
};

const Todos = (props) => {
  const [todos, setTodos] = React.useState([]);
  React.useEffect(() => {
    setTodos(loadTodos());
  }, []);
  const updateTodos = (newTodos) => {
    setTodos(newTodos);
    saveTodos(newTodos);
  };
  return (
    <div className="todosList">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          toggleDone={() => {
            updateTodos(
              todos.map((t) => {
                if (t.id === todo.id) {
                  return {
                    ...t,
                    done: !todo.done,
                  };
                } else {
                  return t;
                }
              })
            );
          }}
          handleDelete={() => {
            updateTodos(todos.filter((t) => t.id !== todo.id));
          }}
        />
      ))}
      <AddButton
        handleAdd={(todo) => {
          updateTodos([
            ...todos,
            {
              id: todos.reduce((acc, todo) => Math.max(acc, todo.id), 0) + 1,
              label: todo,
              date: new Date(),
              done: false,
            },
          ]);
        }}
      />
    </div>
  );
};

export default Todos;
