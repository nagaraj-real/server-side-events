const save = async () => {
  await fetch("api/save", {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("parsed");
  let source = new EventSource("http://localhost:3000/sse");
  source.onmessage = function (event) {
    console.log(event);
    console.log("here");
  };

  document.getElementById("submit").addEventListener("click", () => {
    console.log("btn clicked");
    save();
  });
});
