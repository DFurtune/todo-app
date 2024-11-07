import React, { useState, useEffect, useMemo } from "react";
import service from "./../../services/todos";
import "./TodosList.css";

export default function TodosList({ newTodo }) {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);

  const getTodos = async () => {
    const response = await service.get();
    setTodos(response);
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (Object.keys(newTodo).length) getTodos();
  }, [newTodo]);

  const sortedTodos = useMemo(
    () => todos.sort((a, b) => b.priority - a.priority),
    [todos]
  );

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = sortedTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const getClassName = (item) => {
    const classes = [`todos__item`];
    if (item.priority) classes.push(`todos__item--priority`);
    if (item.active) classes.push(`todos__item--active`);
    return classes.join(` `);
  };

  const handleItemDelete = async (e, id) => {
    e.stopPropagation();
    await service.delete(id);
    getTodos();
  };

  const handleChangePriority = async (e, item) => {
    e.stopPropagation();
    await service.put(item.id, { ...item, priority: !item.priority });
    getTodos();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedTodos.length / todosPerPage);

  return (
    <>
      {currentTodos.length ? (
        <ul className="todos__list">
          {currentTodos.map((item) => (
            <li key={item.id} className={getClassName(item)}>
              <span>{item.title}</span>
              <button onClick={(e) => handleItemDelete(e, item.id)}>
                Delete
              </button>
              <input
                type="checkbox"
                checked={item.priority}
                onChange={(e) => handleChangePriority(e, item)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No Todos available</p>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
