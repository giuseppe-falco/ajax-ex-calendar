// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018
// (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0

$(document).ready(function(){
    
    //setto orario locale
    moment.locale("it");
    actualTime();

    //copio template li giorno da clonare
    var source =$("#day-template").html();
    var template = Handlebars.compile(source);

    //stampo orario fisso in pagina
    setInterval(function(){
        actualTime();
    }, 30000);
    

    var day = 12;
    var month = prompt("mese");
    if (month <10) {
        month = "0" + month;
    }
    var year = 2018;
    var date = year + "-" + month + "-" + day;
    console.log(date);
    var momentDate = moment(date);
    console.log(momentDate);
    var dayInMonth = momentDate.daysInMonth();
    
    //stampa mese in pagina
    $("header h1").text(momentDate.format("MMMM"))
    //stampa giorni in pagina    
    for (var i=1; i<=dayInMonth; i++) {

        if (i<10) {
            i = "0" + i;
        }
        var context = {
            "day": i,
            "month": momentDate.format("MMMM"),
            "date-complete":momentDate.format("YYYY-MM-" + i)
        }
        var html = template(context);
                    
        $(".month-wrapper").append(html);

    }

    $.ajax(
        {
            url: "https://flynn.boolean.careers/exercises/api/holidays",
            data:{
                "year": year,
                "month": parseInt(month) - 1,
            },
            method: "GET",
            success: function (data) {
                console.log(data);
                
                var results = data.response;
                console.log(results);

                if (results.length > 0) {
                    for( var i=0; i<results.length; i++) {

                        var holidaysName = results[i].name;
                        var holidaysDate = results[i].date;

                        $(".day[data-date='"+holidaysDate+"']").addClass("holiday");
                        var test = $(".day[data-date='"+holidaysDate+"']").text();
                        $(".day[data-date='"+holidaysDate+"']").text(test + " - " + holidaysName);
                    }
                }



                 
              



               


            },
            error: function () {
                alert("Imprevisto, riprova !")
            }
        }
    )




})


//*************************************FUNZIONI */
    //ritorna orario e data attuale in alto a destra in pagina
    function actualTime() {
        var now = moment();
        var formattedTime = now.format("hh:mm");
        var formattedDate = now.format("dddd, DD MMMM YYYY") ;

        $("#time-actual").text(formattedTime);
        $("#day-actual").text(formattedDate);
    }