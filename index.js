function task1() {
  const string = "Node.js course";
  console.log(`Task 1. Lenght: ${string.length}`);
}

function task2(number) {
  const title = "Task 2.";
  if (isNaN(number)) {
    console.log(`${title} Parameter is Not a Number!`);
    return false;
  }
  const result = Number(number).toString().length * number;
  console.log(`${title} Result: ${result}`);
  return result;
}

task1();
task2(33);
