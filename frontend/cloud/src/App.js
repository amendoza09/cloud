import GroupCodeScreen from './components/GroupCode';
import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex flex-row w-screen">
      <div className="">
        <Sidebar />
      </div>
      <div>
        <Calendar />
      </div>
    </div>
  );
}

export default App;
