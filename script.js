let input = document.querySelector(".desc input")
let amount = document.querySelector(".amounts")
let submitBtn = document.querySelector("button")
let tranList = document.querySelector(".transactions ul");
let income = document.querySelector(".income .num");
let expense = document.querySelector(".expense .num");
let balance = document.querySelector(".balance");

let arrayOfTasks = JSON.parse(localStorage.getItem("tasks")) || []

makeSum(arrayOfTasks);

submitBtn.addEventListener("click", function () {

  if (input.value == "") {
    return
  }
  addTask(input.value, amount.value)

  input.value = "";
  amount.value = "";
})

function addTask(inputText, amountValue) {
  const task = {
    id: Date.now(),
    title: inputText,
    num: amountValue,
  }

  arrayOfTasks.push(task)

  addElementsToArray(arrayOfTasks)

  addData(arrayOfTasks);

  makeSum(arrayOfTasks);
}

function addElementsToArray(arrayOfTasks) {
  tranList.innerHTML = "";

  arrayOfTasks.forEach(function (task) {
    let li = document.createElement("li");
    li.classList.add("transaction");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `
    <span class="text">${task.title}</span>
    <div class="edit">
      <span class="count">$${Number(task.num).toFixed(2)}</span>
      <span class="del">X</span>
    </div>
    `;
    tranList.appendChild(li)

    if (Number(task.num) < 0) {
      li.classList.add("exp")
    }
  })
}

function makeSum(arrayOfTasks) {
  let balanceValue = 0;

  for (let i = 0; i < arrayOfTasks.length; i++) {
    balanceValue += Number(arrayOfTasks[i].num);
  }

  balance.textContent = "$" + balanceValue;

  let incomeValue = 0;
  let expenseValue = 0;

  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (Number(arrayOfTasks[i].num) >= 0) {
      incomeValue += Number(arrayOfTasks[i].num)
    } else if (Number(arrayOfTasks[i].num) < 0) {
      expenseValue += Number(arrayOfTasks[i].num);
    }
  }

  income.textContent = "$" + incomeValue
  expense.textContent = "$" + expenseValue
}

tranList.addEventListener("click", function (e) {
  if (e.target.classList.contains("del")) {
    arrayOfTasks = arrayOfTasks.filter(function (task) {
      return e.target.parentElement.parentElement.getAttribute("data-id") != task.id
    })
    e.target.parentElement.parentElement.remove()

    addData(arrayOfTasks);
    makeSum(arrayOfTasks);
  }
})

function addData(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getData() {
  addElementsToArray(JSON.parse(localStorage.getItem("tasks")));
}

getData()