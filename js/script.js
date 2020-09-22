// // Creiamo un calendario dinamico con le festività.
// // Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018
// // (unici dati disponibili sull’API).
// // Milestone 1
// // Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// // API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0

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
    
    //assegnazione inizio calendario
    var year = 2018;
    var month = 1;

  

    renderPage();


    // Definisco l'evento click sul pulsante PREV
    $("#prev").click(function() {
      if (month > 1) {
        month -= 1;
        $(".month-wrapper").empty();
        renderPage();
      } else {
        //alert mese precedente a Gennaio 2018
        alert("Nessun dato precedente a questa data!");
      }
    });
  
    // Definisco l'evento click sul pulsante NEXT
    $("#next").click(function() {
      if (month < 12) {
        month += 1;
        $(".month-wrapper").empty();
        renderPage();
      } else {
        //alert mese successivo a  Dicembre 2018
        alert("Nessun dato successivo a questa data!");
      }
    });





//*************************************FUNZIONI */
    //ritorna orario e data attuale in alto a destra in pagina
    function actualTime() {
        var now = moment();
        var formattedTime = now.format("HH:mm ");
        var formattedDate = now.format("dddd, DD MMMM YYYY") ;

        $("#time-actual").text(formattedTime);
        $("#day-actual").text(formattedDate);
    };

    function renderPage() {
      
        // Effettuo la chiamata Ajax verso l'api contenente le festività dell'anno 2018
        $.ajax(
          {
            "url": "https://flynn.boolean.careers/exercises/api/holidays",
            "data": {
              "year": year,
              "month": month - 1
            },
            "method": "GET",
            "success": function(data) {
              printHolidays(data.response);
            },
            "error": function (error) {
              alert("Errore! Riprova");
            }
          }
        );
      }
    //ritorna giorni con festività
    function printHolidays(holidays) {

      var date = {
        "year": year,
        "month": month - 1,
        "day":1
      }

      var momentDate = moment(date);
      var weekDay = momentDate.weekday();
      var dayInMonth = momentDate.daysInMonth();
      
        //stampa mese in pagina
        $("header h1").text(momentDate.format("MMMM"))
         
        
        console.log(weekDay);
              
        var test = "<li></li>"
        switch (weekDay) {
          case 1:
            for(var i=0;i<1;i++){
              $(".month-wrapper").prepend(test);
            }
            break;
          case 2:
            for(var i=0;i<2;i++){
              $(".month-wrapper").prepend(test);
            }
            break;
          case 3:
            for(var i=0;i<3;i++){
              $(".month-wrapper").prepend(test);
            }
            break;
          case 4:
            for(var i=0;i<4;i++){
              $(".month-wrapper").prepend(test);
            }
            break;
          case 5:
            for(var i=0;i<5;i++){
                $(".month-wrapper").prepend(test);
            }
            break;
          case 6:
            for(var i=0;i<6;i++){
                $(".month-wrapper").prepend(test);
            }
            break;
  
                    

        }
        
        
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

        
        if (holidays.length > 0) {
            for( var i=0; i<holidays.length; i++) {

                var holidaysName = holidays[i].name;
                var holidaysDate = holidays[i].date;

                var dayHtml = $(".day[data-date='"+holidaysDate+"']");
                dayHtml.addClass("holiday");
                var test = dayHtml.text();
                dayHtml.html(test + "<br><span> " + holidaysName + "</span>");
            }
        }

    }
    

  });

