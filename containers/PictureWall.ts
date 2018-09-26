import { StoreState } from "../types";
import PictureWall, { Props } from "../components/PictureWall";
import { connect } from "react-redux";

export function mapStateToProps({ activeArea }: StoreState): Props {
  return {
    term: activeArea
  };
}

export default connect(mapStateToProps)(PictureWall);
