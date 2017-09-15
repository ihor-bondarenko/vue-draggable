(function dropableModule(factory) {
    "use strict";

    if (typeof define === "function" && define.amd) {
        define(factory);
    }
    else if (typeof module != "undefined" && typeof module.exports != "undefined") {
        module.exports = factory();
    }
    else {
        /* jshint sub:true */
        window["Dropable"] = factory();
    }
})(function sortableFactory() {
    "use strict";

    if (typeof window == "undefined" || !window.document) {
        return function dropableError() {
            throw new Error("Dropable.js requires a window with a document");
        };
    }

    function Dropable(el, options) {

    }


    Dropable.create = function (el, options) {
        return new Sortable(el, options);
    };


    // Export
    Dropable.version = '0.0.1b';
    return Dropable;
});
