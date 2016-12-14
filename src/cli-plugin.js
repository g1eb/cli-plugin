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
    cliPlugin.focusInputElement();
  },

  createElements: function () {
    cliPlugin.containerElement = document.createElement('div');
    cliPlugin.containerElement.setAttribute('class', 'cli-plugin');
    document.body.appendChild(cliPlugin.containerElement);

    cliPlugin.inputElement = document.createElement('div');
    cliPlugin.inputElement.setAttribute('class', 'input');
    cliPlugin.inputElement.setAttribute('contenteditable', 'true');
    cliPlugin.inputElement.setAttribute('tabindex', '0');
    cliPlugin.containerElement.appendChild(cliPlugin.inputElement);

    cliPlugin.outputElement = document.createElement('div');
    cliPlugin.outputElement.setAttribute('class', 'output');
    cliPlugin.containerElement.appendChild(cliPlugin.outputElement);
  },

  focusInputElement: function () {
    cliPlugin.inputElement.focus();
  },

  addKeyListeners: function () {
    document.addEventListener('keydown', cliPlugin.registerEvent, false);
    cliPlugin.inputElement.addEventListener('blur', cliPlugin.focusInputElement, false);
  },

  removeKeyListeners: function () {
    document.removeEventListener('keydown', cliPlugin.registerEvent);
    cliPlugin.inputElement.removeEventListener('blur', cliPlugin.focusInputElement);
  },

  registerEvent: function (event) {
    cliPlugin.inputElement.classList.add('active')
    window.clearTimeout(cliPlugin.eventTimeoutId);
    cliPlugin.eventTimeoutId = window.setTimeout(function () {
      cliPlugin.inputElement.classList.remove('active')
    }, 1000);

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
