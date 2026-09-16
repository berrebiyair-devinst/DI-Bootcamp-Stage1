class TodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push({ task, completed: false });
    }


completeTask(taskName){
    const task = this.tasks.find(t => t.task === taskName);
    if (task) {
        task.completed = true;
    }
}

listTasks() {
    return this.tasks.map(t => `${t.task} - ${t.completed ? 'Completed' : 'Not Completed'}`);
}
}

export { TodoList };