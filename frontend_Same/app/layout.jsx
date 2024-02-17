"use client"
import '../styles/globals.css'
import Nav from "../components/Nav";
import {AuthContextProvider} from "./context/AuthContext.js";


// export const metadata = {
//   title: "Promptopia",
//   description: "Discover & Share AI Prompts",
// };

const RootLayout = ({children}) => (
  
  <html lang='en'>
    <body>
    <AuthContextProvider>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>
        <Nav/>
          {children}
        </main>
        </AuthContextProvider>
    </body>
  </html>
  
);

export default RootLayout;