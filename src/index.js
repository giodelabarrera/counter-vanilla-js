const countEl = document.getElementById("count");
const btnIncreaseEl = document.getElementById("btn-increase");
const btnDecreaseEl = document.getElementById("btn-decrease");

btnIncreaseEl.addEventListener("click", function (e) {
  countEl.textContent = Number(countEl.textContent) + 1;
});

btnDecreaseEl.addEventListener("click", function (e) {
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
