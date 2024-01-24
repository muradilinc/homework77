import React, { useRef, useState } from 'react';
import { NewNotation } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { createNotation, getNotations } from '../../store/notation/notationThunk';

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
    await dispatch(getNotations());
  };

  const clearImageField = () => {
    setFilename('');
    setNotation(prevState => ({
      ...prevState,
      image: null
    }));
  };

  return (
    <form className="flex gap-y-2 flex-col w-[500px]" onSubmit={createNotationHandler}>
      <div className="flex gap-x-3 justify-between">
        <p className="bg-[#EEAA88] text-[#600000] p-[3px]">Author:</p>
        <input className="w-full border-gray-500 border" type="text" value={notation.author} onChange={changeNotation}
               name="author"/>
      </div>
      <div className="flex gap-x-3 justify-between">
        <p className="bg-[#EEAA88] text-[#600000] p-[3px]">Message:</p>
        <input className="w-full border-gray-500 border" required type="text" value={notation.message}
               onChange={changeNotation} name="message"/>
      </div>
      <div className="flex gap-x-3 items-center">
        <p className="bg-[#EEAA88] text-[#600000] p-[3px]">File</p>
        <div className="flex flex-col w-full">
          <input className="hidden" ref={imageSelect} type="file" name="image" onChange={changeImageFiled}/>
          {
            filename.length === 0 ?
              <button
                className="border border-gray-500 border-dashed"
                onClick={selectImage}
                type="button"
              >
                browse
              </button>
              :
              <div className="flex justify-between">
                <p>{filename}</p>
                <button onClick={clearImageField}>x</button>
              </div>
          }
        </div>
      </div>
      <button className="bg-green-400 py-[5px] capitalize" type="submit">post</button>
    </form>
  );
};

export default NotationForm;