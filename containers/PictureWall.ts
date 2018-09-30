import { StoreState } from "../types";
import PictureWall, { Props } from "../components/PictureWall";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// TODO deprecate this container, let the parent (Explore) take care of it
export function mapStateToProps({ activeArea }: StoreState): Props {
  return {
    term: activeArea
  };
}

export default connect(mapStateToProps)(PictureWall);
