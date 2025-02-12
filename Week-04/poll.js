const options = [
    { name: "JavaScript", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "Java", votes: 0 },
    { name: "C++", votes: 0 },
  ];
  
  document.getElementById("voteButton").addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="poll"]:checked');
  
    if (!selectedOption) {
      alert("Please select an option to vote!");
      return;
    }
  
    // Increment vote count for the selected option
    const optionValue = selectedOption.value;
    const option = options.find((opt) => opt.name === optionValue);
    option.votes++;
  
    // Update the results
    displayResults();
  });
  
  function displayResults() {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
  
    options.forEach((option) => {
      const percentage =
        options.reduce((acc, opt) => acc + opt.votes, 0) > 0
          ? (
              (option.votes / options.reduce((acc, opt) => acc + opt.votes, 0)) *
              100
            ).toFixed(2)
          : 0;
  
      const resultLabel = document.createElement("div");
      resultLabel.className = "result-label";
      resultLabel.innerText = `${option.name}: ${option.votes} votes (${percentage}%)`;
  
      const resultBar = document.createElement("div");
      resultBar.className = "result-bar";
      resultBar.style.width = `${percentage}%`;
  
      resultsDiv.appendChild(resultLabel);
      resultsDiv.appendChild(resultBar);
    });
  }