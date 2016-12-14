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
    cliPlugin.createElements();
    cliPlugin.addKeyListeners();
  },

  createElements: function () {
    cliPlugin.containerElement = document.createElement('div');
    cliPlugin.containerElement.setAttribute('class', 'cli-plugin');
    document.body.appendChild(cliPlugin.containerElement);

    cliPlugin.inputElement = document.createElement('div');
    cliPlugin.inputElement.setAttribute('class', 'input active');
    cliPlugin.inputElement.setAttribute('contenteditable', 'true');
    cliPlugin.inputElement.setAttribute('tabindex', '0');
    cliPlugin.containerElement.appendChild(cliPlugin.inputElement);

    cliPlugin.outputElement = document.createElement('div');
    cliPlugin.outputElement.setAttribute('class', 'output');
    cliPlugin.containerElement.appendChild(cliPlugin.outputElement);
  },

  addKeyListeners: function () {
    document.addEventListener('keydown', cliPlugin.registerEvent, false);
  },

  removeKeyListeners: function () {
    document.removeEventListener('keydown', cliPlugin.registerEvent);
  },

  registerEvent: function (event) {
    if ( event.keyCode === 13 ) {
      cliPlugin.exec();
    }
  },

  exec: function () {
    var cmd = cliPlugin.inputElement.textContent.trim();
  },

  destroy: function () {
    cliPlugin.removeKeyListeners();
    cliPlugin.containerElement.parentNode.removeChild(cliPlugin.containerElement);
  },

};
