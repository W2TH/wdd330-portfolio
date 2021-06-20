//variables
let date = new Date();
let update = document.lastModified;

//my links
const weeks = [{
        label: "Week01",
        url: "week01/index.html"
    },
    {
        label: "Week02",
        url: "week02/index.html"
    },
    {
        label: "Week03",
        url: "week03/index.html"
    },
    {
        label: "Week04",
        url: "week04/index.html"
    },
    {
        label: "Week05",
        url: "week05/index.html"
    },
    {
        label: "Week06",
        url: "week06/index.html"
    },
    {
        label: "Week07",
        url: "week07/index.html"
    },
    {
        label: "Week08",
        url: "week08/index.html"
    },
    {
        label: "Week09",
        url: "week09/index.html"
    }
]

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