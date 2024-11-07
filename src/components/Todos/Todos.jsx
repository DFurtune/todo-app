import React, { useState } from "react";
import TodosForm from "../TodosForm/TodosForm";
import TodosList from "../TodosList/TodosList";

import './Todos.css'

export default function Todos({ liftingNewTodoToApp }) {
  const [newTodo, setNewTodo] = useState({});

  const liftedNewTodo = (item) => {
    setNewTodo(item);
  };

  return (
    <div className="todos">
      <TodosForm liftingNewTodo={liftedNewTodo} />
      <TodosList newTodo={newTodo} />
    </div>
  );
}
