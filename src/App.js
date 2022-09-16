
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import CreateAccount from './views/Account/CreateAccount';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import About from './views/About/About';
import ExpenseDetails from './views/Expense/ExpenseDetails';
import MainPage from './components/MainPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-up' element={<CreateAccount />} exact />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<MainPage><Home /></MainPage>} />
          <Route path='/expense/:id' element={<MainPage><ExpenseDetails /></MainPage>} />
          <Route path='/about' element={<MainPage><About /></MainPage>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
