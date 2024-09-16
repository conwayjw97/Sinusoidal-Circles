import './App.css';
import sketch from './sketches/sketch';
import { ReactP5Wrapper } from "react-p5-wrapper";


function App() {
  return (
    <div className="App">
      <ReactP5Wrapper sketch={sketch}/>
    </div>
  );
}

export default App;
