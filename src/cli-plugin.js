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
    this.createElements();
    this.addKeyListeners();
  },

  createElements: function () {
    this.containerElement = document.createElement('div');
    this.containerElement.setAttribute('class', 'cli-plugin');
    document.body.appendChild(this.containerElement);

    this.inputElement = document.createElement('div');
    this.inputElement.setAttribute('class', 'input active');
    this.inputElement.setAttribute('contenteditable', 'true');
    this.inputElement.setAttribute('tabindex', '0');
    this.containerElement.appendChild(this.inputElement);

    this.outputElement = document.createElement('div');
    this.outputElement.setAttribute('class', 'output');
    this.containerElement.appendChild(this.outputElement);
  },

  addKeyListeners: function () {
    document.addEventListener('keydown', this.exec, false);
  },

  removeKeyListeners: function () {
    document.removeEventListener('keydown', this.exec);
  },

};
