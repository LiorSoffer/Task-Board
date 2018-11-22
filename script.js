window.onload = init();
var inputs = document.getElementsByTagName("input");
var TaskArr;
var MyTask;
var count;

function init() {
    if (localStorage.getItem("tasks")) {
        TaskArr = JSON.parse(localStorage.getItem("tasks"));
        for (var i = 0; i < TaskArr.length; i++)
            pin(TaskArr[i]);
    } else TaskArr = [];

    if (localStorage.getItem("counter")) {
        count = localStorage.getItem("counter");
    } else {
        count=0;
        localStorage.setItem("counter", count);
    };
}

function validate() {
    var flag = true;
    for (var i = 0; i < 2; i++) {
        if (inputs[i].value == "") {
            document.getElementById(i).innerText = "Must Provide Valid Data!";
            flag = false;
        } else document.getElementById(i).innerText = "*";
    }
    if (flag == true) {
        addToArr();
    }
}

function addToArr() {
    MyTask = {
        date: inputs[0].value,
        description: inputs[1].value,
        id: count
    };
    count++;
    localStorage.setItem('counter', count);
    TaskArr.push(MyTask);
    localStorage.setItem("tasks", JSON.stringify(TaskArr));
    pin(MyTask);
    inputs[0].value = "";
    inputs[1].value = "";
}

function pin(newTask) {
    var article = document.createElement("article");
    article.id = newTask.id;
    //x
    var aside = document.createElement("aside");
    aside.className = "glyphicon glyphicon-remove pull-right";
    article.appendChild(aside);
    //description
    var p = document.createElement("p");
    p.innerHTML = newTask.description;
    article.appendChild(p);
    //date
    var h6 = document.createElement("h6");
    h6.innerText = newTask.date;
    article.appendChild(h6);
    article.className = " note group fadeIn";
    document.getElementById("tasks").appendChild(article);

    //deleting
    aside.addEventListener("click", function () {
        for (var i = 0; i < TaskArr.length; i++) {
            if (TaskArr[i].id == article.id)
                TaskArr.splice(i, 1);
            localStorage.setItem("tasks", JSON.stringify(TaskArr));
        }
        article.className = " note group fadeOut";
        window.setTimeout(function () {
            article.remove();
        }, 2000);
    });
}