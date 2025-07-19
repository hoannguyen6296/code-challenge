// # Task

// Provide 3 unique implementations of the following function in TypeScript.

// - Comment on the complexity or efficiency of each function.

// **Input**: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

// Thingking process:
// 1. Use the mathematical formula for the sum of the first n natural numbers.
// 2. Use a loop to iterate from 1 to n and accumulate the sum : for and reduce
// 3. Use recursion to sum the numbers from 1 to n.
// Additionally, I thinking of using Array.from to create an array in a specific range
// So the test cases can be more dynamic and also we could also understand
// the theory as sum number in array from 1 to n.
// However to keep the input as the requirement, I will leave the method interface as `sum_to_n(n: number): number`
// and handle the Range create in another function.
// you can change the test cases by changing the variable sesssion


console.log('problem 4 started');
// variable use for testing
const testNumber = 1000;

// Default values for the range function to apply for all functions, change it here
// Hower Step variable wont effect method
const defaultStep = 1;
const defaultStart = 1;
const defaultStop = 5;

const arrayRange = ({
  start = defaultStart,
  stop = defaultStop,
  step = defaultStep,
}: { start?: number, stop?: number, step?: number }): number[] =>
  Array.from(
    { length: Math.floor((stop - start) / step) + 1 },
    (_, index) => start + index * step,
  );

const sum_to_n_a = (n: number): number => {
    
  // Using the mathematical formula for the sum of the first n natural numbers
  // Complexity: O(1) - constant time complexity, as it uses a direct formula
  // Efficiency: Very efficient, as it does not require iteration or recursion
  if (n <= 1) return Math.max(0, n);
  // this will be the simple return
  // **return (n * (n + 1)) / 2**

  // Dynamic range apply
  // Step should be 1, so we can use the formula
  const myNums = arrayRange({ stop: n, step: 1});

  // In case we change the ranage and dont want to start from 1, we will have the new formula is
  // (stop * (stop + 1)) / 2 - (start * (start - 1)) / 2
  const firstValue = myNums[0];
  const lastValue = myNums[myNums.length - 1];
  const result = ((lastValue * (lastValue + 1)) - (firstValue * (firstValue - 1))) / 2;

  // This method has some limitations as the step must be 1 and some dynamic range wont work for it.
  // Use this if you want the best performance.
  return result;
};

const sum_to_n_b = (n: number): number => {
  // Using a for loop to iterate from 1 to n and accumulate the sum
  // Complexity: O(n) - linear time complexity, as it iterates through n elements
  // Efficiency: Less efficient than the mathematical formula, as it requires iteration
  if (n <= 1) return Math.max(0, n);
  const myNums = arrayRange({ stop: n});
  let result = 0;
  /* eslint-disable @typescript-eslint/prefer-for-of */
  for (let i = 0; i < myNums.length; i++) {
    result += myNums[i];
  }
  // I like this method as it is simple and easy to understand for all levels of developers
  // IT is also can work with any dynamic range since it sum case by case
  // Use this if you want to cover every case and not just the simple one
  return result;
};

const sum_to_n_b_2 = (n: number): number => {
  if (n <= 1) return Math.max(0, n);
  // Using reduce to sum an array of numbers from 1 to n
  // Complexity: O(n) - linear time complexity, as it iterates through n elements
  // Efficiency: Similar to the for loop, but may be less efficient due to function calls
  // However, I would say it is more fancy and modern way to do it 
  // Use this if performance is not a critical factor.
  const myNums = arrayRange({ stop: n});
  const sum = myNums.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  },0);
  return sum;
};

const sum_to_n_c = (n: number): number => {
  if (n <= 1) return Math.max(0, n);
  // Using recursion to sum the numbers from 1 to n
  // Complexity: O(n) - linear time complexity, as it makes n recursive calls
  // Efficiency: Less efficient than the for loop or reduce, as it involves function call overhead
  // This method is not recommended for large n due to potential stack overflow issues
  // Use this if you want to give other members an example of recursion.
  return n + sum_to_n_c(n - 1);
};

function triggerHandler(fn: (n: number) => number, n: number, label: string) {
  const startTime = performance.now(); // Get the high-resolution start time
  const result = fn(n);
  const endTime = performance.now(); // Get the high-resolution end time
  const executionTime = endTime - startTime;
  console.log(`Result for ${label}: ${result} || execution time: ${executionTime} ms`);
}

triggerHandler(sum_to_n_a, testNumber, 'sum_to_n_a');
triggerHandler(sum_to_n_b, testNumber, 'sum_to_n_b');
triggerHandler(sum_to_n_b_2, testNumber, 'sum_to_n_b_2 ');
triggerHandler(sum_to_n_c, testNumber, 'sum_to_n_c');
