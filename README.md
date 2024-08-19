 use Redux, Redux Thunk, and Axios to handle asynchronous API requests in a Redux store.

Redux Setup:

Store Creation: Uses createStore from Redux and applies redux-thunk middleware to handle asynchronous actions.
Reducer: FETCH_API updates the store's state based on different action types related to API request states.
Action Types and Creators:

Action Types:
PENDING: Indicates the API request is in progress.
FULFILLED: Indicates the API request was successful and data is available.
REJECTED: Indicates the API request failed and an error message is available.
Action Creators: Functions like FETCH_PENDING, FETCH_FULFILLED, and FETCH_REJECTED return action objects for the above states.
Asynchronous Action Creator:

actionCreator: A thunk that performs an API request using Axios. It dispatches actions based on the request’s outcome:
FETCH_PENDING before the request starts.
FETCH_FULFILLED if the request is successful.
FETCH_REJECTED if the request fails.
Store Subscription:

Logging: Subscribes to store updates and logs the current state to the console whenever an action is dispatched.
Execution:

Dispatches the actionCreator to initiate the API request and update the store.
