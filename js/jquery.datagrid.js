/*
Description: $.fn.combobox
Author: Kris Zhang
*/

(function($) {

  $.fn.datagrid = function(method, options) {

    var $this = $(this);

    var bind = function($rows) {
      var onSelect = $this.data("onSelect");

      $rows = $rows || $("tbody tr", $this);
      onSelect && $rows.click(function(e) {
        $(this).toggleClass("selected");
        onSelect();
      });
    };

    var getRow = function(columns, row) {
      var trow = "<tr>";
      for (var j = 0, m = columns[0].length; j < m; j++) {
        var column = columns[0][j]
          , format = column.formatter
          , value  = row[column.field];

        typeof value == "undefined" && (value = "");

        trow
          = trow + "<td>"
          + (format ? format(value, row) : value)
          + "</td>";
      };
      trow += "</tr>";
      return trow;
    };

    //handle: $().datagrid({column: [[]]})
    if (method.constructor == Object) {
      var columns = method.columns;
 
      if (columns) {
        $("thead", $this).size() < 1
          && $this.append("<thead></thead>");

        var header = "<tr>";
        for (var i = 0, l = columns[0].length; i < l; i++) {
          var col = columns[0][i];
          header += '<th>' + (col.title || "") + '</th>';
        }
        header += "</tr>";

        $this
          //.removeClass("c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12")
          //.addClass("c" + l)
          .addClass("data")
          .data("columns", columns)
          .data("onSelect", method.onSelect);

        $("thead", $this).html(header);
      }
    }

    //handle: $().datagrid("loadData", {rows: []}) or $().data("loadData", [])
    if (method == "loadData") {
      if (!options) return;

      var rows = options.rows || options;

      var body = "<tbody>";
      if (rows) {
        var columns = $this.data("columns");
        for (var i = 0, l = rows.length; i < l; i++) {
          body += getRow(columns, rows[i]);
        };
      }
      body += "</tbody>";

      $("tbody", $this).remove();
      $this
        .data("rows", rows)
        .append(body);
      //rebind events
      bind();
    }

    if (method == "getColumnFields") {
      return $this.data("columns");
    }

    if (method == "unselectRow") {
      $("tbody tr", $this).eq(options).removeClass("selected");
    }

    if (method == "updateRow") {
      var idx     = options.index
        , row     = options.row
        , columns = $this.data("columns")
        , rows    = $this.data("rows");

      if (rows) {
        row = $.extend(rows[idx], row);
        $this.data("rows", rows);
      }

      var $row = $(getRow(columns, row));

      $("tbody tr", $this).eq(idx)
        .after($row)
        .remove();

      bind($row);
    }

    if (method == "getSelections") {
      var rows    = $this.data("rows")
        , selRows = [];

      $("tbody tr", $this).each(function(idx) {
        $(this).hasClass("selected") && selRows.push(rows[idx]);
      });

      return selRows;
    }

    return $this;
  };

})(jQuery);