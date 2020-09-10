import * as React from "react";
import block from "bem-cn";
import { bind } from "decko";
import { Input, Layout, Menu } from "antd";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RouteComponentProps, withRouter } from "react-router";
import * as selectors from "../../redux/selectors";
import * as actions from "../../redux/actions";
import { IDictionary } from "../../types/responses";
import { IAppReduxState, ICommunication } from "../../types/app";
import {
  ListRegions,
  Preloader,
  RegionDetails,
  RegionNotFound,
  RegionsTable
} from "../../components";
import { SelectParam } from "antd/lib/menu";

import "./DictionaryContainer.scss";

interface IStateProps {
  dictionary: IDictionary;
  loadDictionaryCommunication: ICommunication;
}

interface IActionProps {
  loadDictionary: typeof actions.loadDictionary;
}

type TViewMode = "plates" | "table";

interface IState {
  searchText: string | null;
  viewMode: TViewMode;
}

const b = block("dictionary-container");

const { Content, Sider } = Layout;
const { Search } = Input;

type TRouteProps = RouteComponentProps<{ regionId?: string }>;
type TProps = IStateProps & IActionProps & TRouteProps;

class DictionaryContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      dictionary: selectors.selectDictionary(state),
      loadDictionaryCommunication: selectors.selectCommunication(
        state,
        "loadData"
      )
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators(
      {
        loadDictionary: actions.loadDictionary
      },
      dispatch
    );
  }

  public state: IState = {
    searchText: null,
    viewMode: "plates"
  };

  public componentDidMount() {
    if (!this.props.dictionary.length) {
      this.props.loadDictionary();
    }
  }

  public render() {
    const { loadDictionaryCommunication } = this.props;
    const regionId = this.props.match.params.regionId;
    return (
      <Layout className={b()}>
        <Layout>
          <Sider width={300} className={b("sider").toString()}>
            <div className={b("search-bar").toString()}>
              <Search
                placeholder="Поиск по названию"
                enterButton="Найти"
                onSearch={this.handleSearchChanged}
              />
            </div>
            <Menu
              defaultSelectedKeys={["plates"]}
              onSelect={this.handleSelectMenuItem}
            >
              <Menu.Item key="plates">Плитки</Menu.Item>
              <Menu.Item key="table">Таблица</Menu.Item>
            </Menu>
          </Sider>
          <Layout className={b("content").toString()}>
            <Preloader
              isShow={loadDictionaryCommunication.isRequesting}
            >
              <Content>
                {regionId
                  ? this.renderSingleRegion(
                    parseInt(regionId)
                  )
                  : this.renderAllRegions()}
              </Content>
            </Preloader>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  @bind
  private handleSelectMenuItem(param: SelectParam) {
    const { key } = param;
    this.setState({ viewMode: (key as TViewMode) });
  }

  @bind
  private handleGoToSingleRegion(index: number) {
    this.props.history.push(`/regions/${index}`);
  }

  @bind
  private renderAllRegions() {
    const { viewMode } = this.state;

    if (viewMode === "table") {
      return (
        <RegionsTable
          dictionary={this.filteredRegions}
          onSelectRegion={this.handleGoToSingleRegion}
        />
      );
    }

    return (
      <ListRegions
        dictionary={this.filteredRegions}
        onSelectRegion={this.handleGoToSingleRegion}
      />
    );
  }

  @bind
  private renderSingleRegion(index: number) {
    const { dictionary } = this.props;
    if (!dictionary[index]) {
      return <RegionNotFound/>;
    }

    return <RegionDetails region={dictionary[index]}/>;
  }

  @bind
  private handleSearchChanged(value: string) {
    this.setState({ searchText: value.toLowerCase() });
  }

  private get filteredRegions() {
    const { searchText } = this.state;
    const { dictionary } = this.props;

    if (searchText) {
      return dictionary.filter(
        (region) =>
          region.fullname.toLowerCase().indexOf(searchText) >= 0
      );
    }

    return dictionary;
  }
}

export default withRouter(
  connect(
    DictionaryContainer.mapStateToProps,
    DictionaryContainer.mapDispatch,
    null,
    {}
  )(DictionaryContainer)
);
