const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    // VERSIONE 1
    // getTasksToDo(){
    //     const tasksToDo = this.tasks.filter((task)=>{
    //         return task.completed === false;
    //     })
    //     return tasksToDo;
    // }
    // VERSIONE 2
    getTasksToDo(){
        return this.tasks.filter((task)=> task.completed === false);
    }
}

console.log(tasks.getTasksToDo())