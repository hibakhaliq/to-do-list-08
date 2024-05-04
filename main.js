#! /usr/bin/env node
import inquirer from "inquirer";
let todo = [];
let condition = true;
while (condition) {
    let addTask = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "What do you want to add in your todo"
        },
        {
            name: "priority",
            message: "how important is this task to you?",
            type: "list",
            choices: ["high", "medium", "low"]
        },
        {
            name: "dueDate",
            message: "please enter your due date for this task",
            type: "date"
        },
        {
            name: "addMore",
            type: "confirm",
            message: "Do you want to add more?",
            default: "false"
        }
    ]);
    todo.push(addTask.todo);
    condition = addTask.addMore;
    console.log(todo);
}
;
