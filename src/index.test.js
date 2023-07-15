import fs from "fs";
import path from "path";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

function renderDOM() {
  const html = fs.readFileSync(
    path.resolve(__dirname, "../index.html"),
    "utf8"
  );
  const doc = new DOMParser().parseFromString(html, "text/html");
  document.body.innerHTML = doc.body.innerHTML;
}

function loadScript() {
  return import("./index.js");
}

function render() {
  return new Promise((resolve, reject) => {
    try {
      renderDOM();
    } catch (err) {
      reject(err);
    }
    loadScript().then(resolve, reject);
  });
}

it("should counter work correctly", async () => {
  const user = userEvent.setup();

  await render();

  // initial
  expect(screen.getByRole("status")).toHaveTextContent("0");

  // increase
  const increaseBtn = screen.getByRole("button", { name: /increase/i });
  await user.click(increaseBtn);
  expect(screen.getByRole("status")).toHaveTextContent("1");

  // decrease
  const decreaseBtn = screen.getByRole("button", { name: /decrease/i });
  await user.click(decreaseBtn);
  expect(screen.getByRole("status")).toHaveTextContent("0");
  await user.click(decreaseBtn);
  expect(screen.getByRole("status")).toHaveTextContent("-1");
});
