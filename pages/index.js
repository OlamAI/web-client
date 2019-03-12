import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import { withStyles, Typography, Grid, Paper } from "@material-ui/core";
import uuidv1 from "uuid/v1";
import { connect } from "react-redux";
import { compose } from "redux";
import Spectate from "../components/spectate";
import CreateAgent from "../components/createAgent";
import withNavBar from "../lib/withNavBar";
import { withFirebase, firebaseConnect } from "react-redux-firebase";

const styles = ({ palette, spacing, breakpoints }) => ({
  root: {
    flexGrow: 1
  },
  cellInspectorContainer: {
    padding: 10
  },
  centerText: {
    textAlign: "center"
  }
});

const {
  SimulationServiceClient
} = require("../pkg/api/v1/simulation-service_grpc_web_pb");

const API_VERSION = "v1";

class Index extends React.Component {
  state = {
    selectedEntity: null
  };

  async componentDidMount() {
    // Add key listener
    document.addEventListener("keydown", this._handleKeyDown);
  }

  // When an entity is clicked in the spectate window,
  //  add it's data to the side bar
  onEntityClick = entity => {
    this.setState({
      selectedEntity: entity
    });
  };

  render() {
    const { classes } = this.props;
    const { selectedEntity } = this.state;
    return (
      <div>
        <Grid container spacing={32} justify="center">
          <Grid item xs={12} className={classes.centerText}>
            <Typography variant="h4">
              The worlds first online, persistant environment for AI
            </Typography>
          </Grid>
          {/* Spectate Window */}
          <Grid item>
            <Spectate onEntityClick={this.onEntityClick} />
          </Grid>
          {/* Side bar */}
          <Grid item xs={3}>
            <Grid container spacing={16} direction="column">
              <Grid item xs={12}>
                <Paper className={classes.cellInspectorContainer}>
                  <Typography>
                    <b>Cell Inspector</b>
                  </Typography>
                  {selectedEntity ? (
                    <Typography>
                      <b>Id: </b> {selectedEntity.id}
                      <br />
                      <b>Class: </b> {selectedEntity.class}
                    </Typography>
                  ) : null}
                </Paper>
              </Grid>
              <CreateAgent />
            </Grid>
          </Grid>
        </Grid>

        <button onClick={this.createAgent}>Create Agent</button>
      </div>
    );
  }
}

export default compose(
  withNavBar({ useBuffer: true }),
  withStyles(styles),
  withFirebase
)(Index);
