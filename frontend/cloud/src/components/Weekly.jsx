import { useState, useEffect } from 'react'
import { format, startOfWeek, endOfWeek, getDay, eachDayOfInterval } from 'date-fns';

const events = [
          {
                title: "work",
                startDate: "12-18-2025",
                endDate: "12-20-2025",
                startTime: "8:30 AM",
                endTime: "5:30 PM"
          },
          {
                title: "work",
                startDate: "12-23-2025",
                endDate: "12-23-2025",
                startTime: "8:30 AM",
                endTime: "5:30 PM"
            },
            {
                title: "work",
                startDate: "12-31-2025",
                endDate: "12-31-2025",
                startTime: "8:30 AM",
                endTime: "5:30 PM"
            }
        ]

const WeeklyView = ({ members }) => {
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [isExpanded, setIsExpanded] = useState(true);
    const [dayPosition, setDayPosition] = useState(null);
    const [dayPositions, setDayPositions] = useState({});

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayAbrevs = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    const currentDate = format(new Date(), 'yyyy-MM-dd');

    const timeToMinutes = (time) => {
        const [raw, period] = time.split(" ");
        let [hours, minutes] = raw.split(":").map(Number);

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours ===12) hours = 0;

        return hours * 60 + minutes;
    }

    const allEvents = members.flatMap(member => 
        member.events.map(event => ({
            ...event,
            member: member.name,
        })),
    );
    
    const generateWeekDays = (date) => {
        const startOfSelectedWeek = startOfWeek(date, { weekStartsOn: 0 });
        const endOfSelectedWeek = endOfWeek(date, { weekStartsOn: 0 });
        return eachDayOfInterval({ start: startOfSelectedWeek, end: endOfSelectedWeek });
    };

    const formatHour = (hour) => {
        if (hour === 0) return "12 AM";
        if (hour < 12) return `${hour} AM`;
        if (hour === 12) return "12 PM";
        return `${hour - 12} PM`;
    };

    const handleDayPress = (day) => {
        {/*
        const formatDate = format(day, 'yyyy-MM-dd');

        if(selectedDate === formatDate && !isExpanded) {
            handleReset();
            return; 
        };

        const yPosition = dayPositions[formatDate] || 0;

        setDayPosition(yPosition);
        setSelectedDate(formatDate);
        setIsExpanded(false);
        */}
    };

    const handleReset = () => {
      setSelectedDate(null);
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Days of the week */}
            <div className="sticky top-0 z-20">
                <div className="grid grid-cols-7 gap-5 text-center px-2 border-b border-black-500">
                    {dayAbrevs.map((day, index) => (
                        <div key={index} className="h-[50px] flex items-center justify-center font-medium">
                            <p>{day}</p>
                        </div>
                    ))}
                </div>
                {/* week days */}
                <div className="flex flex-row  border-b border-black-500"> 
                    {generateWeekDays(new Date(selectedDate)).map((item, i) => {
                        if(!item) {
                            return <div key={i} className="h-[50px]"/>
                        }
                        const formatDate = format(item, 'yyyy-MM-dd');
                        const isSelected = selectedDate === formatDate;
                        const isToday = formatDate === currentDate;

                        return (
                            <button
                                key={formatDate}
                                onClick={() => handleDayPress(item)}
                                className={`h-[50px] w-full`}
                            >
                                <span>
                                    {format(item, 'd')}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
            
            {/* Time grid */}
            <div className="flex-1 h-[50vh] py-5 overflow-y-auto w-full relative">
                {hours.map((hour) => (
                    <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] h-[50px] items-center">        
                        <div className="text-gray-500 text-xs text-right px-2 left-0">
                            {formatHour(hour)}
                        </div>
                        {dayAbrevs.map((day) => (
                            <div key={`${day}-${hour}`} className="border-b" />
                        ))}
                    </div>
                ))}

                {/* Events */} 
                <div className="absolute inset-0 grid grid-cols-[60px_repeat(7, 1fr)]" style={{ height: 24 * 50 }}>
                    <div />
                        {(selectedDate ? generateWeekDays(new Date(selectedDate)) : generateWeekDays(new Date())).map((day) => {
                        const dateKey = format(day, "yyyy-MM-dd");
                        const dayEvents = allEvents.filter(
                            e => e.startDate === dateKey
                        );
                        
                        return (
                            <div key={dateKey} className="relative pointer-events-auto">
                                {dayEvents.map((event,i) => {
                                    const start = timeToMinutes(event.startTime);
                                    const end = timeToMinutes(event.endTime);

                                    const top = (start / 60) * 50;
                                    const height = ((end-start)/60) * 50;
                                    return (
                                        <div
                                            key={i}
                                            className="x-20 absolute rounded-md bg-blue-500 text-white text-xs px-2 py-1"
                                            style={{ top, height }}
                                        >
                                            <div className="font-semibold">{event.title}</div>
                                            <div className="opacity-80">{event.member}</div>
                                        </div>
                                    )
                                })}
                             </div>
                        )
                    })}
                </div>
            </div>  
        </div>
    )
}

export default WeeklyView;