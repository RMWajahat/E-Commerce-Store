import { useEffect, useState } from 'react';
import Navbar from '../src/components/Header component/Navbar';
import AllRoutes from '../Routers/AllRoutes';
import Footer from '../src/components/Footer component/Footer';
import Loader from '../src/components/Extras/Loader';

function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => {
      clearTimeout();
    }
  }, []);


  return (
    <>
      {isLoading ? <Loader /> : <>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <AllRoutes setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <Footer /></>}
    </>
  )
}

export default App
