import configureStore from "./store/configureStore";
import {  bugAdded, bugResolved, bugRemoved, getUnresolvedBugs, bugAssignedToUser, getBugsByUser } from './store/bugs';
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log("Store changed!", store.getState())
});

store.dispatch(userAdded( { name: "User 1"}));
store.dispatch(userAdded( { name: "User 2"}));

store.dispatch(projectAdded({projectName: "Bug 1"}));

store.dispatch(bugAdded({description: "Bug 1"}));
store.dispatch(bugAdded({description: "Bug 2"}));
store.dispatch(bugAdded({description: "Bug 3"}));

store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1}));

store.dispatch(bugResolved({id : 1}));

store.dispatch(bugRemoved({id: 3}));
unsubscribe();
console.log(store.getState());

const x = getUnresolvedBugs(store.getState());
const y = getUnresolvedBugs(store.getState());
console.log(x === y);
console.log(x);
console.log(getBugsByUser(1)(store.getState()));

//dispatching functions using custom middleware function 'func'
store.dispatch((dispatch, getState) => {
    //call an API
    //When the promise is resolved => dispatch()
    //If the promise is rejected => dispatch()
    dispatch({ type: 'bugsRecieved', bugs: [1,2,3]});
    console.log(getState());
});

store.dispatch({
    type: "error",
    payload: { message: "An error occurred"}
});
// import Store from './customStore';

// import * as actions from './actionCreator';
// Store.subscribe(() => {
//         console.log("Store changed!", Store.getState())
//     });
// Store.dispatch(actions.bugAdded("Bug 1"));
