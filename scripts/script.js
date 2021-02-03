'use strict';

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
// функция проверки данных на число

let money,
  income = 'Продажи книги',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
    'Кино, тортики, вкусняшки коту'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 800000,
  period = 10,
  budgetDay;

console.log(addExpenses.toLowerCase().split(', '));

const start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

start();

const showTypeOf = function (data) {
  console.log(data, typeof data);
};
// функция вывода типа данных в консоль

showTypeOf(money);
showTypeOf(deposit);
showTypeOf(income);

// let expenses1 = prompt('Введите обязательную статью расходов?', 'Коммуналка'),
//   amount1 = prompt('Во сколько это обойдется?', 7540),
//   expenses2 = prompt('Введите обязательную статью расходов?', 'Транспорт'),
//   amount2 = prompt('Во сколько это обойдется?', 6830);

let expenses = [];

const getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    sum += parseFloat(prompt(`Во сколько обойдется ${expenses[i]}?`));


    if (!isNumber(sum) && i === 0) {
      sum = 0;
      i--;
    } else if (!isNumber(sum) && i === 1) {
      sum = 0;
      i -= 2;
    }
  }

  return sum;
};
let expensesAmount = getExpensesMonth();
console.log(`Сумма всех обязательных расходов: ${expensesAmount}`);
// функция подсчета суммы всех обязательных расходов

const getAccumulatedMonth = function () {
  return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();
console.log(`Сумма накоплений за месяц: ${accumulatedMonth}`);
// функция подсчета накоплений за месяц

const getTargetMonth = function () {
  return Math.ceil(mission / accumulatedMonth);
};
let targetMonth = getTargetMonth();
// функция подсчета периода достижения цели

const isPositiveNum = function (num) {
  if (num > 0) {
    console.log(`Цель будет достигнута через: ${targetMonth} месяца(-ев)`);
  } else {
    console.log(`Цель не будет достигнута.`);
  }
};
isPositiveNum(targetMonth);
// функция вывода в консоль цели

budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);
// рассчет бюджета на день на основе бюджета на месяц

const getStatusIncome = function () {
  if (budgetDay > 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay <= 1200) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay >= 0 && budgetDay < 600) {
    return ('К сожалению, у вас уровень дохода ниже среднего');
  } else {
    return ('Что-то пошло не так');
  }
};
console.log(getStatusIncome());
// функция определения уровня дохода