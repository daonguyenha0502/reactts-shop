import { faHome, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {}

const Policy = (props: Props) => {
  return (
    <>
      <ul className="flex-col text-left w-64 mx-auto pt-10 pl-8">
        <li>
          <FontAwesomeIcon icon={faHome} />
          Hà NộiNội
        </li>
        <li>
          <FontAwesomeIcon icon={faPhone} />
          0376214088
        </li>
        <li>
          <FontAwesomeIcon icon={faEnvelope} />
          daoha98@gmail.com
        </li>
      </ul>
    </>
  );
};

export default Policy;
