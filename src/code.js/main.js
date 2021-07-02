//from Kate SEA
const queue = localStorage.getItem("queue");
const watched = localStorage.getItem("watched");


if (!queue) {
    localStorage.setItem("queue", '[]');
}
if (!watched) {
    localStorage.setItem("watched", '[]');
}

import "./trendMarkUp.js";
import "./pagination.js";
// import "./search.js";
// import "./newSearch.js";
import "./modal.js"
import "./header.js";
import "./myLib.js";
import "./footer.js";
import "./arrow.js";