/**
 * Created by kit91ka 20.12.2017
 */
let injection = ['Canvas', [Canvas]];
function Canvas() {
  "use strict";
  function randomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }
  let columns = randomInt(1,100);
  let rows = randomInt(1,100);

  (function (m, n) {
    /// create base cell obj for table
    let rect = function (fromLeft = 0, fromTop = 0, firstCell) {
      let options = {
        width: 50,
        height: 50,
        stroke: '#000000',
        strokeWidth: 1,
        fill: '#fff9ff',
        selectable: false
      };
      firstCell ? options.columnNumber = fromLeft : "";
      options.left = fromLeft * (options.width);
      options.top = fromTop * (options.height);
      return new fabric.Rect(options);
    };
    let rectOpts = rect();

    /// create column text obj
    let columnText = function (text = "", fromLeft = 0, fromTop = 0) {
      let options = {
        fill: "#880E4F",
        strokeWidth: 1,
        stroke: '#000000',
        selectable: false,
        columnNumber : fromLeft,
      };
      options.left = (fromLeft + 0.1) * rectOpts.width;
      options.top = (fromTop + 0.1) * rectOpts.height;
      return new fabric.IText(text, options);
    };
    /// customisation of canvas div to table's width/height
    let canvasDiv = document.createElement('canvas');
    canvasDiv.id = "c";
    canvasDiv.width = rectOpts.width * m + rectOpts.strokeWidth;
    canvasDiv.height = rectOpts.height * n + rectOpts.strokeWidth;
    document.getElementById('test-canvas-div').appendChild(canvasDiv);

    let canvas = window.__canvas = new fabric.Canvas('c');
    /// create table
    for (let i = 0; i < m; i++) {
      for (let k = 0; k < n; k++) {
        if (k === 0) {
          canvas.add(rect(i, k, true));
          canvas.add(columnText(`${i + 1}`, i, k))
        } else {
          canvas.add(rect(i, k));
        }
      }
    }
    let tabWidth = 70;
    let tabHeight = 30;
    let tab = function (left, top,columnNumber, text = "", actionable = false) {
      let r = new fabric.Rect({
        width: tabWidth,
        height: tabHeight,
        fill: '#FFFFFF',
        strokeWidth: 1,
        stroke: '#000000',

      });
      let t = new fabric.IText(text, {
        backgroundColor: '#FFFFFF',
        fill: '#000000',
        fontSize: 12,
        top : 5,
        left: 5,
      });

      return new fabric.Group([ r, t ], {
        left: left,
        top: top,
        lockScalingX: true,
        lockScalingY: true,
        hasRotatingPoint: false,
        transparentCorners: false,
        cornerSize: 7,
        columnNumber : columnNumber,
        actionable : actionable,
        selectable: false
      });
    };

    let dropdownMenu = function (left, top, columnNumber) {
      let tabs = [];
      tabs.push(tab(left, top, columnNumber, `${columnNumber + 1}`));
      tabs.push(tab(left, top + tabHeight, columnNumber,  "Menu 1", true));
      tabs.push(tab(left, top + tabHeight*2, columnNumber, "Menu 2", true));
      canvas.add(...tabs);
      window.tabs = tabs;
    };

    let dialog = function (columnNumber) {
      let r = new fabric.Rect({
        width: 100,
        height: 100,
        fill: '#FFFFFF',
        strokeWidth: 1,
        stroke: '#000000',

      });
      let t = new fabric.IText(`Item  ${columnNumber + 1} is clicked!`, {
        backgroundColor: '#FFFFFF',
        fill: '#000000',
        fontSize: 12,
        top : 5,
        left: 5,
      });

      return new fabric.Group([ r, t ], {
        left: 0,
        top: 0,
        lockScalingX: true,
        lockScalingY: true,
        hasRotatingPoint: false,
        transparentCorners: false,
        cornerSize: 7,
        columnNumber : columnNumber,
        selectable: false
      });
    };
    ///prevent clicks when dialog is showing
    let holdClick = false;
    canvas.on('mouse:down', function (options) {
      console.log(options);
      window.a = canvas;
      if (!holdClick) {
        if (options.target.hasOwnProperty('columnNumber') && options.target.type != 'group') {
          canvas.getObjects().filter(el => el.type == 'group').forEach(el=>canvas.remove(el));
          dropdownMenu(options.e.clientX, options.e.clientY, options.target.columnNumber);
        } else {
          if (options.target.hasOwnProperty('columnNumber')) {
            if (options.target.type == 'group' && options.target.actionable) {
              ///remove dropdown menu;
              canvas.getObjects().filter(el => el.type == 'group').forEach(el=>canvas.remove(el));
              holdClick = true;
              canvas.add(dialog(options.target.columnNumber));
              setTimeout(function () {
                canvas.getObjects().filter(el => el.type == 'group').forEach(el=>canvas.remove(el));
                holdClick = false;
              }, 2000);
            }
          } else {
            ///remove dropdown menu;
            canvas.getObjects().filter(el => el.type == 'group').forEach(el=>canvas.remove(el));
          }
        }
      }

      // if (options.target) {
      //   console.log('an object was clicked! ', options.target);
      //   options.target.remove();
      //   canvas.renderAll();
      // }
    });
  })(columns, rows);
}

export default injection;