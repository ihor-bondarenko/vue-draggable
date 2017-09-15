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

    //console.log(Modernizr.hasEvent('dragstart'));

    function Draggable(el, options) {
        if (!(el && el.nodeType && el.nodeType === 1)) {
            throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
        }
        this.el = el;
        this.el.draggable = true;

        this.el.addEventListener('drag', function(e){
           // console.log(event);
        });
        this.el.addEventListener('drop', function(e){
            e.preventDefault();
            console.log('%s   %s', 'drop', e)
        });
        this.el.addEventListener('dragover', function(e){
            e.preventDefault();
            e.target.style.backgroundColor = 'lightgray';
            console.log('%s   %s', 'dragover', e)
        });
        this.el.addEventListener('dragleave', function(e){
            e.preventDefault();
            e.target.style.backgroundColor = 'inherit';
            console.log('%s   %s', 'dragleave', e)
        });

    }

    Draggable.create = function (el, options) {
        return new Draggable(el, options);
    };

    (function _addDraggableDirective(){
        Vue.directive( "aco-vue-draggable", {
            bind: function(el, binding, vnode){
                console.log(vnode);
                Draggable.create(el,{});
            },
            update: function(e){}
        });
    })();

    // Export
    Draggable.version = '0.0.1b';
    return Draggable;
});
