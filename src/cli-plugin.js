'use strict';

/**
 * CLI PLugin
 */
var cliPlugin = {

  /**
   * Vars
   */
  index: 0,
  history: [],
  commands: {},

  /**
   * Default settings
   */
  settings: {
    textColor: 'rgba(245, 245, 245, 1)',
    cursorColor: 'rgba(245, 245, 245, 0.75)',
    backgroundColor: 'rgba(51, 51, 51, 0.75)',
  },

  /**
   * Initialize
   */
  init: function (config) {
    Object.assign(cliPlugin.settings, config);

    cliPlugin.createElements();
    cliPlugin.addKeyListeners();
    cliPlugin.focusInputElement();
  },

  /**
   * Create required elements
   */
  createElements: function () {
    cliPlugin.containerElement = document.createElement('div');
    cliPlugin.containerElement.setAttribute('class', 'cli-plugin');
    cliPlugin.containerElement.setAttribute('style', 'background:'+cliPlugin.settings.backgroundColor);
    document.body.appendChild(cliPlugin.containerElement);

    cliPlugin.outputElement = document.createElement('div');
    cliPlugin.outputElement.setAttribute('class', 'output');
    cliPlugin.outputElement.setAttribute('style', 'color:'+cliPlugin.settings.textColor);
    cliPlugin.containerElement.appendChild(cliPlugin.outputElement);

    cliPlugin.inputElement = document.createElement('div');
    cliPlugin.inputElement.setAttribute('class', 'input');
    cliPlugin.inputElement.setAttribute('style', 'text-shadow: 0 0 0 '+cliPlugin.settings.textColor);
    cliPlugin.inputElement.setAttribute('contenteditable', 'true');
    cliPlugin.inputElement.setAttribute('tabindex', '0');
    cliPlugin.inputElement.setAttribute('autocomplete', 'off');
    cliPlugin.inputElement.setAttribute('autocorrect', 'off');
    cliPlugin.inputElement.setAttribute('autocapitalize', 'off');
    cliPlugin.inputElement.setAttribute('spellcheck', 'false');
    cliPlugin.containerElement.appendChild(cliPlugin.inputElement);

    cliPlugin.cursorElement = document.createElement('div');
    cliPlugin.cursorElement.setAttribute('class', 'cursor');
    cliPlugin.cursorElement.setAttribute('style', 'background:'+cliPlugin.settings.cursorColor);
    cliPlugin.inputElement.appendChild(cliPlugin.cursorElement);
  },

  /**
   * Add key bindings and event listeners
   */
  addKeyListeners: function () {
    document.addEventListener('keydown', cliPlugin.registerEvent, false);
    cliPlugin.inputElement.addEventListener('blur', cliPlugin.focusInputElement, false);
  },

  /**
   * Remove key bindings and event listeners
   */
  removeKeyListeners: function () {
    document.removeEventListener('keydown', cliPlugin.registerEvent);
    cliPlugin.inputElement.removeEventListener('blur', cliPlugin.focusInputElement);
  },

  /**
   * Dispatcher function for various events
   */
  registerEvent: function (event) {
    if ( event.keyCode === 13 ) {
      event.preventDefault();
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
    cliPlugin.setActiveState();
  },

  /**
   * Execute a comand (on enter)
   */
  exec: function () {
    var cmd = cliPlugin.inputElement.textContent.trim();
    if ( !!cmd ) {
      cliPlugin.inputElement.removeChild(cliPlugin.inputElement.firstChild);
    }

    cliPlugin.history.push(cmd);
    cliPlugin.index = cliPlugin.history.length;
    cliPlugin.print(cmd);

    if ( typeof cliPlugin.commands[cmd] === 'function' ) {
      cliPlugin.commands[cmd]();
    }
  },

  /**
   * Go back in history to show the previous command
   */
  getPrevCmd: function () {
    var cmd = cliPlugin.index === 0 && cliPlugin.history.length > 0 ? cliPlugin.history[0] : '';
    while ( cmd.length === 0 && cliPlugin.index > 0 ) {
      cmd = cliPlugin.history[--cliPlugin.index];
    }
    cliPlugin.inputElement.innerHTML = cmd;
  },

  /**
   * Go forward in history to show the next command
   */
  getNextCmd: function () {
    var cmd = '';
    while ( cmd.length === 0 && cliPlugin.index < cliPlugin.history.length ) {
      cmd = cliPlugin.history[++cliPlugin.index] || '';
    }
    cliPlugin.inputElement.innerHTML = cmd;
  },

  /**
   * Set focus on input element
   */
  focusInputElement: function () {
    cliPlugin.inputElement.focus();
  },

  /**
   * Set active state on input (while typing)
   */
  setActiveState: function () {
    cliPlugin.inputElement.classList.add('active')
    window.clearTimeout(cliPlugin.eventTimeoutId);
    cliPlugin.eventTimeoutId = window.setTimeout(function () {
      cliPlugin.inputElement.classList.remove('active')
    }, 1000);
  },

  /**
   * Move cursor to end of line
   */
  moveCursorBack: function () {
    var range, selection;
    if(document.createRange) {
      range = document.createRange();
      range.selectNodeContents(cliPlugin.inputElement);
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

  /**
   * Register a specific command with callback
   */
  bind: function (command, callback) {
    cliPlugin.commands[command] = callback;
  },

  /**
   * Unregister a specific command
   */
  unbind: function (command) {
    delete cliPlugin.commands[command];
  },

  /**
   * Pring text
   */
  print: function(text) {
    var element = document.createElement('div');
    element.innerHTML = text ? text : '&#8203;';
    cliPlugin.outputElement.appendChild(element);
  },

  /**
   * Remove all key bindings and elements
   */
  destroy: function () {
    cliPlugin.removeKeyListeners();
    cliPlugin.containerElement.parentNode.removeChild(cliPlugin.containerElement);
  },

};
