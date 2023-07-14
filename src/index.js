import "./styles.css";

const countEl = document.getElementById("count");
const btnIncrementEl = document.getElementById("btn-increment");
const btnDecrementEl = document.getElementById("btn-decrement");

btnIncrementEl.addEventListener("click", function (e) {
  countEl.textContent = Number(countEl.textContent) + 1;
});

btnDecrementEl.addEventListener("click", function (e) {
  countEl.textContent = Number(countEl.textContent) - 1;
});

const observer = new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    const countEl = mutation.target;
    const value = Number(countEl.textContent);

    if (value > 0) {
      countEl.classList.add("green");
      countEl.classList.remove("red");
    } else if (value < 0) {
      countEl.classList.add("red");
      countEl.classList.remove("green");
    } else {
      countEl.classList.remove("green");
      countEl.classList.remove("red");
    }
  }
});
observer.observe(countEl, { childList: true });
