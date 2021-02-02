'use strict';

let money = +prompt('Ваш месячный доход?', 48000),
  income = 'Продажи книги',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
    'Еда, квартира, кошачий корм'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 800000,
  period = 10,
  budgetDay;

const showTypeOf = function (data) {
  console.log(data, typeof data);
};
// функция вывода типа данных в консоль

showTypeOf(money);
showTypeOf(deposit);
showTypeOf(income);

console.log(addExpenses.toLowerCase().split(', '));

let expenses1 = prompt('Введите обязательную статью расходов?', 'Коммуналка'),
  amount1 = +prompt('Во сколько это обойдется?', 7540),
  expenses2 = prompt('Введите обязательную статью расходов?', 'Транспорт'),
  amount2 = +prompt('Во сколько это обойдется?', 6830);


const getExpensesMonth = function (exp1, exp2) {
  return exp1 + exp2;
};
let expensesMonth = getExpensesMonth(amount1, amount2);
console.log(`Сумма всех обязательных расходов: ${expensesMonth}`);
// функция подсчета суммы всех обязательных расходов

const getAccumulatedMonth = function (money, expenses) {
  return money - expenses;
};
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);
console.log(`Сумма накоплений за месяц: ${accumulatedMonth}`);
// функция подсчета накоплений за месяц

const getTargetMonth = function (accumulatedMonth) {
  return Math.ceil(mission / accumulatedMonth);
};
let targetMonth = getTargetMonth(accumulatedMonth);
console.log(`Период достижения цели: ${targetMonth} месяца(-ев)`);
// функция подсчета периода достижения цели


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