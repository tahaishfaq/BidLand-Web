import React, { useState, useEffect } from "react";

function Timer({time}) {
  const [startTime] = useState(new Date("2023-10-27"));
  const [endTime, setEndTime] = useState();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAuctionOver, setIsAuctionOver] = useState(false);
  console.log(endTime);
console.log(currentTime);
    useEffect(()=>{
      setEndTime(new Date(time))
    },[time])

  useEffect(() => {
   
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      if (now >= endTime && now < endTime.getTime() + 7 * 24 * 60 * 60 * 1000) {
        setIsAuctionOver(true);
        clearInterval(intervalId);
      }
    }, 1000); // Update the countdown every second

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, [endTime]);

  const timeRemaining = isAuctionOver
    ? "Auction has ended"
    : endTime - currentTime;

  if (isAuctionOver) {
    // You can display an "Auction Ended" message or perform other actions when the auction ends
    return <div>{timeRemaining}</div>;
  }

  // Format timeRemaining to display days, hours, minutes, and seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-2">
      <p className="text-xl font-semibold text-gray-900">Bidding Ends In:</p>
      <p className="text-lg font-semibold text-gray-500">
        {days} days {hours} hours {minutes} minutes {seconds} seconds
      </p>
    </div>
  );
}

export default Timer;
