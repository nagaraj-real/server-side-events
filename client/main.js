let ws = new WebSocket("ws://localhost:8080");

const save = async () => {
  await fetch("api/save", {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
  ws.send("Save done");
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("parsed");
  let source = new EventSource("http://localhost:3000/sse");
  source.onmessage = function (event) {
    console.log("SSE", event);
  };

  ws.onmessage = function (message) {
    console.log("web socket", message);
  };

  document.getElementById("submit").addEventListener("click", () => {
    console.log("btn clicked");
    save();
  });
});
