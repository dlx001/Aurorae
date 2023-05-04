import NavBar from './NavBar'
import Container from 'react-bootstrap/Container';
import * as Icon from 'react-bootstrap-icons'

function Header(props){
  
    return(
    <div>
    <NavBar isHome={props.isHome}></NavBar>
    </div>);
}
export default Header;