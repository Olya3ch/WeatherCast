export class Table {
  head = [];
  rows = [];

  constructor(head) {
    this.head = head;
  }

  _genTh(columnName) {
    return `<th>${columnName}</th>`;
  }

  _genTd(columnName) {
    return `<td>${columnName}</td>`;
  }

  _genTr(row) {
    let rowHTML = "<tr>";
    row.forEach((cell) => {
      const cellHTML = this._genTd(cell);
      rowHTML += cellHTML;
    });

    return rowHTML + "</tr>";
  }

  _genHead() {
    let rowHTML = "<tr>";
    this.head.forEach((cell) => {
      const cellHTML = this._genTh(cell);
      rowHTML += cellHTML;
    });
    return rowHTML + "</tr>";
  }

  _genContentHTML() {
    let contentHTML = "";
    this.rows.forEach((row) => {
      contentHTML += this._genTr(row);
    });
    return contentHTML;
  }

  genTable() {
    return "<table>" + this._genHead() + this._genContentHTML() + "</table>";
  }

  push(row) {
    this.rows.push(row);
  }
}
