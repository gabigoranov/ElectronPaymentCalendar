const fs = require('fs');

let createBtn = document.getElementById('create-btn');
let createWin = document.getElementById('create-window');
let submitBtn = document.getElementById('submit-btn');
let months = document.getElementsByClassName('month-li');
let dates = [];

loadData();
setUpCalendar();

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

function setUpCalendar() {
    let isFocused = false;
    for(let i = 0; i < 12; i++) {
        months[i].addEventListener("click", displayCalendar);
        let base = months[i].textContent;
        function displayCalendar(){
            if(isFocused == true){
                isFocused = false;
                months[i].textContent = base;
            }
            else{
                let container = document.createElement("ul");
                container.className = "calendar";
                
                isFocused = true;
                months[i].innerHTML = months[i].innerHTML + ' &#708;';
                if((i+1) % 2 == 0){
                    for(let y = 1; y <= 30; y++){
                        let day = document.createElement("li");
                        day.innerHTML = y;

                        var today = new Date();
                        if(y < 10)
                        {
                            dd = '0' + y;
                        }
                        else{
                            dd = y;
                        }
                        if(months[i].value < 10)
                        {
                            mm = '0' + months[i].value;
                        }
                        else{
                            var mm = months[i].value;
                        }
                        var yyyy = today.getFullYear();

                        let dayDate = yyyy + '-' + mm + '-' + dd;
                        if(isDaySpecial(dayDate))
                        {
                            day.className = 'special';
                        }
                        container.appendChild(day);
                        months[i].appendChild(container);
                    }
                }
                else{
                    for(let y = 1; y <= 31; y++){
                        let day = document.createElement("li");
                        day.innerHTML = y;

                        var today = new Date();
                        if(y < 10)
                        {
                            dd = '0' + y;
                        }
                        else{
                            dd = y;
                        }
                        if(months[i].value < 10)
                        {
                            mm = '0' + months[i].value;
                        }
                        else{
                            var mm = months[i].value;
                        }
                        var yyyy = today.getFullYear();

                        let dayDate = yyyy + '-' + mm + '-' + dd;
                        if(isDaySpecial(dayDate))
                        {
                            day.className = 'special';
                        }

                        container.appendChild(day);
                        months[i].appendChild(container);
                    }
                }
            }
            for(let x = 0; x < 12; x++){
                if(months[x] !== months[i]){
                    if(isFocused == false){
                        months[x].style.display = "block";

                        

                        
                    }
                    else{
                        months[x].style.display = "none";
                        
                        isFocused = true;
                    }
                }
            }
        }
    }

}

function isDaySpecial(date){
    for(let d in dates){
        if(dates[d].date == date){
            console.log('SPECIAL DAY ' + date);
            return true;
        }
    }

    return false;
}