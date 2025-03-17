import React from "react";

const AddButton = (props) => {
  const { handleAdd } = props;
  const [todo, setTodo] = React.useState("");
  return (
    <div className="todoAdd">
      <input
        className="todoInput"
        type="text"
        id="add-todo-input"
        onChange={(e) => {
          setTodo(e.target.value || "");
        }}
        value={todo}
      />
      <button
        onClick={() => {
          if (!todo) {
            return;
          }
          handleAdd(todo);
          setTodo("");
        }}
      >
        +
      </button>
    </div>
  );
};

export default AddButton;
