import WeeklyView from "./Weekly"
import MonthlyView from "./Monthly"


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
            }
        ]
    },
    {
        name: "jordan",
        color: "blue",
        events: [
            {
                title: "nanny",
                startDate: "2025-12-25",
                endDate: "2025-12-25",
                startTime: "10 AM",
                endTime: "4 PM"
            }
        ]
    }
]

const Calendar = () => {
    return(
        <div className="h-screen flex">
            <MonthlyView members={members}/>
        </div>
    );
};

export default Calendar;