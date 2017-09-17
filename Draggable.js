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

    var _isTouchstart = checkHasEvent('touchstart');
    var _isMousedown = checkHasEvent('mousedown');
    var _isPointerdown = checkHasEvent('pointerdown');

    function checkHasEvent(evName){
      if(typeof Modernizr != "undefined") {
          return Modernizr.hasEvent(evName);
      }
      return false;
    }

    function logEvent(e) {
      var logContainerEl = document.getElementById('eventLog');
      if(!logContainerEl) {
        logContainerEl = document.createElement('div');
        logContainerEl.setAttribute('id', 'eventLog');
        document.appendChild(logContainerEl);
      }
      var newDiv = document.createElement("div");
      newDiv.setAttribute('class', 'event-type-container');
      var elType = document.createElement('span');
      elType.insertAdjacentHTML('afterbegin',e.type);
        elType.insertAdjacentHTML('afterbegin', '<div></div>');
      elType.insertAdjacentHTML('afterbegin', '_isTouchstart:'+_isTouchstart+' _isMousedown:'+_isMousedown+' _isPointerdown:'+_isPointerdown)
      newDiv.appendChild(elType);
      logContainerEl.insertBefore(newDiv, logContainerEl.firstChild);
    }

    function _onPointerdown(e){
      console.log(e);
        e.preventDefault();
        e.stopPropagation();
        logEvent(e);
        var elem = document.elementFromPoint(e.clientX, e.clientY);
    }

    function _onTouchcancel(e) {
      logEvent(e);
    }

    function _onTouchstart(e) {
     e.preventDefault();
     e.stopPropagation();
     logEvent(e);
    }

    function Draggable(el, options) {
        if (!(el && el.nodeType && el.nodeType === 1)) {
            throw 'Draggable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
        }
        this.el = el;
        this.el.draggable = true;
        this.el.addEventListener('touchstart', _onTouchstart, false);
        this.el.addEventListener('touchcancel', _onTouchcancel, false);
        this.el.addEventListener('mousedown', function(e){
          console.log(e);
          logEvent(e);
        });
        this.el.addEventListener('pointerdown', _onPointerdown, false);
        this.el.addEventListener('touchend', function(e){
        //  e.preventDefault();
        //  e.stopPropagation();
          var changedTouch = e.changedTouches[0];
          var elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
        //  console.log(elem);
        })

        this.el.addEventListener('drag', function(e){
          //  e.preventDefault();
          //  console.log(e);
        });
        this.el.addEventListener('dragstart', function(e){
          logEvent(e)
            //e.preventDefault();
            e.dataTransfer.setData("text/plain", e.target.id);
        });
        this.el.addEventListener('drop', function(e){
            //e.preventDefault();
            e.target.style.backgroundColor = 'inherit';
        });
        this.el.addEventListener('dragover', function(e){
            //e.preventDefault();
            e.target.style.backgroundColor = 'lightgray';
        });
        this.el.addEventListener('dragleave', function(e){
            //e.preventDefault();
            e.target.style.backgroundColor = 'inherit';
        });

    }

    Draggable.create = function (el, options) {
        return new Draggable(el, options);
    };

    (function _addDraggableDirective(){
        Vue.directive( "aco-vue-draggable", {
            bind: function(el, binding, vnode){
                Draggable.create(el,{});
            },
            update: function(e){}
        });
    })();

    // Export
    Draggable.version = '0.0.1b';
    return Draggable;
});
