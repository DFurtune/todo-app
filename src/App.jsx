import React from "react";

import Todos from "./components/Todos/Todos";

import './App.css'

export default function App() {
  return (
    <div className="app">
      <h1>My ToDo App</h1>
      <Todos />
    </div>
  );
}
