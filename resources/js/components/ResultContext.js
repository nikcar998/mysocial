import React, { useState} from 'react';
 const ResultContext = React.createContext();
export default ResultContext 

export function ResultProvider({children}){
    const [otherUser, setOtherUser]= useState("");

    return (
        <ResultContext.Provider value={{otherUser, setOtherUser}} >
            {children}
        </ResultContext.Provider>
    )
}