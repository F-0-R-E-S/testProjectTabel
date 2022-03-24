import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store/rootTypes";
import { selectUserData, selectUserIdData, selectUserLoading } from "../../../store/user/userSelector";
import Main from "../components/main";
// TOOD: TS-ERROR remove that after ts selectors implementation

const mapStateToProps = (
  state: RootState,
) => ({
  users: selectUserData(state),
  userIds: selectUserIdData(state),
  loading: selectUserLoading(state)
});

const mapDispatchToProps = {
};

export type ConnectedMainProps = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Main);


