import GroupCodeScreen from './components/GroupCode';
import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar';


const members = [
    {
        name: "toni",
        color: "green",
        events: [
          {
                title: "work",
                startDate: "2025-12-31",
                endDate: "2025-12-31",
                startTime: "8:30 AM",
                endTime: "5:30 PM"
          },
          {
                title: "work",
                startDate: "2025-12-23",
                endDate: "2025-12-23",
                startTime: "8:30 AM",
                endTime: "5:30 PM"
            },
            {
                title: "work",
                startDate: "2025-12-30",
                endDate: "2025-12-30",
                startTime: "8:30 AM",
                endTime: "5:30 PM"
            }
        ]
    },
    {
        name: "jordan",
        color: "blue",
        events: [
            {
                title: "nanny",
                startDate: "2026-01-01",
                endDate: "2026-01-01",
                startTime: "10 AM",
                endTime: "4 PM"
            }
        ]
    }
]

function App() {
  return (
    <div className="flex flex-row w-screen">
      <div className="">
        <Sidebar members={members}/>
      </div>
      <div>
        <Calendar members={members} />
      </div>
    </div>
  );
}

export default App;
