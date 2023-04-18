import {myArray} from "../Main.js";

const Table = (data) => {
  const table = document.createElement("table");
  const header = document.createElement("thead");
  const body = document.createElement("tbody");

  // start building table header
  const headerBuilder = () => {
    header.innerHTML = "";
    let colCount = Math.max(data.headers.length, data.colCount);
    let tr = document.createElement("tr");
    for (let i = 0; i < colCount; i++) {
      let th = document.createElement("th");
      if (!data.headers[i]) data.headers[i] = "Column #" + (i + 1);
      th.innerText = data.headers[i];
      tr.appendChild(th);
    }
    header.append(tr);
    table.appendChild(header);
  };
  // finished building header
  // start building the body
  const bodyBuilder = () => {
    body.innerHTML = "";
    if (data.body) {
      let colCount = Math.max(data.headers.length, data.colCount);
      // if the field in a row is missing data
      data.body.forEach((row) => {
        while (row.length < colCount) {
          row.push(""); // add empty string as data
        }
      });
      data.body.forEach((row, rowIndex) => {
        let tr = document.createElement("tr");
        row.forEach((col, colIndex) => {
          let td = document.createElement("td");
          let field = document.createElement("input");
          field.type = "text";
          field.className = "field";
          field.value = col;
          field.onchange = (e) => setData(e.target.value, rowIndex, colIndex);
          td.appendChild(field);
          tr.appendChild(td);
        });
        let deleteIcon = document.createElement("i");
        deleteIcon.className = "fa fa-trash-o fa-lg";
        deleteIcon.title = "delete";
        deleteIcon.onclick = () => deleteRow(rowIndex);
        tr.appendChild(deleteIcon);
        body.appendChild(tr);
      });
    }
    table.appendChild(body);
  };
  // finished building body and table
  headerBuilder();
  bodyBuilder();

  // table controllers
  const addRow = () => {
    data.body.push([]);
    bodyBuilder();
  };

  const deleteRow = (index) => {
    data.body.splice(index, 1);
    bodyBuilder();
  };

  const setData = (newValue, rowIndex, colIndex) => {
    data.body[rowIndex][colIndex] = newValue;
  };

  const addColumn = (colName) => {
    data.headers.push(colName);
    data.colCount++;
    headerBuilder();
    bodyBuilder();
  };

  const deleteColumn = (index) => {
    data.headers.splice(index, 1);
    data.colCount--;
    data.body.forEach((row) => row.splice(index, 1));
    headerBuilder();
    bodyBuilder();
  };

  const download = () => {
    let content = "";
    data.body.forEach((row) => {
      content += row.join(";") + "\r\n";
    });
    window.open("data:text/csv;charset=utf-8," + encodeURIComponent(content));
  };

  const loadCSV = (file) => {
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (e) => {
      // data.colCount data.headers data.body
      data.body = [];
      data.headers = [];
      data.colCount = 0;
      let rows = e.target.result.split("\r\n");
      rows.forEach((r) => {
        let splitted = r.split(";");
        //console.log(splitted);
        data.body.push(splitted);
        myArray.data.push(splitted);
        if (splitted.length > data.colCount) {
          data.colCount = splitted.length;
        }
      });
      headerBuilder();
      bodyBuilder();
    };
  };


  const controllers = {
    addRow: addRow,
    deleteRow: deleteRow,
    addColumn: addColumn,
    deleteColumn: deleteColumn,
    download: download,
    loadCSV: loadCSV,
  };

  return [table, controllers];
};

export {Table};
