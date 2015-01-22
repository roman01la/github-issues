import Dispatcher from '../dispatchers/dispatcher';
import Constants from '../constants/app-constants';
import { EventEmitter } from 'events';

class Store extends EventEmitter {

    constructor (defs) {

        Object.assign(this, defs);
    }

    _state: {}

    update (state) {

        Object.assign(this._state, state);
        this.emitChange();
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

        this.dispatchToken = Dispatcher.register(callback);
    }
};

export default Store;
