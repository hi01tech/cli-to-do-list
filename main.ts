#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


let todos:string[] = [];
let condition = true;

// print a welcome message
console.log(chalk.rgb(0,0,255).bold('\n\t\t     <<<==================================>>>\n\t'));
console.log(chalk.rgb(154,240,0).bold(`\t<<<========== `+chalk.rgb(169,255,47).bold(`Welcome To "hi01tech" TO-DO Application`)+chalk.rgb(154,240,0).bold( ` ==========>>>\n\t`)));
console.log(chalk.rgb(0,0,255).bold('\t\t     <<<==================================>>>\n\t'));


let main = async () =>{
  while(condition){
    let options = await inquirer.prompt(
      [
       {
         name:"option",
         type: "list",
         message:"Choose an option: ",
         choices:["Add Task","Delete Task","Update Task", "View List", "Exit" ]
       } 
      ] 
    );

    // conditional statments for choices
    if(options.option === "Add Task"){
      await addTask()
    }
    else if(options.option === "Delete Task" ){
      await deleteTask()
    }
    else if(options.option === "Update Task" ){
      await updateTask()
    }
    else if(options.option === "View List" ){
      await viewTask()
    }
    else if(options.option ===  "Exit" ){
      await exit()
    }
  }
};

// Function to add new tasks
let addTask = async() => {
 
 let newTask = await inquirer.prompt(
   [
      {
       name:"task",
        type: "input",
       message:"Enter new Task: "
      }
   ] 
  );
 todos.push(newTask.task)  // push task to todo list
 console.log(chalk.rgb(154,240,0)(`${newTask.task}`), ` task Added to TO-DO list\n`);
}


// Function to view all tasks of todo list
let viewTask = async() => {
   console.log('\n' ,chalk.rgb(154,240,0) ('Your TO-DO list: ') ,'\n' );
   todos.forEach((task, index) => {
    console.log(chalk.rgb(154,240,0)(`${index +1}: `)+ chalk.rgb(241,179,179)( `${task}`) );

  });
  console.log('\n');
  
}

// Function to exit todo list
let exit = () => {
  (condition = false)
  console.log(chalk.rgb(7,185,252)`\nYou Exit sucessfully!!`);
  
}

//Function to delete todo list task
let deleteTask = async() =>  {
  await viewTask()
  let taskIndex = await inquirer.prompt([
    {
     name:"index",
     type: "number",
     message:"Enter the task 'No.' you want to delete: "
    }
  
  ]);
  let deleteTask = todos.splice((taskIndex.index - 1), 1);
  console.log(chalk.rgb(241,179,179)(`\n"${deleteTask}"`+chalk.rgb(7,185,252) ` task deleted sucessfully from To-Do List!!\n`+chalk.rgb(241,179,179) `\n\n[For Updated list check option "View List"]\n`));
}

//Function to update task of todo list
let updateTask = async() => {
  await viewTask()
  let update_task_index = await inquirer.prompt([
    {
      name: "updateIndex",
      type: "number",
      message:"Enter task 'No.' you want to update: "
    },
    {
      name: "new_task",
      type:'input',
      message:"Enter new task name : "
    }
  ]);
  // let updateTask = todos.splice((update_task_index.updateIndex - 1), 1 , update_task_index.new_task);
  todos[update_task_index.updateIndex - 1] = update_task_index.new_task
  console.log( chalk.rgb(7,185,252) (`\nTask `) +chalk.rgb(241,179,179)(`"No.${update_task_index.updateIndex }"`) + chalk.rgb(7,185,252) (`updated sucessfully!!`) +chalk.rgb(241,179,179) `\n\n[For Updated list check option "View List"]\n`);
}

 
main()

