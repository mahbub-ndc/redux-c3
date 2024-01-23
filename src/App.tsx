import { useEffect } from 'react';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from './redux/hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { setLoading, setUser } from './redux/features/user/userSlice';

function App() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(true))
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email))
        dispatch(setLoading(false))
      }
      else{
        dispatch(setLoading(false));
      }
    })
  }, [])

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
