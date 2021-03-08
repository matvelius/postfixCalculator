// ID успешной посылки: 49260420

// ПРИНЦИП РАБОТЫ

// Обратная польская (или постфиксная) нотация ставит знаки операций после операндов.
// Предложенный алгоритм использует структуру данных стек, которая идеально подходит для
// работы с элементами в обратном порядке их добавления.

// Считав число, программа добавляет его на вершину стека. А если на входе знак операции,
// то из стека извлекаются верхние два элемента, выполняется заданная операция, и 
// результат добавляется на вершину стека.

// Эти операции повторяются, пока не прочитана вся входная строка. После этого программа
// извлекает верхний элемент - это и есть конечный результат всех заданных действий.


// ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ

// Стек реализован с помощью связного списка c переменной, отслеживающей начало списка.

// Добавление нового элемента создает новый узел и ставит его в начало списка. 

// Функция извлечения элемента сначала проверяет, есть ли что извлекать (и если нет, то
// выдаёт ошибку), и затем либо меняет переменную headNode на headNode.next, либо если
// в стеке остался только один элемент, меняет headNode.value на null.

// Сложение, вычитание и умножение производятся за счёт встроенной функции eval, которая
// преобразует строку в математическое выражение и возвращает его решение.

// Для деления нужен специальный подход, так как данная задача требует использовать 
// целочисленное деление: округление всегда происходит вниз, даже для отрицательных чисел.
// Если оба числа являются положительными или отрицательными, используется функция
// Math.floor, округляющая результат вниз, а если только одно из них отрицательное, тогда 
// Math.ceil, которая округляет вверх (после чего результат умножается на -1).


// ВРЕМЕННАЯ СЛОЖНОСТЬ

// Мой алгоритм использует только один цикл и временная сложность линейно зависит от 
// длины строки на входе, т.е. O(n).


// ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ

// Используемый стек в худшем случае будет хранить примерно половину элементов, которые
// подаются на вход, так как оставшуюся половину занимают знаки операций, т.е. O(n/2),
// что можно упростить до O(n).

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

class Node {
  constructor(value = null, next = null) {
    this.value = value
    this.next = next
  }
}

class Stack {
  constructor(headNode = new Node()) {
    this.headNode = headNode
  }

  push(value) {
    // new node becomes the head node, pointing to what used to be the head node
    this.headNode = new Node(value, this.headNode)
  }

  pop() {
    let poppedValue = this.headNode.value
    if (poppedValue == null) { // nothing to pop
      console.log("error: nothing to pop")
      return
    } else if (this.headNode.next == null) { // only the head node exists, so set its value to null
      this.headNode.value = null
    } else {
      this.headNode = this.headNode.next // switch head node to the next element
    }

    return poppedValue
  }
}

rl.on('line', function (line) {
  let inputArray = line.split(' ')
  let inputArrayLength = inputArray.length

  let stack = new Stack()


  for (let i = 0; i < inputArrayLength; i++) {
    let item = inputArray[i]
    let itemAsInt = parseInt(item)

    if (itemAsInt || itemAsInt == 0) { // operand

      stack.push(itemAsInt)

    } else { // operator

      let num2 = stack.pop()
      let num1 = stack.pop()

      let result

      if (item === "/") {
        // if one of the numbers is negative
        if ((Math.sign(num1) == -1 && Math.sign(num2) == 1) || (Math.sign(num1) == 1 && Math.sign(num2) == -1)) {

          result = -1 * Math.ceil(Math.abs(num1) / Math.abs(num2))

        } else {

          result = Math.floor(Math.abs(num1) / Math.abs(num2))

        }

      } else {

        result = eval(`${num1} ${item} ${num2}`)

      }

      stack.push(result == 0 ? 0 : result) // avoiding "-0"
    }
  }

  console.log(stack.pop())

  rl.close()
})


