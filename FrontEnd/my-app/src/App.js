import logo from './logo.svg';
import './App.css'; 
import { FirstChild } from './FirstChild'; 
import { SecondChild } from './SecondChild'; 
import Chatbot from './chat';



function App() {
  return (
    <div className="App" class="h-screen bg-gray-900">
      <FirstChild></FirstChild> 
      {/* <SecondChild></SecondChild> */}
      <Chatbot/>
    </div>
  );
}

export default App;
