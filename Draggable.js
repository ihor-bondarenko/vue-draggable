(function draggableModule(factory) {
    "use strict";

    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof module != "undefined" && typeof module.exports != "undefined") {
        module.exports = factory();
    } else {
        /* jshint sub:true */
        window["Draggable"] = factory();
    }
})(function sortableFactory() {
    "use strict";

    if (typeof window == "undefined" || !window.document) {
        return function draggableError() {
            throw new Error("Draggable.js requires window");
        };
    }else if(typeof Vue == "undefined"){
        return function draggableError() {
            throw new Error("Draggable.js requires Vue.js");
        };
    }

    (function _addDraggableDirective(){
        Vue.directive( "aco-vue-draggable", {
            bind: function(el, binding, vnode){},
            update: function(e){}
        });
    })();

    function Draggable(el, options) {

    }

    Draggable.create = function (el, options) {
        return new Sortable(el, options);
    };


    // Export
    Draggable.version = '0.0.1b';
    return Draggable;
});
