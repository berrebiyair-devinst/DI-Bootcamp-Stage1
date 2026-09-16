import {TodoList} from "./todo.js";

const todolist = new TodoList();

todolist.addTask("Buy groceries");
todolist.addTask("Clean the house");
todolist.addTask("Finish homework");

todolist.completeTask("Clean the house");

console.log(todolist.listTasks());