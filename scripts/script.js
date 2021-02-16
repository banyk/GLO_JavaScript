'use strict';

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
// функция проверки данных на число

let startBtn = document.getElementById('start'),
  cancelBtn = document.getElementById('cancel'),
  incomePlusBtn = document.getElementsByTagName('button')[0],
  expensesPlusBtn = document.getElementsByTagName('button')[1],
  depositCheckbox = document.getElementById('deposit-check'),
  budgetDayValue = document.getElementsByClassName('result-total')[1],
  budgetMonthValue = document.getElementsByClassName('result-total')[0],
  expensesMonthValue = document.getElementsByClassName('result-total')[2],
  addIncomeValue = document.getElementsByClassName('result-total')[3],
  addExpensesValue = document.getElementsByClassName('result-total')[4],
  periodValue = document.getElementsByClassName('result-total')[5],
  targetMonthValue = document.getElementsByClassName('result-total')[6],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  incomeItems = document.querySelectorAll('.income-items'),
  addIncomeItems = document.querySelectorAll('.additional_income-item'),
  expenseTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  addExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  textInputs = document.querySelectorAll('input[type=text]'),
  periodNumber = document.querySelector('.period-amount');

const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.expensesMonth = 0;
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};

const appData = new AppData();

AppData.prototype.start = function () {
  this.budget = +salaryAmount.value;
  this.getIncome();
  this.getExpenses();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.disableInputs();

  this.showResult();
};
AppData.prototype.reset = function () {
  textInputs = document.querySelectorAll('input[type=text]');
  textInputs.forEach(function (item) {
    item.value = '';
    item.removeAttribute('disabled', 'disabled');
  });
  periodSelect.value = 1;
  periodNumber.textContent = 1;

  if (expensesItems[2] && expensesItems[1]) {
    expensesItems[1].remove();
    expensesItems[2].remove();
    expensesPlusBtn.style.display = 'block';
  } else if (expensesItems[1]) {
    expensesItems[1].remove();
  }

  if (incomeItems[2] && incomeItems[1]) {
    incomeItems[1].remove();
    incomeItems[2].remove();
    incomePlusBtn.style.display = 'block';
  } else if (incomeItems[1]) {
    incomeItems[1].remove();
  }

};
AppData.prototype.showResult = function () {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.floor(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  addExpensesValue.value = this.addExpenses.join(', ');
  addIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  periodValue.value = this.calcSavedMoney();

  periodSelect.addEventListener('input', function () {
    periodValue.value = _this.calcSavedMoney();
  });
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItems = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlusBtn);
  expensesItems = document.querySelectorAll('.expenses-items');
  cloneExpensesItems.querySelector('.expenses-title').value = null;
  cloneExpensesItems.querySelector('.expenses-amount').value = null;


  if (expensesItems.length === 3) {
    expensesPlusBtn.style.display = 'none';
  }
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItems = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlusBtn);
  incomeItems = document.querySelectorAll('.income-items');

  if (incomeItems.length === 3) {
    incomePlusBtn.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value,
      cashIncome = item.querySelector('.income-amount').value;

    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = cashIncome;
    }
  });
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function () {
  const _this = this;
  let addExpenses = addExpensesItem.value.split(',');
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  const _this = this;
  addIncomeItems.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  let result = 0;
  let sum = 0;
  for (let key in this.expenses) {
    result += this.expenses[key];
  }
  sum += result;
  this.expensesMonth = sum;
  return sum;
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
  return;
};
AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay > 1200) {
    return ('У вас высокий уровень дохода');
  } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
    return ('К сожалению, у вас уровень дохода ниже среднего');
  } else {
    return ('Что-то пошло не так');
  }
};
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент?', '10');
    } while (!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt('Какая сумма на депозите?', 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.disableInputs = function () {
  textInputs = document.querySelectorAll('input[type=text]');
  textInputs.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });
};
AppData.prototype.eventListeners = function () {
  const _this = this;
  startBtn.addEventListener('click', function () {
    _this.start.bind(_this);
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход пусто"');
      return;
    } else {
      _this.start();
      startBtn.style.display = 'none';
      cancelBtn.style.display = 'block';
    }
  });

  cancelBtn.addEventListener('click', function (e) {
    _this.reset();
    startBtn.style.display = 'block';
    cancelBtn.style.display = 'none';
  });

  incomePlusBtn.addEventListener('click', _this.addIncomeBlock);
  expensesPlusBtn.addEventListener('click', _this.addExpensesBlock);

  periodSelect.addEventListener('input', function (e) {
    periodNumber.textContent = e.target.value;
  });
};

appData.eventListeners();

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