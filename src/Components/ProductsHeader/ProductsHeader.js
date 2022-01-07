import React from 'react';
import { withRouter } from 'react-router-dom';

const ProductsHeader = ({ totalItemsCount }) => {
  return (
    <div>
      <div style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1, fontSize: 24 }}>
          <div>{'Pizza Menu'}</div>
          <React.Fragment>
            <span style={{ fontSize: 12, color: 'gray', marginTop: 5 }}>
              {totalItemsCount + ' result' + (totalItemsCount === 1 ? ' ' : 's ')}
            </span>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductsHeader);
