'use strict';

/**
 * CLI PLugin
 */
var cliPlugin = {

  settings: {
  },

  index: 0,
  history: [],

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
    cliPlugin.inputElement.setAttribute('autocomplete', 'off');
    cliPlugin.inputElement.setAttribute('autocorrect', 'off');
    cliPlugin.inputElement.setAttribute('autocapitalize', 'off');
    cliPlugin.inputElement.setAttribute('spellcheck', 'false');
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
    } else if ( event.keyCode === 38 ) {
      event.preventDefault();
      cliPlugin.getPrevCmd();
      cliPlugin.moveCursorBack();
    } else if ( event.keyCode === 40 ) {
      event.preventDefault();
      cliPlugin.getNextCmd();
      cliPlugin.moveCursorBack();
    } else if ( [33, 34, 35, 36, 37, 39].indexOf(event.keyCode) > -1 ) {
      event.preventDefault();
    }
  },

  getPrevCmd: function () {
    var cmd = cliPlugin.index === 0 && cliPlugin.history.length > 0 ? cliPlugin.history[0] : '';
    while ( cmd.length === 0 && cliPlugin.index > 0 ) {
      cmd = cliPlugin.history[--cliPlugin.index];
    }
    cliPlugin.inputElement.innerHTML = cmd;
  },

  getNextCmd: function () {
    var cmd = '';
    while ( cmd.length === 0 && cliPlugin.index < cliPlugin.history.length ) {
      cmd = cliPlugin.history[++cliPlugin.index] || '';
    }
    cliPlugin.inputElement.innerHTML = cmd;
  },

  exec: function () {
    var cmd = cliPlugin.inputElement.textContent.trim();
  },

  destroy: function () {
    cliPlugin.removeKeyListeners();
    cliPlugin.containerElement.parentNode.removeChild(cliPlugin.containerElement);
  },

  moveCursorBack: function () {
    var range, selection;
    if(document.createRange) {
      range = document.createRange();
      range.selectNodeContents(elem[0]);
      range.collapse(false);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    } else if(document.selection) {
      range = document.body.createTextRange();
      range.moveToElementText(contentEditableElement);
      range.collapse(false);
      range.select();
    }
  },

};
