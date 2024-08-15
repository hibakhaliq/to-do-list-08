#! /usr/bin/env node
import inquirer from "inquirer";
import moment from "moment";
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
            message: "Please enter your due date for this task (YYYY-MM-DD):",
            type: "input",
            validate: function (value) {
                let isValid = moment(value, "YYYY-MM-DD", true).isValid();
                return isValid || "Please enter a valid date in the format YYYY-MM-DD.";
            }
        },
        {
            name: "addMore",
            type: "confirm",
            message: "Do you want to add more?",
            default: "false"
        }
    ]);
    todo.push({
        task: addTask.todo,
        priority: addTask.priority,
        dueDate: addTask.dueDate,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
    });
    condition = addTask.addMore;
}
function checkReminders() {
    let today = moment().format("YYYY-MM-DD");
    let dueTasks = todo.filter(task => task.dueDate === today);
    if (dueTasks.length > 0) {
        console.log("\n🔔 Task Reminder: You have tasks due today! 🔔\n");
        dueTasks.forEach(task => {
            console.log(`- ${task.task} (Priority: ${task.priority})`);
        });
    }
    else {
        console.log("\n🎉 No tasks due today. You're all caught up! 🎉\n");
    }
}
checkReminders(); // Call this function to check reminders
console.log(todo); // Optional: Log the tasks for reference
