export default function Reducer(state, action) {
    switch (action.type) {
        case "GET_VALUE":
            {
                let {name,value}=action.payload
                return{
                    ...state,
                    [name]:value,
                }
            }

            case "GET_VALUE_PROFILE":
                {
                    let {name,value}=action.payload
                    console.log(state.info,name,value);
                    return{
                        ...state,
                        info:{
                            ...state.info,
                        [name]:value,
                    }
                    }
                }

            case "SET_INFO":{
                let userData=action.payload
                console.log(userData);
                return{

                    ...state,
                    info:userData,
                }
            }
    }
    return state
}