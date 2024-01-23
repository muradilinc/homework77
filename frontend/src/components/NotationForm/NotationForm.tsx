import React, { useRef, useState } from 'react';
import { NewNotation } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { createNotation } from '../../store/notation/notationThunk';

const NotationForm = () => {
  const [notation, setNotation] = useState<NewNotation>({
    author: '',
    message: '',
    image: null
  });
  const [filename, setFilename] = useState('');
  const imageSelect = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const changeNotation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setNotation(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeImageFiled = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    if (files) {
      setFilename(files[0].name);
      setNotation(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    }
  };

  const selectImage = () => {
    if (imageSelect.current) {
      imageSelect.current.click();
    }
  };

  const createNotationHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(createNotation(notation));
  };

  return (
    <form onSubmit={createNotationHandler}>
      <div>
        <input type="text" value={notation.author} onChange={changeNotation} name="author"/>
      </div>
      <div>
        <input type="text" value={notation.message} onChange={changeNotation} name="message"/>
      </div>
      <div>
        <input className="hidden" ref={imageSelect} type="file" name="image" onChange={changeImageFiled}/>
        <p>{filename}</p>
        <button onClick={selectImage} type="button">browse</button>
      </div>
      <button type="submit">post</button>
    </form>
  );
};

export default NotationForm;