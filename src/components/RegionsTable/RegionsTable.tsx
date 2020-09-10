import React from 'react';
import block from 'bem-cn';
import { Table } from 'antd';
import { IDictionary } from "../../types/responses";

import './RegionsTable.scss';
import { bind } from "decko";

interface IDataItem {
  key: string | number;
  region: string;
  address: string;
  libraries: number;
}

interface IOwnProps {
  dictionary: IDictionary;
  onSelectRegion(index: number): void;
}

const b = block('regions-table');

type TProps = IOwnProps;

class RegionsTable extends React.PureComponent<TProps> {
  private columns = [
    {
      title: 'Область',
      dataIndex: 'region',
      key: 'region',
      sorter:
        (a: IDataItem, b: IDataItem) =>
          a.region.toLowerCase().localeCompare(b.region.toLowerCase()),
      render: (text: string, record: IDataItem, index: number) => text,
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
      sorter:
        (a: IDataItem, b: IDataItem) =>
          a.address.toLowerCase().localeCompare(b.address.toLowerCase()),
    },
    {
      title: 'Количество библиотек',
      dataIndex: 'libraries',
      key: 'libraries',
      sorter: (a: IDataItem, b: IDataItem) => a.libraries - b.libraries,
    },
  ];

  public render() {
    return (
      <Table
        className={b()}
        dataSource={this.dataSource}
        columns={this.columns}
        onRow={this.prepareRowEvents}
      />
    );
  }

  private get dataSource(): IDataItem[] {
    const { dictionary } = this.props;

    return dictionary.map((region, index) => ({
      key: index,
      region: region.territory.trim(),
      address: region.address,
      libraries: region.libraries,
    }));
  }

  @bind
  private prepareRowEvents(record: IDataItem, index: number) {
    return {
      onClick: this.handleRowClicked.bind(this, index, record)
    };
  }

  @bind
  private handleRowClicked(rowIndex: number, record: IDataItem) {
    this.props.onSelectRegion(rowIndex);
  }
}

export default RegionsTable;
