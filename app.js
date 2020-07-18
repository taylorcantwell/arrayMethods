const main = document.querySelector("#main");
const addUser = document.querySelector("#add-user");
const double = document.querySelector("#double");
const showMillionaires = document.querySelector("#show-millionares");
const sort = document.querySelector("#sort");
const calculateWealth = document.querySelector("#calculate-wealth");
const name = document.querySelector("#name");
const money = document.querySelector("#money");

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

//Update DOM
function updateDOM(providedData = arrData) {
  //clear main div
  name.innerHTML = "Name";
  money.innerHTML = "Money";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    const elementMoney = document.createElement("div");
    element.classList.add("money");
    elementMoney.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>}`;
    elementMoney.innerHTML = `<strong>${formatMoney(item.money)}</strong>}`;
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

//event listeners

addUser.addEventListener("click", getRandomUser);

double.addEventListener("click", doubleMoney);

function doubleMoney() {
  arrData.forEach((item) => {
    item.money = item.money * 2;
  });
  //arrData[0].money = arrData[0].money * 2;
  updateDOM();
}
