// Function called when the form is submitted.
// Function performs the calculation and returns an integer
// TODO: input needs to be validated (integers 10-1500 only valid input)

var pituus=0;

function laskePituus () {

//total length of warp
    var tpituus = document.getElementById('tpituus').value ;
    var lpituus = document.getElementById('lpituus').value ;

    /* checking that band length has been given and that it is in the valid range */
    if(tpituus==null || tpituus==""){
        alert("Valmiin nauhan pituus tarvitaan");
        return false;
    } else if (tpituus < 10 || tpituus > 1500){
        alert("Syötäthän nauhan toivotun pituuden välillä 10-1500");
        return false;  
    }

    /* extra length can be zero/none, but it cannot be negative */
    if (lpituus.length == 0) {
        lpituus= 0;
    } else if (lpituus < 0 || lpituus > 200){
        alert("Syötäthän lisäpituuden välillä 0-150");
        return false;
    }


    // Calculate the total:
    pituus = parseInt(tpituus) * 1.1 + 30 + parseInt(lpituus);
    pituus = parseInt(pituus);
    
    document.getElementById('laskutulos').style.display='block';
    document.getElementById('kopioipituus').style.display='block';
    document.getElementById('hideaway').style.display='block';

    // Print the total on the page:
    document.getElementById("vpituus").innerHTML = pituus;

    // Pre-fill the length info in the next section
    document.getElementById('apituus').innerHTML = pituus;

}

// This bit copies the calculated warp length onto clipboard and explains what it did
// Original 'pituus' stays as an integer
function kopioiTeksti () {
    var pnum = pituus.toString(); // number must be converted to text to work
    navigator.clipboard.writeText(pnum);
    alert("Kopioitu: " + pnum);
}

// This function assigns a new value to global variable 'pituus' in case user wants to change it
// The length indication is prefilled in the previous section
function vaihdaPituus () {
    var upituus = document.getElementById('upituus').value; // if someone clicks the button without setting a number
    /* checking that band length has been given and that it is in the valid range */
    if(upituus==null || upituus==""){
        alert("Loimen pituus tarvitaan");
        return false;
    } else if (upituus < 10 || upituus > 1500){
        alert("Syötäthän nauhan toivotun pituuden välillä 10-1500");
        return false;  
    } else {
    document.getElementById("upituus").innerHTML = upituus;
    document.getElementById("fpituus").innerHTML = upituus;
    document.getElementById('showaway').style.display='block'; //Showing new warp length info
    document.getElementById('hideaway').style.display='none'; //Hiding old warp length info
    }
    console.log(upituus) //for debugging purposes
    pituus = upituus; // passing the measurement on to global
}

// There should probably be a limit to how many rows one can add
// For validation reasons you can't enter a new row unless the very first one is filled
function addRow() {
    if (pituus < 10 || pituus > 1500){
        alert("Anna loimen pituus");
        return false;
    }
    var tableRow = document.getElementById("lomake");
    var vari = document.getElementById("vari1").value;
    console.log(vari); 
    var lankamaara = document.getElementById("lmaara1").value;
    console.log(lankamaara);
   if (vari == null || vari == "") {
        alert("Ensimmäistä riviä ei ole täytetty loppuun");
        return false;
    } else if (lankamaara == null || lankamaara == "" || lankamaara < 1 || lankamaara > 100){
        alert("Ensimmäiseltä riviltä puuttuu lankamäärä tai se ei ole välillä 1-100");
        return false;
    }
    var row = tableRow.insertRow(-1);
    var cell1 = row.insertCell(0); // color name
    var cell2 = row.insertCell(1); // nr of threads
    var cell3 = row.insertCell(2); // double thread option
    var cell4 = row.insertCell(3); // remove row icon
    cell1.innerHTML = '<input type="text" pattern="[a-zA-Z0-9]+">';
    cell2.innerHTML = '<input class="number" type="number" min="1" max="100">';
    cell3.innerHTML = '<input type="checkbox">';
    cell4.innerHTML = '<td><button class="trash" onclick="deleteRow(this)"><i class="fa-solid fa-trash-can"></i></button></td>'

}

// Remove the row on which the trash can is clicked
function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("lomake").deleteRow(i)
}


// Extracting input from a table, validating it and inputting it into a table
function findData() {
    var vari = document.getElementById("vari1").value;
    lankamaara = document.getElementById("lmaara1").value;
    // Checking that there is input to handle; you can't make other rows it the first row isn't filled, so this check is enough
    if (vari == null || vari == "") {
        alert("Yhtään väriä ei ole annettu");
        return false;
    } else if (lankamaara == null || lankamaara == "" || lankamaara < 1 || lankamaara > 100){
        alert("Ei laskettavaa lankamäärää tai se ei ole välillä 1-100");
        return false;
    }
    vari_array = [];
    lmaara_array = [];
    tupla_array = [];
    pituus_array = [];
    let langat = 0;
    var rows = document.getElementById("lomake").rows.length;
    for (let i = 1; i < rows; i++){
    var solu = document.getElementById("lomake").rows[i].cells;
    vari_array.push(solu[0].children[0].value);
    lmaara_array.push(solu[1].children[0].value);
    if ((solu[2].children[0].checked)) {
        tupla_array.push(2);
        }
    else {tupla_array.push(1);}
    console.log(vari_array);
    console.log(lmaara_array);
    console.log(tupla_array);
    }
    for (var i = 0; i < vari_array.length; i++) {   // turning empty rows into number to stop NaN at total
        if (vari_array[i] == undefined) {
            vari_array[i] = 0;
        }   
    }
    for (let j = 0; j < lmaara_array.length; j++) {  // arrays are always the same length
        pituus_array[j] = (lmaara_array[j]) * (tupla_array[j]) * (pituus / 100); // total length of one color needed
        parseInt(pituus_array[j]);
        langat += parseInt(lmaara_array[j]); // the number of slots and holes needed in the rigid heddle
        }
    console.log(pituus_array);
    console.log(pituus);
    console.log(langat);
    document.getElementById("pituusf").innerHTML = pituus;
    document.getElementById("lankamaara").innerHTML = langat;

    // I may want to merge vari_array and pituus_array
    // Arrays are always of equal length, doesn't need checking
    let t_array = []
    for (let k = 0; k < vari_array.length; k++){
        t_array.push(vari_array[k]);
        t_array.push(pituus_array[k]);
    }
    console.log(t_array);


    // Converting a simple inline array into a table, modified from https://jsfiddle.net/k3ptoc4k/5/
    let arrayCopy = t_array.slice(0); // Creates a copy of the array; may be not necessary here?
    // Populate headers
    let myTable = "<table>\r<tr><th>Väri</th><th>Langan tarve metreinä</th></tr>";
    // Populate body
    while (arrayCopy.length > 0) {
      myTable += "<tr>";
      for (let i = 0; i < 2; i++) {  // number of columns is known, doesn't change
        if (arrayCopy.length == 0) {
          myTable += "<td>" + "" + "</td>";
        } else {
          myTable += "<td>" + arrayCopy.shift() + "</td>";
        }
      }
      myTable += "</tr>";
    }
    myTable += "</table>";
    console.log(myTable);
    document.getElementById("taulukko").innerHTML = myTable;

    document.getElementById('langatyht').style.display='block';
    document.getElementById('tulosta').style.display='block';
    document.getElementById('tyhjenna').style.display='block';

}


// säädä CSS:llä niin, että tulostuu vain loimen pituus, taulukko ja lankojen määrä
/* function tulosta(){
    window.print()
} */

// printing function that should print one div with css
// code almost unchanged from https://stackoverflow.com/questions/21379605/printing-div-content-with-css-applied
function tulosta(){

    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head>');
    mywindow.document.write("<link rel=\"stylesheet\" link href=\"../css/print.css\"> <link rel=\"stylesheet\" link href=\".css/layout.css\">");
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>Pirtanauhan loimilaskuri</h1>')
    mywindow.document.write(document.getElementById('tulostettava').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/


    setTimeout(function () {
    mywindow.print();
    mywindow.close();
    }, 1000)
    return true;
}

function tyhjenna(){
    document.getElementById("pituuslaskuri").reset();
    document.getElementById("uusipituus").reset();
    document.getElementById("lankalaskuri").reset();
    const element = document.getElementById("lomake");
    const nodes = element.getElementsByTagName("tr");
    // removal loop only works if you start from the bottom and _reduce_ the counter number
    let tlength = nodes.length -1;
    for (let k = tlength; k > 1; k--){
        document.getElementById("lomake").deleteRow(k);
    }
    document.getElementById('laskutulos').style.display='none';
    document.getElementById('showaway').style.display='none';
    document.getElementById('kopioipituus').style.display='none';
    document.getElementById('taulukko').style.display='none';
    document.getElementById('langatyht').style.display='none';

}

function refresh() {
    location.reload();
}