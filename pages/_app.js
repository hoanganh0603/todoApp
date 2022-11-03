import '../styles/globals.css'
//INTERNAL IMPORT
import { ToDoListProvider } from "../context/toDoListApp"

function MyApp({ Component, pageProps }) {
  return (
    <ToDoListProvider>
      <div>
        <Component {...pageProps} />
      </div>
    </ToDoListProvider>
     
  )
}

export default MyApp
