import { createContext , useContext } from "react";
export const themeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme:() => {},
})
export const themeProvider = themeContext.themeProvider

export default function usetheme(){
    return useContext(themeContext)
}