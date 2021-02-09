'use strict';

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
// функция проверки данных на число

let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
  };

start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 500000,
  period: 5,
  asking: function () {

    if (confirm('У вас дополнительный заработок?')) {

      let itemIncome;
      let cashIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      } while (itemIncome === null || itemIncome.trim() === '' || isNumber(itemIncome));
      do {
        cashIncome = prompt('Сколько в месяц вы зарабатываете на этом', 10000);
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
      'Кино, театр, поход в горы');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      let keyName;
      let result = 0;
      do {
        keyName = prompt('Введите обязательную статью расходов?');
      } while (keyName === null || keyName.trim() === '' || isNumber(keyName));

      for (let j = 0; j < 1; j++) {
        result += parseFloat(prompt(`Во сколько обойдется ${keyName}?`));
        if (!isNumber(result) && j === 0) {
          result = 0;
          j--;
        }
        appData.expenses[keyName] = +result;
      }
      sum += result;
    }
    return sum;
  },
  getExpensesMonth: function () {
    let result = 0;
    let sum = 0;
    for (let key in appData.expenses) {
      result += appData.expenses[key];
    }
    sum += result;
    return sum;
  },
  getBudget: function () {
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    return;
  },
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
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
    return appData.budgetMonth * appData.period;
  }
};



appData.asking();
appData.getInfoDeposit();


appData.expensesMonth = appData.getExpensesMonth();
console.log(`Сумма всех обязательных расходов: ${appData.expensesMonth}`);
// функция подсчета суммы всех обязательных расходов


appData.getBudget();
console.log(`Сумма накоплений за месяц: ${appData.budgetMonth}`);
// функция подсчета накоплений за 

const isPositiveNum = function (num) {
  if (num > 0) {
    console.log(`Цель будет достигнута через: ${num} месяца(-ев)`);
  } else {
    console.log(`Цель не будет достигнута.`);
  }
};
isPositiveNum(appData.getTargetMonth());
// функция подсчета периода достижения цели

console.log(appData.getStatusIncome());
// функция определения уровня дохода

for (let key in appData) {
  console.log('Наша программа включает в себя данные ' + key);
}

let showArrAsString = function () {
  appData.addExpenses.forEach(function (item, i, array) {
    let firstDigit = item[0].toUpperCase();
    let newItem = firstDigit + item.slice(1);
    array[i] = newItem;
  });
  console.log(appData.addExpenses.join(', '));
};

showArrAsString();


const startButton = document.getElementById('start'),
  // кнопка "рассчитать"

  plusIncomeBtn = document.querySelector('.income button'),
  // кнопка "+" добавления дополнительного ( != возможмного) дохода

  plusExpensesBtn = document.querySelector('.expenses button'),
  // кнопка "+" добавления 

  depositCheckbox = document.querySelector('#deposit-check'),
  // чекбокс на наличие депозита

  resultFields = document.getElementsByClassName('result-total'),
  // поля результатов 

  salaryAmount = document.querySelector('.salary-amount'),
  // месячный доход - основной доход

  incomeName = document.querySelector('.income-title'),
  // наименование дополнительного дохода (если есть)

  incomeAmount = document.querySelector('.income-amount'),
  // сумма дополнительного дохода

  addIncomeItems = document.querySelectorAll('.additional_income-item'),
  // поля возможного дохода (!= дополнительного)

  expenseName = document.querySelector('.expenses-title'),
  // наименование обязательного расхода

  expenseAmount = document.querySelector('.expenses-amount'),
  // сумма обязательного расхода

  addExpensesItem = document.querySelectorAll('.additional_expenses-item'),
  // поле возможного расхода (!= дополнительного)

  targetAmount = document.querySelector('.target-amount'),
  // сумма цели 

  missionPeriod = document.querySelector('.period-select');
// период достижения цели 