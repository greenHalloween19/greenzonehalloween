import React from 'react';
import { Link } from '@reach/router';
const LinkButton = ({ navUrl, label }) => {
  return (
    <Link className="link-button" to={navUrl}>
      {label}
    </Link>
  );
};

export default LinkButton;
