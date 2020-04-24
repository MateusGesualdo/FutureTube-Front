import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { logout, highlightUser } from '../../actions/users';
import styled from 'styled-components'
import { getUserUploads } from '../../actions/videos';
import { push } from 'connected-react-router';
import { routes } from '../../containers/Router';

const Img = styled.img`
  border-radius: 20px  
`

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Img src={this.props.img} width='30' alt="Future Tube" />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => { this.handleClose(); this.props.highlightUser(this.props.id); this.props.getUserUploads(this.props.id) }}>
            Meus vídeos
          </MenuItem>
          <MenuItem onClick={() => { this.handleClose(); this.props.goToChangePassword() }}>Trocar senha</MenuItem>
          <MenuItem onClick={() => { this.handleClose(); this.props.logout() }}>Sair</MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.users.logged.id
})

const mapDispatchToProps = dispatch => ({
  getUserUploads: (id) => dispatch(getUserUploads(id)),
  highlightUser: (id) => dispatch(highlightUser(id)),
  logout: () => dispatch(logout()),
  goToChangePassword: () => dispatch(push(routes.changePassword))
})

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMenu);