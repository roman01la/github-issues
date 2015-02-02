import EventEmitter from 'eventemitter2';

import Dispatcher from '../dispatchers/dispatcher';
import Constants from '../constants/app-constants';

class Store extends EventEmitter {

    constructor (defs) {

        this._state = {};
        this._status = null;
        this._actions = {};
        this._callbacks = {};

        this.dispatchToken = Dispatcher.register(this.handleAction.bind(this));

        Object.assign(this, defs);
    }

    update (nextState, id, type) {

        Object.assign(this._state, nextState);

        if (id && type) {

            this._actions[id][type]();
            delete this._actions[id];
        }

        this._status = type;

        this.emitChange();
    }

    getState() {

        return this._state;
    }

    emitChange() {

        this.emit(Constants.CHANGE_EVENT, this._status);
    }

    addChangeListener (callback) {

        this.on(Constants.CHANGE_EVENT, callback);
    }

    removeChangeListener (callback) {

        this.removeListener(Constants.CHANGE_EVENT, callback);
    }

    registerAction (promise) {

        let id = Symbol();

        this._actions[id] = promise;

        return id;
    }

    bindAction (type, callback) {

        this._callbacks[type] = this._callbacks[type] || [];

        this._callbacks[type].push(callback);
    }

    handleAction (action) {

        let callbacks = this._callbacks[action.actionType];

        callbacks && callbacks.map(callback => callback(action));
    }
};

export default Store;
