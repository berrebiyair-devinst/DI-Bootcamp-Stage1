import {useSelector} from 'react-redux'
import { TodoItem } from './TodoItem'

export const TodoList =() => {
  const todos = useSelector(state => state.todos.todos)
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}