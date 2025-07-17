// # Task

// Provide 3 unique implementations of the following function in TypeScript.

// - Comment on the complexity or efficiency of each function.

// **Input**: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.


console.log('problem 4 started')

const sum_to_n_a = (n: number) => {
    return (n * (n + 1)) / 2
}

const sum_to_n_b = (n: number) => {
    let sum = 0
    for (let i = 0; i <= n; i++) {
        sum += i;
    }
    return sum
}

const sum_to_n_c = (n: number) => {
    if (n === 1) return 1
    while (n > 1) {
        return n + sum_to_n_c(n - 1)
    }
}

console.log(`Using math formular: ${sum_to_n_a(10)}`)
console.log(`Using for loop: ${sum_to_n_b(10)}`)
console.log(`Using recursive: ${sum_to_n_c(10)}`)