import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.scss';

export const Pagination = ({ totalItems, itemsPerPage, current, path }) => (
  <div className="pagination">
    {[...Array(Math.ceil(totalItems/itemsPerPage))].map((_, index) => (
      <Link key={index} to={path.replace(':page', index + 1)} className={current === (index + 1) ? 'active' : ''}>{index + 1}</Link>
    ))}
  </div>
);

Pagination.propTypes = {
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  current: PropTypes.number,
  path: PropTypes.string
};

export default Pagination;
