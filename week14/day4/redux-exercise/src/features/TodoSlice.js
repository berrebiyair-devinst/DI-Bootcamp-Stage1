import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  todos: [],
}

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    }
  }
})

export const {addTodo, toggleTodo, removeTodo} = TodoSlice.actions
export default TodoSlice.reducer