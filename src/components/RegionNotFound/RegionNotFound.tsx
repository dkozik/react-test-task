import React from 'react';
import block from 'bem-cn';
import { Alert, Breadcrumb } from "antd";

import './RegionNotFound.scss';

const b = block('region-not-found');

const RegionNotFound: React.FC = () => {
  return (
    <div className={b()}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/regions">Regions</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Region not found
        </Breadcrumb.Item>
      </Breadcrumb>
      <Alert
        showIcon
        message="Error"
        description="Region not found"
        type="error"
        className={b()}
      />
    </div>
  );
};

export default RegionNotFound;
