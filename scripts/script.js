'use strict';

const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);
// функция проверки данных на число

const startBtn = document.getElementById('start'),
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
  addIncomeItems = document.querySelectorAll('.additional_income-item'),
  expenseTitle = document.querySelector('.expenses-title'),
  addExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodNumber = document.querySelector('.period-amount'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');


let incomeItems = document.querySelectorAll('.income-items'),
  textInputs = document.querySelectorAll('input[type=text]'),
  expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
  constructor() {
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
  }

  reset() {
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
    textInputs = document.querySelectorAll('input[type=text]');

    textInputs.forEach(item => {
      item.value = '';
      item.removeAttribute('disabled', 'true');
    });
    periodSelect.value = 1;
    periodNumber.textContent = 1;
    depositCheckbox.checked = false;
    this.depositHandler();
    this.changePercent();

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
  }

  start() {
    this.budget = +salaryAmount.value;
    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    if (depositCheckbox.checked) {
      this.getInfoDeposit();
    }
    this.getBudget();
    this.disableInputs();

    this.showResult();
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    addExpensesValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    periodValue.value = this.calcSavedMoney();
  }
  addExpensesBlock() {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlusBtn);
    expensesItems = document.querySelectorAll('.expenses-items');
    cloneExpensesItems.children[0].value = null;
    cloneExpensesItems.children[1].value = null;

    if (expensesItems.length === 3) {
      expensesPlusBtn.style.display = 'none';
    }
  }
  addIncomeBlock() {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlusBtn);
    incomeItems = document.querySelectorAll('.income-items');
    cloneIncomeItems.children[0].value = null;
    cloneIncomeItems.children[1].value = null;

    if (incomeItems.length === 3) {
      incomePlusBtn.style.display = 'none';
    }

  }

  getExpenses() {
    expensesItems.forEach(item => {
      let itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  getIncome() {
    incomeItems.forEach(item => {
      let itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    let addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    addIncomeItems.forEach(item => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    let result = 0,
      sum = 0;
    for (let key in this.expenses) {
      result += this.expenses[key];
    }
    sum += result;
    this.expensesMonth = +sum;
    return sum;
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    return;
  }
  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  getStatusIncome() {
    if (this.budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
      return ('Что-то пошло не так');
    }
  }
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }
  disableInputs() {
    textInputs = document.querySelectorAll('input[type=text]');
    textInputs.forEach(item => {
      item.setAttribute('disabled', 'true');
    });
  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.value = '';
      depositPercent.style.display = 'inline-block';
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }

  getInfoDeposit() {
    this.isCorrectValue();
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  isCorrectValue() {
    if (!isNumber(depositPercent.value) || (depositPercent.value < 1 || depositPercent.value > 100)) {
      alert('Введите корректное число в поле "Процент"');
      startBtn.removeEventListener('click');
    } else if (!isNumber(depositAmount.value) || depositAmount.value === '') {
      alert('Введите корректное число в поле "Сумма" в блоке "Депозит"');
      startBtn.removeEventListener('click');
    }
  }

  depositHandler() {
    if (depositCheckbox.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  eventListeners() {
    startBtn.addEventListener('click', () => {
      this.start.bind(this);
      if (salaryAmount.value === '') {
        alert('Ошибка, поле "Месячный доход пусто"');
        return;
      } else {
        this.start();
        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
      }
    });

    cancelBtn.addEventListener('click', () => {
      this.reset();
      startBtn.style.display = 'block';
      cancelBtn.style.display = 'none';
    });

    incomePlusBtn.addEventListener('click', this.addIncomeBlock);
    expensesPlusBtn.addEventListener('click', this.addExpensesBlock);

    periodSelect.addEventListener('input', e => {
      periodNumber.textContent = e.target.value;
      periodValue.value = this.calcSavedMoney();
    });

    depositCheckbox.addEventListener('change', this.depositHandler.bind(this));


    document.addEventListener('input', event => {
      const target = event.target;

      if (target.matches('[placeholder="Сумма"]')) {
        target.value = target.value.replace(/[^\d]/gi, '');
      }
      if (target.matches('[placeholder="Наименование"]')) {
        target.value = target.value.replace(/\w/gi, '');
      }
    });
  }


}

const appData = new AppData();

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
// }
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
// }

// showArrAsString();