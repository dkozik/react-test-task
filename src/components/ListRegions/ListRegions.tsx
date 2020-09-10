import React from "react";
import block from 'bem-cn';
import { bind } from "decko";
import { Avatar, List, Card } from "antd";
import { IDictionary, IRegion } from "../../types/responses";

import './ListRegions.scss';

interface IOwnProps {
  dictionary: IDictionary;
  onSelectRegion(index: number): void;
}

const b = block('list-regions');

const { Item } = List;

type TProps = IOwnProps;

class ListRegions extends React.PureComponent<TProps> {
  public render() {
    const { dictionary } = this.props;
    return (
      <div className={b()}>
        <List
          dataSource={dictionary}
          renderItem={this.renderRegion}
        />
      </div>
    );
  }

  @bind
  private renderRegion(region: IRegion, index: number) {
    return (
      <Item
        key={`region-${index}`}
        onClick={this.handleSelectRegion.bind(this, index)}
      >
        <Item.Meta
          avatar={<Avatar src={require('../../images/urban-inline.svg')}/>}
          title={<a href={`/regions/${index}`}>{region.territory}</a>}
          description={(
            <Card
              size="small"
              hoverable
            >
              <p>{region.formname}</p>
              <p>{region.address}</p>
              <p>Количество библиотек: {region.libraries}</p>
            </Card>
          )}
        />
      </Item>
    );
  }

  @bind
  private handleSelectRegion(index: number) {
    this.props.onSelectRegion(index);
  }
}

export default ListRegions;
