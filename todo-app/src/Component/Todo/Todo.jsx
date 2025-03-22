import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import {
  fetchTodo,
  addItem,
  editItem,
  deleteItem,
} from "../../redux/slices/todoSlice";
import styles from "./Todo.module.css";

const Todo = () => {
  const dispatch = useDispatch();
  const { isLoading, data, isError, localData } = useSelector(
    (state) => state.todos
  );
  const [newTodo, setNewToDo] = useState("");

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const handleChange = (e) => {
    setNewToDo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.length > 0) {
      dispatch(addItem(newTodo));
      setNewToDo("");
    }
  };

  const combinedData = [...data.slice(0, 10), ...localData];

  return (
    <div className={styles.todoContainer}>
      {isLoading ? (
        <ClipLoader
          color="#ffffff"
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : isError ? (
        <h2 className={styles.errorMessage}>Failed to load todos</h2>
      ) : (
        <div className={styles.todoList}>
          <h2 className={styles.todoHeader}>Todo List</h2>

          <form className={styles.todoForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add a new todo..."
              onChange={handleChange}
              value={newTodo}
              className={styles.todoInput}
            />
            <button type="submit" className={styles.todoButton}>
              Add Todo
            </button>
          </form>

          <ul className={styles.todoItems}>
            {combinedData.map((todo) => (
              <li key={todo.id} className={styles.todoItem}>
                <span className={styles.todoText}>{todo.title}</span>
                <div className={styles.todoActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => {
                      const newTitle = prompt("Edit todo", todo.title);
                      if (newTitle) {
                        dispatch(editItem({ id: todo.id, title: newTitle }));
                      }
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className={styles.deleteButton}
                    onClick={() => dispatch(deleteItem(todo.id))}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Todo;
