var orm = require("../config/orm");


var burger = {
    
    all: function (cb) {
        orm.all("burgers", function (res) {
            cb(res)
        });
    },

    
    create: function (burgerObj, cb) {
        orm.create("burgers", burgerObj, function (res) {
            cb(res)
        });
    },
    update: function (id, burgerObj, cb) {
        orm.update("burgers", burgerObj, "id = " + id , function (res) {
            cb(res);
        });
    }
};

module.exports = burger