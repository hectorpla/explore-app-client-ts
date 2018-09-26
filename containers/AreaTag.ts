import { Dispatch } from "redux";

import AreaTag, { Props } from "../components/AreaTag";
import { ChangeActiveArea, changeActiveArea } from "../actions";
import { connect } from "react-redux";

export function mapDispathToProps(
  dispatch: Dispatch<ChangeActiveArea>,
  ownProps: Props
) {
  // console.log("AreaTag: mapDispathToProps");
  return {
    onSelect: () => dispatch(changeActiveArea(ownProps.area))
  };
}

export default connect(
  null,
  mapDispathToProps
)(AreaTag);
