// Function called when the form is submitted.
// Function performs the calculation and returns an integer
// TODO: input needs to be validated (integers 10-1500 only valid input)

var pituus=0;

function laskePituus () {

//total length of warp
    var tpituus = document.getElementById('tpituus').value ;
    var lpituus = document.getElementById('lpituus').value ;

    if (lpituus.length == 0) {
        lpituus= 0;
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
    if (upituus.length == 0) {
        upituus= 0;
    }
    else {
    document.getElementById("upituus").innerHTML = upituus;
    document.getElementById("fpituus").innerHTML = upituus;
    document.getElementById('showaway').style.display='block';
    document.getElementById('hideaway').style.display='none';
    }
    console.log(upituus) //for debugging purposes
    pituus = upituus; // passing the measurement on to global
}

// There should probably be a limit to how many rows one can add
function addRow() {
    var tableRow = document.getElementById("lomake");
    var row = tableRow.insertRow(-1);
    var cell1 = row.insertCell(0); // color name
    var cell2 = row.insertCell(1); // nr of threads
    var cell3 = row.insertCell(2); // double thread option
    var cell4 = row.insertCell(3); // remove row icon
    cell1.innerHTML = '<input type="text">';
    cell2.innerHTML = '<input type="text">';
    cell3.innerHTML = '<input type="checkbox">';
    cell4.innerHTML = '<td><button onclick="deleteRow(this)"><i class="fa-solid fa-trash-can"></i></button></td>'
}

// Remove the row on which the trash can is clicked
function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("lomake").deleteRow(i)
}

//To be done: Lots of input validation!

//Warning needed if there's no value for pituus!

// Extracting input from a table
function findData() {
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
    for (let j = 0; j < lmaara_array.length; j++) {  // arrays are always the same length
        pituus_array[j] = (lmaara_array[j]) * (tupla_array[j]) * (pituus / 100); // total length of one color needed
        parseInt(pituus_array[j]);
        langat += parseInt(lmaara_array[j]); // the number of slots and holes needed in the rigid heddle
        }
    console.log(pituus_array);
    console.log(pituus);
    console.log(langat);
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
function tulosta(){
    window.print()
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