'use strict';

/**
 * CLI PLugin
 */
var cliPlugin = {

  settings: {
  },


  /**
   * Initialize
   */
  init: function (config) {
    this.createElement();
  },

  createElement: function () {
    var element = document.createElement('div');
    element.className = 'cli-plugin';
    document.body.appendChild(element);
  },


};
