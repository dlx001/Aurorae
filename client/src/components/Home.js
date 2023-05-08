
import Header from './Header'
import  HomeBody from './HomeBody'
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="App bg-light">
      <Header isHome={true}></Header>
      <HomeBody></HomeBody>
    </div>
  );
}

export default Home;
