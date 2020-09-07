import React, { useState } from "react";
import block from 'bem-cn';
import { Card, Breadcrumb } from "antd";
import { IRegion } from "../../types/responses";

import './RegionDetails.scss';

interface IOwnProps {
  region: IRegion;
}

const b = block('region-details');

type TProps = IOwnProps;

const RegionDetails: React.FC<TProps> = (props: TProps) => {
  const { region } = props;
  const [ isOpen, setIsOpen ] = useState(false);
  const changeViewDetailedState = () => setIsOpen(!isOpen);

  return (
    <div className={b()}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/regions">Regions</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {region.fullname}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card
        title={region.fullname}
        className={b('card')}
      >
        <p>{region.territory}</p>
        <p>{region.address}</p>
        <p>{region.formname}</p>
        <p
          className={b('hoverable')}
          onClick={changeViewDetailedState}
        >
          Количество библиотек: {region.libraries}
        </p>
        {isOpen && (
          <pre>
            {JSON.stringify(region, null, 2)}
          </pre>
        )}
      </Card>
    </div>
  );
};


export default RegionDetails;
