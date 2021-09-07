console.log(window.Redux);

const {createStore} = window.Redux;

//state
//reducer
//store

//1. Setup redux store
// const initialState = [
//     'Listen to music',
// ];
const initialState = JSON.parse(localStorage.getItem("hobby_list"))||[];

const hobbyReducer = (state = initialState, action) =>{
    switch (action.type) {
        case "ADD_HOBBY":{
            const newList = [...state];
            newList.push(action.payload);
            return newList;
        }
        default:
            return state;
    }
}

const store = createStore(hobbyReducer);


//2. Render redux hobby list

const renderHobbyList = (hobbyList) =>{
    if(!Array.isArray(hobbyList) || hobbyList.length === 0) return;

    const ulElement = document.querySelector("#hobbyListID");
    if(!ulElement) return;

    //reset previous content of ulElement
    ulElement.innerHTML = '';

    for (const hobby of hobbyList) {
        const liElement = document.createElement('li');
        liElement.textContent = hobby;

        ulElement.appendChild(liElement);
    }
}



//Render initialHobbyList
const initialHobbyList = store.getState();
console.log(initialHobbyList);
renderHobbyList(initialHobbyList);
// renderHobbyList(["luan","luann","luannnn"]);


//Handle form submit
const hobbyFormElement = document.querySelector("#hobbyFormID");
if(hobbyFormElement){
    const handleFormSubmit = (e)=>{
        //prevent browser from reloading
        e.preventDefault();

        const hobbyTextElement = hobbyFormElement.querySelector("#hobbyTextID");
        if(!hobbyTextElement) return;

        console.log(hobbyTextElement.value);
        const action = {
            type:'ADD_HOBBY',
            payload:hobbyTextElement.value
        };
        store.dispatch(action);
        hobbyFormElement.reset();
    };
    hobbyFormElement.addEventListener('submit',handleFormSubmit);
}
store.subscribe(()=>{
    console.log("State update:",store.getState());
    const newHobbyList = store.getState();
    renderHobbyList(newHobbyList);

    localStorage.setItem('hobby_list',JSON.stringify(newHobbyList));
})
