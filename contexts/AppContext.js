import { createContext, useState } from "react";


// AppContext for data transfer

export const AppContext = createContext()

export const AppContextProvider = props => {

    const [appContext, setAppContext] = useState({})

    return (
        <AppContext.Provider value={[appContext, setAppContext]}>
            {props.children}
        </AppContext.Provider>
    )
}