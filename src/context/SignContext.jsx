import { createContext, useContext, useEffect, useReducer } from "react";
import SignReducer from "../reducer/SignReducer"
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2'
import { db } from "../firebase.config";
import { ref, set, get, update } from "firebase/database"
let flag = false;

const SignContext = createContext();

const initialState = {
    full_name: "",
    phone: "",
    email: "",
    password: "",
    info: {},
    uid: "",
}
const SignContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SignReducer, initialState)

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log(location.pathname);


            if (user) {
                state.uid = user.uid
                await map(user.uid);
                if (location.pathname !== "/hero" && flag === true && location.pathname !== "/profile") {
                    location.href = "/hero";
                    console.log(user);
                }
            } else {
                if (location.pathname !== "/" && location.pathname !== "/signin") {
                    location.href = "/signin";
                }
            }
        });

        return () => unsubscribe();
    },[])
    const getValue = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target
        dispatch({ type: "GET_VALUE", payload: { name, value } })
    }

    const getVal = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target
        dispatch({ type: "GET_VALUE_PROFILE", payload: { name, value } })
    }

    const SignUp = () => {
        console.log(state);

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, state.email, state.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                const uid = user.uid
                const dataRef = ref(db, `users/${uid}/infodb`);
                set(dataRef, {
                    full_name: state.full_name,
                    email: state.email,
                    password: state.password,
                    phone: state.phone,
                })

                flag = true;
                location.href = "/signin";

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }


    const SignIn = async () => {
        console.log(state);
        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, state.email, state.password);
            const user = userCredential.user;
            console.log(user.uid);
            await map(user.uid);
        }
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: errorCode,
                title: 'Oops...',
                text: errorMessage,
            })
            .then(()=>{
            location.pathname="signin"

            })

        }
    }

    useEffect(() => {
        console.log(state.uid);
        map(state.uid)
    }, [])


    const map = async (uid) => {
        const dataRef = ref(db, `users/${uid}/infodb`);

        await get(dataRef).then((snapshot) => {

            if (snapshot.exists()) {
                state.info = snapshot.val()
                dispatch({ type: "SET_INFO", payload: snapshot.val() })

                console.log(snapshot.val(), "mappppped", state.info);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }


    const Update = async () => {
        console.log(state.info);
        console.log(state.phone);
        const userRef = ref(db, `users/${state.uid}/infodb`);


        // Update specific fields
        await update(userRef, {
            "phone": state.info.phone,
            "full_name": state.info.full_name
        })

    }
    const LogOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("success");

        }).catch((error) => {
            console.log(error);
        });
    }
    return (<SignContext.Provider value={{ state, LogOut, getValue, SignUp, SignIn, Update, getVal }}>{children}</SignContext.Provider>)
}

const UseSignContext = () => {
    return (useContext(SignContext))

}

export { UseSignContext, SignContextProvider }