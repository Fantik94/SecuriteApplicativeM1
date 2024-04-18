import { Outlet } from "react-router-dom";
import Menu from './composants/Menu'
import { AuthProvider } from './composants/context/AuthContext';
import './App.css'


function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Menu />
          <div className="container">
            <Outlet />
          </div>
      </div>
    </AuthProvider>
  )
}

export default App
