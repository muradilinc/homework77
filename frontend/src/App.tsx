import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectGetNotationsLoading, selectNotations } from './store/notation/notationSlice';
import { getNotations } from './store/notation/notationThunk';
import NotationForm from './components/NotationForm/NotationForm';
import NotationItem from './components/NotationItem/NotationItem';
import Layout from './components/Layout/Layout';
import Loader from './components/Loader/Loader';

const App = () => {
  const notations = useAppSelector(selectNotations);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectGetNotationsLoading);

  useEffect(() => {
    dispatch(getNotations());
  }, [dispatch]);

  return (
    <Layout>
      <div className="flex justify-center items-center h-[200px] border-b-[3px] border-b-[#f0e0d6]">
        <NotationForm/>
      </div>
      <div className="my-10">
        {
          loading ?
            <Loader/>
            :
            notations.map(notation => <NotationItem key={notation.id} notation={notation}/>)
        }
      </div>
    </Layout>
  );
};

export default App;