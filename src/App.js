
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import './App.css';
import CreateAccount from './views/Account/CreateAccount';
import Login from './views/Login/Login';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-up' element={<CreateAccount />} exact />
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
