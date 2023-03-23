function addScript(src) {
  const script = document.querySelector("script");
  script.remove();
  var s = document.createElement("script");
  s.setAttribute("src", src);
  document.body.appendChild(s);
}

window.onload = () => {
  const pathName = window.location.pathname;
  const para = window.location.search;
  const pages = new URLSearchParams(para).get("page");
  if (pathName === "/task.html") {
    if (pages === null) addScript("./edit-task.js");
    else if (pages === "Candidates") addScript("./edit-candidate.js");
    else if (pages === "Voters") addScript("./edit-voter.js");
    else if (pages === "pollingStation") addScript("./edit-pollingStation.js");
  } else {
    if (pages === null) addScript("./browser-app.js");
    else if (pages === "Candidates") addScript("./candidate.js");
    else if (pages === "Voters") addScript("./voter.js");
    else if (pages === "pollingStation") addScript("./pollingStation.js");
    else if (pages === "Vote") addScript("./createVote.js");
    else if (pages === "CastVote") addScript("./cast-vote.js");
    else if (pages === "Result") addScript("./results.js");
  }
};
