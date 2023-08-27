export default function Reducer(mainState, action) {

    switch (action.type) {
        case "getVal": {
            let { name, value } = action.payload

            return {
                ...mainState,
                [name]: value,
            }
        }

        case "Send": {

            const Data = {
                [mainState.username]: mainState.roll,
            }
            return {
                ...mainState,
                data: Data,
                username: "",
                roll: ""
            }

        }

        case "map":
            {
                let dataFound = action.payload
                const individualData = [];
                console.log(dataFound);

                for (const key in dataFound) {
                    if (Object.prototype.hasOwnProperty.call(dataFound, key)) {
                        const object = dataFound[key];
                        const innerKey = Object.keys(object)[0];
                        const innerValue = object[innerKey];

                        individualData.push({ key, innerKey, innerValue, edit: false });
                    }
                }

                return {
                    ...mainState,
                    dataMap: individualData,
                }

            }


        case "EDIT": {
            const e = action.payload
            e.edit = true

            console.log(e.innerKey, "hi");

            return {
                ...mainState,
                username: e.innerKey,
                roll: e.innerValue,
                edit:true,
                editData:e,
            }
        }


        case "UPDATE": {
            return {
                ...mainState,
                username:"",
                roll:"",
                edit:false,

            }
        }
    }
    return mainState
}