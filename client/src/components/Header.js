import NavBar from './NavBar'


function Header(props){
  
    return(
    <div>
    <NavBar isHome={props.isHome}></NavBar>
    </div>);
}
export default Header;