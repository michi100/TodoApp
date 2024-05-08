import React from 'react';

const DeletedTodoList = ({ deletedTodos }) => {
  return (
    <div>
      {deletedTodos.map((todo) => (
        <div key={todo.id}>
          <input type="checkbox" checked={true} readOnly />
          <span>{todo.name}</span>
        </div>
      ))}
    </div>
  );
};

export default DeletedTodoList;
