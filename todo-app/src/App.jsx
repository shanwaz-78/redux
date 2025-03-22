import React from "react";
import { Provider } from "react-redux";
import Todo from "./Component/Todo/Todo";
import { store } from "./redux/store";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Todo />
      </Provider>
    </div>
  );
};

export default App;
