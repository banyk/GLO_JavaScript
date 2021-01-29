let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;

alert('Привет, Владислав :)');

console.log('И тут тоже привет');

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
  'Период равен ' +
    period +
    ' месяцев. ' +
    'Цель заработать ' +
    mission +
    ' рублей.'
);
//  здесь расширение Prettier отформатировало, пусть так останется или отключить / перенастроить его?

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;

console.log('budgetDay: ', budgetDay);
