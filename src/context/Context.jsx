// import {createContext, useState} from "react";
// import runChat from "../config/Gemini";
// export const Context = createContext();

// const ContextProvider = (props) =>{
//     const[input, setInput]=useState("");
//     const[recentPrompt,setRecentPrompt]=useState("");
//     const[prevPrompts,setPrevPrompts]=useState([]);
//     const[showResult, setShowResult]=useState(false);
//     const[loading, setLoading]=useState(false);
//     const[resultData, setResultData]=useState("");

//     const delayPara = (index, nextword) =>{
//        setTimeout(function (){
//         setResultData(prev =>prev+nextword);
//        },5*index)
//     }
        
//   const onSent = async (prompt) =>{
//     // await runChat(input);
//     setResultData("");
//     setLoading(true);
//     setShowResult(true);
//     let response;
//     if(prompt !== undefined){
//         response = await runChat(prompt)
//         setRecentPrompt(prompt)

//     }
//     else{
//         setPrevPrompts(prev =>[...prev,input])
//         setRecentPrompt(input)
//         response = await runChat(input)
//     }
    
    

//     try {
//         console.log("Sending prompt:", input); // Input dikhaye
//         const response = await runChat(input);
//         let responseArray = response.split("**");
//         let newResponse="";
//         for(let i= 0;  i<responseArray.length; i++)
//         {
//             if(i==0 || i%2 !==1){
//                 newResponse += responseArray[i]
//             }
//             else{
//                 newResponse += "<b>"+responseArray[i]+"</b>";
//             }
//         }
//         let newResponse2 = newResponse.split("*").join("</br>")
//         console.log("Gemini Response:", newResponse2); // Response console par
//          let newResponseArray=newResponse2.split("");
//         for(let i=0; i<newResponseArray.length; i++){
//            const nextword = newResponseArray[i]
//            delayPara(i, nextword);
//         }


//         // setResultData(newResponse2)
//         setLoading(false)
//         setInput("")
//     } catch (error) {
//         console.error("API Error:", error); // Error dikhaye
//     }
    
// };
 
//     const contextValue = {
//         input,
//         setInput,
//         recentPrompt,
//         setRecentPrompt,
//         prevPrompts,
//         setPrevPrompts,
//         showResult,
//         setShowResult,
//         loading,
//         setLoading,
//         resultData,
//         setResultData,
//         onSent
//     }
//     return(
//         <Context.Provider value={contextValue}> 
//         {props.children}
//         </Context.Provider>
//     );
// }
// export default ContextProvider;





import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextword) => {
    setTimeout(function () {
      setResultData(prev => prev + nextword);
    }, 5 * index);
  };
  const newChat = () =>{
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    
    try {
      const currentPrompt = prompt !== undefined ? prompt : input;
      
      if (!currentPrompt || currentPrompt.trim() === "") {
        throw new Error("Prompt cannot be empty");
      }

      setRecentPrompt(currentPrompt);
      if (prompt === undefined) {
        setPrevPrompts(prev => [...prev, currentPrompt]);
      }

      const response = await runChat(currentPrompt);
      let responseArray = response.split("**");
      let newResponse = "";
      
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      let newResponse2 = newResponse.split("*").join("<br/>");
      let newResponseArray = newResponse2.split("");
      
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextword = newResponseArray[i];
        delayPara(i, nextword);
      }

      setLoading(false);
      setInput("");
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
      setResultData("Error: " + error.message);
    }
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    newChat
  };

  return (
    <Context.Provider value={contextValue}> 
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;