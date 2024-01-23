import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectNotations } from './store/notation/notationSlice';
import { useEffect } from 'react';
import { getNotations } from './store/notation/notationThunk';
import NotationForm from './components/NotationForm/NotationForm';
import { BASE_URL } from './constants';

const App = () => {
  const notations = useAppSelector(selectNotations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotations());
  }, [dispatch]);

  console.log(notations);
  return (
    <div>
      <NotationForm/>
      <div>
        {notations.map(notation =>
          <div key={notation.id}>
            {
              notation.image ?
                <img src={BASE_URL + '/' + notation.image} alt="notationImage"/>
                :
                null
            }
            <p>{notation.author}</p>
            <p>{notation.message}</p>
            <p>{notation.datetime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;