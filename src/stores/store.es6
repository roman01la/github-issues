import { EventEmitter } from 'events';

import Dispatcher from '../dispatchers/dispatcher';
import Constants from '../constants/app-constants';

class Store extends EventEmitter {

    constructor (defs) {

        this._state = {};
        this._actions = {};

        Object.assign(this, defs);
    }

    update (nextState, id, type) {

        Object.assign(this._state, nextState);
        this.emitChange();

        if (type) {

            this._actions[id][type]();
            delete this._actions[id];
        }
    }

    getState() {

        return this._state;
    }

    emitChange() {

        this.emit(Constants.CHANGE_EVENT);
    }

    addChangeListener (callback) {

        this.on(Constants.CHANGE_EVENT, callback);
    }

    removeChangeListener (callback) {

        this.removeListener(Constants.CHANGE_EVENT, callback);
    }

    dispatchToken: ''

    handleAction (callback) {

        this.dispatchToken = Dispatcher.register(callback.bind(this));
    }

    registerAction (promise) {

        let id = Symbol();

        this._actions[id] = promise;

        return id;
    }
};

export default Store;
