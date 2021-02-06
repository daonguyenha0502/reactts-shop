import React, { ReactElement } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface Props {}

function Contact({}: Props): ReactElement {
  return (
    <>
      <ul className="flex-col text-left w-64 mx-auto pt-10 pl-8">
        <li>
          <FontAwesomeIcon icon={faHome} /> Hà Nội
        </li>
        <li>
          <FontAwesomeIcon icon={faPhone} /> 0376214088
        </li>
        <li>
          <FontAwesomeIcon icon={faEnvelope} /> daoha98@gmail.com
        </li>
      </ul>
    </>
  );
}

export default Contact;
