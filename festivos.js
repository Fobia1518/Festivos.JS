/*Basado en el archivo de festivos de php
    Modificaciones y adaptaciones 
    Fabian Ortiz
    2019
    Este script ha sido testeado hasta el 2029
*/

var hoy;
var festivos = [];
var fechas = [];
var ano;
var pascua;
var pascua_mes;
var pascua_dia;
var data = new Date();
var siguienteLunes = false;
var cantidadDias = 0;
var can = 0 ;
    
function calcularFestivos() 
{
    /*Los meses inician en 0 y terminan en 11
        0 = Enero
        1 = Febrero
        2 = Marzo
        3 = Abril
        4 = Mayo
        5 = Junio
        6 = Julio
        7 = Agosto
        8 = Septiembre
        9 = Octubre
        10 = Noviembre
        11 = Diciembre
    */
    hoy = data.getDate();
    ano = data.getFullYear();
    pascua = getEaster(ano);
    pascua_mes = pascua[0]-1;            //se resta 1 mes ya que los meses inician desde 0
    pascua_dia = pascua[1];

    insertarFestivos(ano);

    calcula_emiliani(0, 6);              // Reyes Magos Enero 6
    calcula_emiliani(2, 19);             // San Jose Marzo 19
    calcula_emiliani(5, 29);             // San Pedro y San Pablo Junio 29
    calcula_emiliani(7, 15);             // Asunción Agosto 15
    calcula_emiliani(9, 12);            // Descubrimiento de América Oct 12
    calcula_emiliani(10, 1);             // Todos los santos Nov 1
    calcula_emiliani(10, 11);            // Independencia de Cartagena Nov 11
    
    //otras fechas calculadas a partir de la pascua.

    semanaSanta(-3, pascua_mes, pascua_dia);             //jueves santo
    semanaSanta(-2, pascua_mes, pascua_dia);            //viernes santo
    
    otrasFechasCalculadas(39, pascua_mes, pascua_dia);      //Ascención el Señor pascua
    otrasFechasCalculadas(60, pascua_mes, pascua_dia);      //Corpus Cristi
    otrasFechasCalculadas(68, pascua_mes, pascua_dia);      //Sagrado Corazón

    molerFechas(festivos);
}


function calcula_emiliani(mes_festivo,dia_festivo) 
{
    // funcion que mueve una fecha diferente a lunes al siguiente lunes en el
    // calendario y se aplica a fechas que estan bajo la ley emiliani
    //global  $y,dia_festivo,mes_festivo,$festivo;
    // Extrae el dia de la semana
    // 0 Domingo … 6 Sábado
    //semana ..... 0=Domingo 1=Lunes 2=Martes 3=Miercoles 4=Jueves 5=Viernes 6=Sabado

    diasemana = new Date(ano, mes_festivo, dia_festivo, 0, 0, 0).getDay();
    var fecha = new Date(ano, mes_festivo, dia_festivo, 0, 0, 0);

    switch (diasemana) {
        case 0:                                     // Domingo                                    
            dia_festivo = dia_festivo + 1;
            can = 1;
        break;

        case 1:                                     // Lunes                                   
            dia_festivo = dia_festivo + 0;
            can = 0;
        break;

        case 2:                                     // Martes.                    
            dia_festivo = dia_festivo + 6;
            can = 6;
        break;

        case 3:                                    // Miércoles
            dia_festivo = dia_festivo + 5;
            can = 5;
        break;

        case 4:                                     // Jueves
            dia_festivo = dia_festivo + 4;
            can = 4;
        break;

        case 5:                                     // Viernes
            dia_festivo = dia_festivo + 3;
            can = 3;
        break;

        case 6:                                     // Sábado
            dia_festivo = dia_festivo + 2;
            can = 2;
        break;
    }

    fecha.setDate(fecha.getDate() + can);
    mes_festivo = fecha.getMonth();
    dia_festivo = fecha.getDate();
    pushJson(mes_festivo,dia_festivo);
}   

function otrasFechasCalculadas(cantidadDias,pascua_mes,pascua_dia)
{
    var fecha = new Date(ano, pascua_mes, pascua_dia, 0, 0, 0);
    fecha.setDate(fecha.getDate() + cantidadDias);

    dia_semana = fecha.getDay(); 

    if (dia_semana == 1)
    {
        mes_festivo = fecha.getMonth();
        dia_festivo = fecha.getDate();
        pushJson(mes_festivo,dia_festivo);
    }
    else
    {
        mes_festivo = fecha.getMonth();
        dia_festivo = fecha.getDate();
        calcula_emiliani(mes_festivo, dia_festivo); 
    }
}   

function semanaSanta(cantidadDias,pascua_mes,pascua_dia)
{
    var fecha = new Date(ano, pascua_mes, pascua_dia, 0, 0, 0);
    fecha.setDate(fecha.getDate() + cantidadDias);

    mes_festivo = fecha.getMonth();
    dia_festivo = fecha.getDate();
    pushJson(mes_festivo,dia_festivo);
}   


function pushJson(mes_festivo,dia_festivo)
{
    mes = new Date(ano, mes_festivo, dia_festivo, 0, 0, 0).getMonth();
    dia = new Date(ano, mes_festivo, dia_festivo, 0, 0, 0).getDate();

    let fest = {
        ano: ano,
        mes: mes,
        dia: dia
    }

    festivos.push(fest);
}

//Calcula en el año cuando inicia la pascua
function getEaster(year) {
    a = parseInt(year % 19);
    b = parseInt(year / 100);
    c = parseInt(year % 100);
    d = parseInt(b / 4);
    e = parseInt(b % 4);
    f = parseInt((b + 8) / 25);
    g = parseInt((b - f + 1) / 3);
    h = parseInt(((19 * a) + b - d - g + 15) % 30);
    i = parseInt(c / 4);
    k = parseInt(c % 4);
    l = parseInt((32 + (2 * e) + (2 * i) - h - k) % 7);
    m = parseInt((a + (11 * h) + (22 * l)) / 451);
    n = parseInt(h + l - (7 * m) + 114);
    month = parseInt(n / 31);
    day = parseInt(1 + (n % 31));

 return [month,day];
}

function imprimir(data){
    console.log('El dato es: ' + data);
}

function insertarFestivos(ano){
   festivos = [
        {
            ano: ano,
            mes: 0,
            dia: 1
        },
        {
            ano: ano,
            mes: 4,
            dia: 1
        },
        {
            ano: ano,
            mes: 6,
            dia: 20
        },
        {
            ano: ano,
            mes: 7,
            dia: 7
        },
        {
            ano: ano,
            mes: 11,
            dia: 8
        },
        {
            ano: ano,
            mes: 11,
            dia: 25
        }
    ]
    return festivos;
}

var diasFiesta = calcularFestivos();

function molerFechas(fecha){
    for (var i = 0; i < fecha.length ; i++) {
        fechas[i] = fecha[i].dia + '/' + fecha[i].mes + '/' + fecha[i].ano;
    }
    console.log(fechas);
}