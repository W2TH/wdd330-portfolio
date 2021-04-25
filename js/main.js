//variables
let date = new Date();
let update = document.lastModified;

//my links
const weeks = [{
    label: "Week01",
    url: "week01/index.html"
}]

//for loop
for (let i = 0; i < weeks.length; i++) {
    let week = document.createElement('li');
    week.setAttribute('id', 'week' + i);
    let link = document.createElement('a');
    link.innerHTML = weeks[i].label;
    link.setAttribute('href', weeks[i].url);
    week.appendChild(link);
    document.getElementById('week-list').appendChild(week);
}
document.getElementById("CopyRight-year").innerHTML = date.getFullYear();