import React from 'react';
import { Notation } from '../../types';
import { BASE_URL } from '../../constants';
import dayjs from 'dayjs';

interface Props {
  notation: Notation;
}

const NotationItem: React.FC<Props> = ({notation}) => {
  return (
    <div className="flex items-start pt-[5px] pl-[5px] pr-[5px] pb-[50px] border-b-[3px] border-b-[#f0e0d6]">
      {
        notation.image ?
          <img className="w-[255px] max-h-[255px] " src={BASE_URL + '/' + notation.image} alt="notationImage"/>
          :
          null
      }
      <div className={!notation.image ? 'p-0' : 'pl-5'}>
        <p className="text-[#117743]">{notation.author ? notation.author : 'Аноним'} <span className="text-[#600000]">{dayjs(notation.datetime).format('DD.MM.YYYY HH:mm')}</span></p>
        <p className="text-[#600000]">{notation.message}</p>
      </div>
    </div>
  );
};

export default NotationItem;