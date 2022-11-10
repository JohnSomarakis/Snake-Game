function initBoard() {
    const table = document.getElementById('mainTable');
    let tr = document.createElement('tr');

    for (let i = 8; i >= 1; i--) {
        tr = document.createElement('tr');
        for (let j = 9; j >= 0; j--) {
            const td1 = document.createElement('td');
            const num = i * 10 - j;
            td1.innerHTML = "<div id='position" + num + "'><img  src='images/" + num + ".png'  height=70 width=70 alt='images/" + num + "''></div>";

            tr.appendChild(td1);

        }
        table.appendChild(tr);
        console.log("data");
    }
}
