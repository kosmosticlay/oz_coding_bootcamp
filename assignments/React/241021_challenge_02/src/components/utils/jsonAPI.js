import axios from "axios";

const addTodo = async (newTodo) => {
  try {
    const response = await axios.post("http://localhost:3000/todos", newTodo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const addedTodo = response.data;
    console.log("Added Todo:", addedTodo);
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

const getTodos = async () => {
  try {
    const response = await axios.get("http://localhost:3000/todos");
    const todos = response.data;
    // console.log("Fetched Todos:", todos);
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

const updateTodo = async (todoId, updatedFields) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/todos/${todoId}`,
      updatedFields,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

const deleteTodo = async (todoId) => {
  try {
    await axios.delete(`http://localhost:3000/todos/${todoId}`);
    // console.log(`Deleted Todo with ID: ${todoId}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

export { addTodo, getTodos, updateTodo, deleteTodo };
