import { useEffect, useState } from 'react';
import Navbar from '../src/components/Header component/Navbar';
import AllRoutes from '../Routers/AllRoutes';
import Footer from '../src/components/Footer component/Footer';
import Loader from '../src/components/Extras/Loader';



import axios from 'axios';


// stripe things 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(true);


  async function getStripeKey() {
    const { data } = await axios.get('/api/ecommerce/v1/stripekey');
    setStripeKey(data.stripePublishableKey);
  }
  const [stripeKey, setStripeKey] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    getStripeKey();
    return () => {
      clearTimeout();
    }
  }, []);


  return (
    <>
      {isLoading ? <Loader /> : <>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Elements stripe={loadStripe(stripeKey)}>
          <AllRoutes setCurrentUser={setCurrentUser} currentUser={currentUser} />
        </Elements>
        <Footer /></>}
    </>
  )
}

export default App
