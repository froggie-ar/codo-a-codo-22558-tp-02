document.addEventListener("DOMContentLoaded", () => {

    fetch("./header.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector("header").innerHTML = data;
    });

  fetch("./footer.html")
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.querySelector("footer").innerHTML = data;
    });
    
    console.log(document.URL);
});

function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
};

