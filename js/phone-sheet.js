function rowAdd(){
    let table = document.getElementById('phone-sheet');
    let row= table.insertRow();
    row.insertCell().innerText = 'None';
    row.insertCell().innerText = '000-000-0000';
    row.insertCell().innerHTML = '<button onclick="rowEdit(this)">Edit</button><button onclick="rowRemove(this)">Delete</button>';
}

function rowRemove(caller){
    let row = caller.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function rowEdit(caller){
    let name = prompt('name');
    let number = prompt('number');

    let cellName = caller.parentNode.parentNode.cells[0];
    let cellNumber = caller.parentNode.parentNode.cells[1];
    cellName.innerText = name;
    cellNumber.innerText = number;
}