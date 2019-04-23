import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Clear from '@material-ui/icons/Clear';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import FileList from '../components/FilesList';
import TagsList from '../components/TagsList';
import * as routes from '../constants/routes';
import { request as requestFiles } from '../ducks/actions/files';
import { request as requestTags } from '../ducks/actions/tags';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class FileListPage extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState){
    const nextTag = nextProps.match.params.tag;
    const nextPage = nextProps.match.params.page;
    if (prevState.currentTag !== nextTag || prevState.currentPage !== nextPage) {
      nextProps.requestFiles(nextPage, nextTag);
      return { currentTag: nextTag, currentPage: nextPage };
    }
    return null;
  }

  state = {
    mobileOpen: false,
    currentTag: null,
    currentPage: null
  };

  componentDidMount() {
    const { match, files, tags, requestFiles, requestTags } = this.props;

    if (!files.files.length) {
      requestFiles(match.params.page || undefined, match.params.tag|| undefined);
    }

    if (!tags.tags.length){
      requestTags();
    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, files, tags } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap style={{ padding: 17 }}>
            Tags
            {files.tag && (
              <Fab aria-label="Clear" className={classes.fab} size="small" style={{ marginLeft: 30 }} >
                <Link to={routes.HOME}><Clear /></Link>
              </Fab>
            )}
          </Typography>
          
        </div>
        <Divider />
        {tags.loading ? (
          <CircularProgress />
        ) : (
          <TagsList tags={tags} onFilter={this.handleFilter} />          
        )}
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Search Results - {files.tag ? `"${files.tag}" Tag` : 'No Tag Selected'}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {files.loading ? (
            <CircularProgress />
          ) : (
            <FileList files={files} />
          )}
        </main>
      </div>
    );
  }
}

FileListPage.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = ({ files, tags }) => ({
  files,
  tags
});

const mapDispatchToProps = dispatch => ({
  requestFiles: (page, tag) => dispatch(requestFiles(page, tag)),
  requestTags: () => dispatch(requestTags())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(FileListPage));