// import Hero from "./Hero"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./Home"
import SignIn from './components/SignIn';
import Hero from './components/Hero';
import Profile from './components/Profile';
// import NotFound from './components/NotFound';

function App() {
 
  return (
    <>
     <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/hero" element={<Hero/>} />
        <Route path='/profile' element={<Profile/>}></Route>
        {/* <Route component={NotFound} /> */}
        </Routes>
    </Router>
    </>
  )
}

export default App
