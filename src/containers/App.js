
import './App.css';
import WebNavbar from '../components/Navbar/Navbar';
import {BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Blogs from '../components/Blogs/Blogs';
import Doctors from '../components/Doctors/Doctors';
import Schedule from '../components/Dashboard/Schedule';

import Header from '../components/Home/Header/Header';
import Footer from '../components/Footer/Footer';

import Signin from '../components/Form/Signin/Signin';
import SignUp from '../components/Form/SignUp/SignUp';

import Patients from '../components/Dashboard/Patients';
import { auth, handleUserProfile } from '../firebase/utils';
import { useEffect } from 'react';
import {setCurrentUser} from '../redux/User/User.action';
import {useDispatch} from 'react-redux'

import Messenger from '../components/Dashboard/Messenger';
import AboutUs from '../components/About-us/AboutUs';
import Blog from '../components/Blogs/BlogDetails/BlogDetails';
import BlogArticle from '../components/Blogs/BlogDetails/BlogArticle';
import Privace from '../components/Privace/Privace';
import { Navbar } from 'reactstrap';
import SideBar from '../components/Dashboard/Sidebartwo/SideBar';
import Dashboard from '../components/Dashboard/Dashboard';
import CreditForm from '../components/Schedule/CreditForm';

//const authListener=null;
const App=props => {
  const dispatsh = useDispatch();


 useEffect(() => {
  const authListener = auth.onAuthStateChanged(async userAuth =>{
    if(userAuth)  {
      const userRef = await handleUserProfile(userAuth);
      userRef.onSnapshot(snapshot=>{
        dispatsh(setCurrentUser({
          id : snapshot.id,
          ...snapshot.data()
        }))
      })
    }
    dispatsh(setCurrentUser (userAuth))
  })
 },[])

  return (

    <div className="App">
      <Router>
    {/* <WebNavbar/> */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/blogs" component={Blogs}/>
            <Route path="/about" component={AboutUs}/>
            <Route path="/doctors" component={Doctors}/>
            <Route path="/register/signup" component={SignUp}/>
            <Route path="/register/signin" component={Signin}/>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/dashboard/Schedule" exact component={Schedule}/>
            <Route path="/dashboard/Messenger" exact component={Messenger}/>
            <Route path="/dashboard/Patients" exact component={Patients}/>
          
            <Route path="/Blog" exact component={BlogArticle}/>
            <Route path="/privace" exact component={Privace}/>
            <Route path="/book" exact component={CreditForm} />
          </Switch>
          
      </Router>
    </div>
  );
}

export default App;
