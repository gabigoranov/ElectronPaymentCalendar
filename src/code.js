const fs = require('fs');

let createBtn = document.getElementById('create-btn');
let createWin = document.getElementById('create-window');
let submitBtn = document.getElementById('submit-btn');
let dates = [];

loadData();

createBtn.addEventListener("click", addPaymentData);
submitBtn.addEventListener("click", function(e){
    if(e)
    {
        e.preventDefault();
    }

    let name = document.getElementById('name').value;
    let date = document.getElementById('date').value;

    let object = {title: name, date: date};

    dates.push(object);

    createWin.style.display = "none";

    writeToFile();
});

function addPaymentData(e)
{
    if(e){
        e.preventDefault();
    }
    
    createWin.style.display = 'block';
}

function writeToFile() {
    fs.writeFile("data.txt", JSON.stringify(dates), err =>{
        console.log(err);
    });
 }

function displayNotifications(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;

    for(date in dates){
        if(dates[date].date == today){
            let notification = new Notification('You Have A Payment Due Today', {
                body: dates[date].title,
                icon: '../images/icon.png',
            });

        }
    }
    
    }


function loadData(){
    fs.readFile("data.txt", "utf-8", (err, data) =>{
        if(err){
            console.log(err);
            return;
        }

        if(data.toString() == ""){
            dates = [];
            return;
        }
        dates = JSON.parse(data.toString());
        displayNotifications();
    });


}
