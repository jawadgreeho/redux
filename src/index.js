import configureStore from "./store/configureStore";
import { bugAdded, bugResolved, bugRemoved, getUnresolvedBugs, bugAssignedToUser, getBugsByUser, loadBugs, addBug, resolveBug, assignBugToUser } from './store/bugs';
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";
import * as actions from './store/api';
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

store.dispatch(bugAssignedToUser({ id: 1, userId: 1}));

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
    dispatch({ type: 'bugsReceived', bugs: [1,2,3]});
    console.log(getState());
});

store.dispatch({
    type: "error",
    payload: { message: "An error occurred"}
});
store.dispatch(loadBugs());
store.dispatch(addBug({description: "a"}));
setTimeout(() => store.dispatch(loadBugs()), 2000);
setTimeout(() => store.dispatch(resolveBug(1)), 2000);
store.dispatch(assignBugToUser(4, 1));
// import Store from './customStore';

// import * as actions from './actionCreator';
// Store.subscribe(() => {
//         console.log("Store changed!", Store.getState())
//     });
// Store.dispatch(actions.bugAdded("Bug 1"));


//call function
//call the server
//update the store after calling the server