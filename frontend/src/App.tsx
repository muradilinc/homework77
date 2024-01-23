import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectNotations } from './store/notation/notationSlice';
import { useEffect } from 'react';
import { getNotations } from './store/notation/notationThunk';

const App = () => {
  const notations = useAppSelector(selectNotations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotations());
  }, [dispatch]);

  console.log(notations);
  return (
    <div>

    </div>
  );
};

export default App;