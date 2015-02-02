# GitHub Issues
Sample React application built with Flux for learning purpose

`npm install -g webpack && npm install && webpack`

## Flux Action

[`src/lib/actions.es6`](https://github.com/roman01la/github-issues/blob/master/src/lib/actions.es6)

`Actions` module is a proto object with a single method `._dispatch`. Application actions should be defined within an object extended by proto object.

```
let ItemsActions = {};

Object.assign(ItemsActions, Actions);
```

Action producer can be notified about the status of the particular action. `._dispatch` returns a promise which can be optionally obtained by receiver store and handled accordingly.

```
ItemsActions.fetch = url => {

  return this._dispatch({

    actionType: Constants.FETCH_ITEMS,
    payload: { url }
  });
};

/* Show loader here */

ItemsActions.fetch(url)
  .then(/* Hide loader */)
  .catch(/* Show error msg */);
```

## Flux Store

[`src/lib/store.es6`](https://github.com/roman01la/github-issues/blob/master/src/lib/store.es6)

`Store` module is a class which handles data, actions, updates and notifications. 

`_state` prop is where all the data is stored within the store, it's optional when creating a new store, but defining store's structure still can help.

```
let ItemsStore = new Store({

  _state: {

    items: []
  }
});
```

Listen for changes from within of the component and use `.getState()` method to retrieve recent data from the store.
```
componentDidMount() {

  ItemsStore.addChangeListener(this._onChange);
},

componentWillUnmount() {

  ItemsStore.removeChangeListener(this._onChange);
},

_onChange() {

  this.setState(ItemsStore.getState());
}
```

Use `.bindAction` method to listen for particular actions and do things like calling API inside of the callback fn, which accepts dispatched action.

```
ItemsStore.bindAction(Constants.FETCH_ITEMS, action => {

  API.fetchItems(action.payload);
});
```
To notify back action producer you should register incoming action inside of a callback fn with `.registerAction` method, which accepts an object where keys are action type constants for handling success and error, and values are injected into the action promise's `resolve` and `reject` fns. This will return a unique `id`, which then should be passed as an argument to an `API` module.

```
ItemsStore.bindAction(Constants.FETCH_ITEMS, action => {

  let id = ItemsStore.registerAction({

    [Constants.FETCH_ITEMS_SUCCESS]: action.promise.resolve,
    [Constants.FETCH_ITEMS_ERROR]: action.promise.reject
  });

  API.fetchItems(action.payload, id);
});
```

When done, `API` module will dispatch an action with API response and injected `id`, if provided. Store can update itself when listening for `API` actions, automatically emit `CHANGE_EVENT` event and optionally notify action producer.

```
ItemsStore.bindAction(Constants.FETCH_ITEMS_SUCCESS, action => {

  let nextState = { items: action.payload.response };

  /* Update store */
  ItemsStore.update(nextState);

  /* OR */

  /* Update store and notify action producer */
  ItemsStore.update(nextState, Constants.FETCH_ITEMS_SUCCESS, action.id);
});
```

Additionally `CHANGE_EVENT` will be emitted along with provided store's `status`, and so components which are listening for changes can distinguish between succeed or failed changes and respond accordingly.

```
ItemsStore.update(nextState, Constants.FETCH_ITEMS_SUCCESS);

_onChange (status) {

  if (status === Constants.FETCH_ITEMS_SUCCESS) {

    this.setState(ItemsStore.getState());
  }
}
```

Doing everything explicitly might be confusing and looks like an overhead, but it's still optional functionality and you might don't want to use it everywhere.

## Flux API

[`sr/lib/api.es6`](https://github.com/roman01la/github-issues/blob/master/src/lib/api.es6)

`API` module is a proto object. Application API calls should be defined within an object extended by proto object.

```
let ItemsAPI = {};

Object.assign(ItemsAPI, Actions);
```

`._fetch` method accepts `id`, `url` and action type constants for dispatching success or error actions.

```
ItemsAPI.fetchItems = (payload, id) {

  return this._fetch.call(this, id, payload.url, {

    SUCCESS: Constants.FETCH_ITEMS_SUCCESS,
    ERROR: Constants.FETCH_ITEMS_ERROR
  });
};
```

`._fetch` returns a promise which can be used to immediately update store.

```
ItemsStore.update(nextState)
  .then(/* ... */)
  .catch(/* ... */);
```

## Flux Dispatcher
[Facebook's Flux `Dispatcher`](https://github.com/facebook/flux/blob/master/src/Dispatcher.js)
