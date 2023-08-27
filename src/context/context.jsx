import { createContext, useContext, useEffect, useReducer } from "react";
import Reducer from "../reducer/reducer";
import { db } from "../firebase.config";
import { ref, set, push, get, remove } from "firebase/database"
// import { UseSignContext } from "./SignContext";

// const { state } = UseSignContext();

// console.log(state.info,state.uid);
const MyContext = createContext();
const initialmainState = {
    dataMap: [],
    data: {},
    username: "",
    roll: "",
    edit: false,
    noInput: false,
    menu:true,
}
const MyContextProvider = ({ children }) => {
    const [mainState, dispatch] = useReducer(Reducer, initialmainState)


    const getVal = (e) => {
        const { name, value } = e.target
        dispatch({ type: "getVal", payload: { name, value } })
    }



    const map = (uid) => {
        const dataRef = ref(db,`users/${uid}/todo`);

        get(dataRef).then((snapshot) => {
            dispatch({ type: "map", payload: snapshot.val() })

            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }



    const Send = async () => {
        if(mainState.username == "" && mainState.roll == ""){
            mainState.noInput = true

        }
        if (mainState.username !== "" || mainState.roll !== "") {
            mainState.noInput = false
            dispatch({ type: "Send" })
            console.log(mainState.data);

        }
        
    }


    useEffect(() => {
        const dataRef = ref(db, `users/${mainState.uid}/todo`);
        push(dataRef, mainState.data)
        map(mainState.uid)

    }, [mainState.data])

    useEffect(() => {
        if (mainState.uid) {
            map(mainState.uid);
        }
    }, [mainState.uid]);


    const Delete = async (e) => {
        const key = e.key
        const dataRefKey = ref(db, `users/${mainState.uid}/todo/${key}`);
        try {
            await remove(dataRefKey);
            console.log(mainState.data);
            console.log('Data removed successfully.');
        } catch (error) {
            console.error('Error removing data from Firebase:', error);
        }

        map(mainState.uid)


    }


    const DeleteAll = async () => {
        console.log("hey");
        const dataRef = ref(db,`users/${mainState.uid}/todo`);

        try {
            await remove(dataRef);
            console.log('Data removed successfully.');
        } catch (error) {
            console.error('Error removing data from Firebase:', error);
        }

        map(mainState.uid)
    }


    const Edit = (e) => {
        const key = e.key
        console.log("HEY", e.edit, key);
        // mainState.data={[e.innerKey]:e.innerValue}
        dispatch({ type: "EDIT", payload: e })


    }


    const Update = () => {
        let currData = mainState.editData
        const key = currData.key
        console.log(currData);
        currData.edit = false
        const updatedData = {
            [mainState.username]: mainState.roll,
        };

        const dataRefKey = ref(db, `users/${mainState.uid}/todo/${key}`);

        set(dataRefKey, updatedData)
            .then(() => {
                map(mainState.uid); // Call map after the update is successful
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
        dispatch({ type: "UPDATE" })

    }
    return (<MyContext.Provider value={{ Edit, Update, Delete, DeleteAll, Send, getVal, mainState }}>{children}</MyContext.Provider>)
}


const UseMyContext = () => {
    return (useContext(MyContext))
}

export { MyContextProvider, UseMyContext }