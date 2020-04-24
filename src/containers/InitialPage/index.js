// import React from 'react'
// import logo from '../../images/logo.png'
// import styled from 'styled-components'
// import { connect } from 'react-redux'

// const Div = styled.div`
//     height: 100vh;
//     background-color: #ededed;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `

// const InitialPage = props => {

//     React.useEffect(
//         () => {
//             const token = window.localStorage.getItem("token")
//             if (!token) props.goToLogin()
//         },
//         []
//     )

//     return (
//         <Div>
//             <img src={logo} width="150" alt="Future Tube"/>
//         </Div>
//     );
// }

// export default connect()(InitialPage)