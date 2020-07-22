//grabbing the elements
const main = document.querySelector("#main");
const addUser = document.querySelector("#add-user");
const double = document.querySelector("#double");
const showMillionaires = document.querySelector("#show-millionaires");
const sort = document.querySelector("#sort");
const calculateWealth = document.querySelector("#calculate-wealth");
const name = document.querySelector("#name");
const money = document.querySelector("#money");

//primary array that stores all data
let arrData = [];

//fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0].name;

  //create object with fetched data & generate a money property
  const newUser = {
    name: `${user.first} ${user.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  // add new obj to arrData
  arrData.push(newUser);

  // update DOM
  updateDOM();
}

//Update DOM function
function updateDOM(providedData = arrData) {
  //clear main div
  name.innerHTML = "<strong>Name</strong>";
  money.innerHTML = "<strong>Money</strong>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    const elementMoney = document.createElement("div");
    element.classList.add("money");
    elementMoney.classList.add("person");
    element.innerHTML = `<div>${item.name}</div>`;
    elementMoney.innerHTML = `<div>${formatMoney(item.money)}</div>`;
    name.appendChild(element);
    money.appendChild(elementMoney);
  });
}

//format money
function formatMoney(value) {
  return "$ " + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
getRandomUser();
getRandomUser();

//add user button
addUser.addEventListener("click", getRandomUser);

//double money button (MAP)
double.addEventListener("click", doubleMoney);

function doubleMoney() {
  arrData = arrData.map((x) => {
    return { ...x, money: x.money * 2 };
  });

  updateDOM();
}

//additional option to solve above problem
// function doubleMoney() {
//   arrData.forEach((item) => {
//     item.money = item.money * 2;
//   });
//   updateDOM();
// }

//sort users by richest button (SORT)
sort.addEventListener("click", sortByRichest);

function sortByRichest() {
  arrData.sort((a, b) => b.money - a.money);
  updateDOM();
}

//show only millionaires (FILTER)
showMillionaires.addEventListener("click", onlyShowMillionares);

function onlyShowMillionares() {
  arrData = arrData.filter((item) => item.money >= 1000000);
  updateDOM();
}

//calculate entire wealth (REDUCE)
calculateWealth.addEventListener("click", calculateEntireWealth);

let totalWealthElementText = document.createElement("div");
let totalWealthElementMoney = document.createElement("div");

function calculateEntireWealth() {
  totalWealthValue = arrData.reduce(
    (accum, current) => accum + current.money,
    0
  );

  totalWealthElementText.innerHTML = "<h3>Total Wealth</h3>";
  totalWealthElementMoney.innerHTML = `<h3>${formatMoney(
    totalWealthValue
  )}</h3>`;

  name.appendChild(totalWealthElementText);
  money.appendChild(totalWealthElementMoney);
}
