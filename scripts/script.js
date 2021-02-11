'use strict';

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
// функция проверки данных на число

let start = document.getElementById('start'),
  // кнопка "рассчитать"

  incomePlusBtn = document.getElementsByTagName('button')[0],
  // plusIncomeBtn = document.querySelector('.income button'),
  // кнопка "+" добавления дополнительного ( != возможмного) дохода

  expensesPlusBtn = document.getElementsByTagName('button')[1],
  // кнопка "+" добавления 

  depositCheckbox = document.getElementById('deposit-check'),
  // чекбокс на наличие депозита

  budgetDayValue = document.getElementsByClassName('result-total')[1],
  budgetMonthValue = document.getElementsByClassName('result-total')[0],
  expensesMonthValue = document.getElementsByClassName('result-total')[2],
  addIncomeValue = document.getElementsByClassName('result-total')[3],
  addExpensesValue = document.getElementsByClassName('result-total')[4],
  periodValue = document.getElementsByClassName('result-total')[5],
  targetMonthValue = document.getElementsByClassName('result-total')[6],
  // поля результатов с правой стороный

  salaryAmount = document.querySelector('.salary-amount'),
  // месячный доход - основной доход

  incomeTitle = document.querySelector('.income-title'),
  // наименование дополнительного дохода (если есть)

  incomeItems = document.querySelectorAll('.income-items'),
  //  

  addIncomeItems = document.querySelectorAll('.additional_income-item'),
  // поля возможного дохода (!= дополнительного)

  expenseTitle = document.querySelector('.expenses-title'),
  // наименование обязательного расхода

  expensesItems = document.querySelectorAll('.expenses-items'),
  //  

  addExpensesItem = document.querySelector('.additional_expenses-item'),
  // поле возможного расхода (!= дополнительного)

  targetAmount = document.querySelector('.target-amount'),
  // сумма цели 

  periodSelect = document.querySelector('.period-select');
// период достижения цели 

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {

    appData.budget = +salaryAmount.value;
    appData.getIncome();
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.floor(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    addExpensesValue.value = appData.addExpenses.join(', ');
    addIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    periodValue.value = appData.calcSavedMoney();

    periodSelect.addEventListener('change', function () {
      periodValue.value = appData.calcSavedMoney();
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlusBtn);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlusBtn.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlusBtn);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlusBtn.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    addIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    let result = 0;
    let sum = 0;
    for (let key in appData.expenses) {
      result += appData.expenses[key];
    }
    sum += result;
    appData.expensesMonth = sum;
    return sum;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    return;
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  getStatusIncome: function () {
    if (appData.budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
      return ('Что-то пошло не так');
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма на депозите?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * periodSelect.value;
  }
};

start.addEventListener('click', function (e) {
  if (salaryAmount.value === '') {
    e.preventDefault();
  }
  appData.start();
});
incomePlusBtn.addEventListener('click', appData.addIncomeBlock);
expensesPlusBtn.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', function (e) {
  let periodNumber = document.querySelector('.period-amount');
  periodNumber.textContent = e.target.value;
});

// appData.expensesMonth = appData.getExpensesMonth();
// console.log(`Сумма всех обязательных расходов: ${appData.expensesMonth}`);
// функция подсчета суммы всех обязательных расходов


// console.log(`Сумма накоплений за месяц: ${appData.budgetMonth}`);
// функция подсчета накоплений за 

// const isPositiveNum = function (num) {
//   if (num > 0) {
//     console.log(`Цель будет достигнута через: ${num} месяца(-ев)`);
//   } else {
//     console.log(`Цель не будет достигнута.`);
//   }
// };
// isPositiveNum(appData.getTargetMonth());
// функция подсчета периода достижения цели

// console.log(appData.getStatusIncome());
// функция определения уровня дохода

// for (let key in appData) {
//   console.log('Наша программа включает в себя данные ' + key);
// }

// let showArrAsString = function () {
//   appData.addExpenses.forEach(function (item, i, array) {
//     let firstDigit = item[0].toUpperCase();
//     let newItem = firstDigit + item.slice(1);
//     array[i] = newItem;
//   });
//   console.log(appData.addExpenses.join(', '));
// };

// showArrAsString();