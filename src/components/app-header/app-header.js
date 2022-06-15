import React from "react";
import "./app-header.css";

function AppHeader({ toDo, done }) {
  return (
    <div className="app-header d-flex">
      <h1>My To-do List</h1>
      <h2>
        {toDo} more to do, {done} done{" "}
      </h2>
    </div>
  );
}

export default AppHeader;
