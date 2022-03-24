import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store/rootTypes";
import Header from "../components/header";
// TOOD: TS-ERROR remove that after ts selectors implementation
import triggerGetUser from "../../../store/user"

const mapStateToProps = (
  state: RootState,
) => ({
  // FIXME use state
  state
});

const mapDispatchToProps = {
  triggerGetUser
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ConnectedHeaderProps = ConnectedProps<typeof connector> 

export default connector(Header);


