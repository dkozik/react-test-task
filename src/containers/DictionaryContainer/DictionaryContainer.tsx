import * as React from 'react';
import block from 'bem-cn';
import { bind } from "decko";
import { Layout } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RouteComponentProps, withRouter } from "react-router";
import * as selectors from '../../redux/selectors';
import * as actions from '../../redux/actions';
import { IDictionary } from "../../types/responses";
import { IAppReduxState, ICommunication } from "../../types/app";
import { ListRegions, Preloader, RegionDetails, RegionNotFound } from "../../components";

import './DictionaryContainer.scss';

interface IStateProps {
  dictionary: IDictionary;
  loadDictionaryCommunication: ICommunication;
}

interface IActionProps {
  loadDictionary: typeof actions.loadDictionary;
}

const b = block('dictionary-container');

const { Content } = Layout;

type TRouteProps = RouteComponentProps<{ regionId?: string }>;
type TProps = IStateProps & IActionProps & TRouteProps;

class DictionaryContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      dictionary: selectors.selectDictionary(state),
      loadDictionaryCommunication: selectors.selectCommunication(state, 'loadData'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadDictionary: actions.loadDictionary,
    }, dispatch);
  }

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
        <Preloader isShow={loadDictionaryCommunication.isRequesting}>
          <Content>
            {regionId ? this.renderSingleRegion(parseInt(regionId)) : this.renderAllRegions()}
          </Content>
        </Preloader>
      </Layout>
    );
  }

  @bind
  private handleGoToSingleRegion(index: number) {
    this.props.history.push(`/regions/${index}`);
  }

  @bind
  private renderAllRegions() {
    const { dictionary } = this.props;
    return (
      <ListRegions
        dictionary={dictionary}
        onSelectRegion={this.handleGoToSingleRegion}
      />
    );
  }

  @bind
  private renderSingleRegion(index: number) {
    const { dictionary } = this.props;
    if (!dictionary[index]) {
      return (
        <RegionNotFound/>
      );
    }

    return (
      <RegionDetails
        region={dictionary[index]}
      />
    );
  }
}

export default withRouter(connect(
  DictionaryContainer.mapStateToProps,
  DictionaryContainer.mapDispatch,
  null,
  {},
)(DictionaryContainer));
