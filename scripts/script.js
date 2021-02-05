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
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 500000,
  period: 5,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
      'Кино, театр, поход в горы');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      let keyName = prompt('Введите обязательную статью расходов?');
      let result = 0;
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
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
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
};



appData.asking();


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