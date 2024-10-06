"use client";
import Timestamp from "react-timestamp";

interface TimeStampProps {
  date: string;
}

function TimeStamp({ date }: TimeStampProps) {
  return <Timestamp date={date} />;
}

export default TimeStamp;
