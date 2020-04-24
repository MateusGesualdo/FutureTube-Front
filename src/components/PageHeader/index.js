import React from 'react';
import styled from 'styled-components'
import logo from '../../images/logo.png'
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { routes } from '../../containers/Router';
import { clearHighlightedUser } from '../../actions/users';

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ededed;
  border-bottom: 1px solid lightgrey;
  padding: 0.3em 1.3em;
`

function PageHeader(props) {  
  const handleClick = () => {
    props.clearHighlightedUser()
    props.goHome()
  }
  return (
    <Div>
      <img src={logo}  width="50" onClick={handleClick} alt="Future Tube"/>    
      {props.children}
    </Div>
  )
}

const mapDispatchToProps = dispatch => ({
  clearHighlightedUser: () => dispatch(clearHighlightedUser()),
  goHome: () => dispatch(push(routes.root))
})

export default connect(null, mapDispatchToProps)(PageHeader)