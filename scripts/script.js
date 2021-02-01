'use strict';

let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;

// alert('Привет, Владислав :)');

// console.log('И тут тоже привет');

money = 15000;
income = 'Продажи книги';
addExpenses = 'Продукты, развлечения, курсы';
deposit = true;
mission = 800000;
period = 10;

console.log('typeof money: ', typeof money);

console.log('typeof deposit: ', typeof deposit);

console.log('typeof income: ', typeof income);

console.log('addExpenses.length: ', addExpenses.length);

console.log(
  'Период равен ' + period + ' месяцев. ' + 'Цель заработать ' + mission + ' рублей.');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;

// Lesson 03

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMonth);
// рассчёт бюджета на месяц

console.log(`Цель будет достигнута за ${Math.ceil(mission / budgetMonth)} месяцев (-a)`);
// рассчёт месяцев для достижения цели

budgetDay = Math.floor(budgetMonth / 30);
console.log('Новый бюджет на день: ', budgetDay);
// рассчет бюджета на день на основе бюджета на месяц

if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay <= 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log('К сожалению, у вас уровень дохода ниже среднего');
} else {
  console.log('Что-то пошло не так');
}
// конструкция определения уровня дохода  