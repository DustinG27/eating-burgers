// Import MySQL connection.
var connection = require("./connection");

// Add quotes to the strings
function escape(value) {
    return typeof value === "string" ? `'${value}'` : value
}
 
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

// Object relational mapping
var orm = {
    // return all the data
    all: function (tableInput, cb) {
        var queryString = 'SELECT * FROM' + tableInput + ';';

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },

    // Insert new row in the table
    create: function (table, obj, cb) {
        var queryString = `
        INSERT INTO ${table} (${Object.keys(obj).toString()}) 
        VALUES (${Object.values(obj).map(escape).toString()});
        `
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // Update an existing row in the table
    update: function (table, obj, condition, cb) {
        var queryString = `
          UPDATE ${table}
          SET ${objToSql(obj)}
          WHERE ${condition};
        `
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
