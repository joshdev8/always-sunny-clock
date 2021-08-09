import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const checkTime = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  // add zero in front of numbers < 10
  return i;
};

const fixHour = (h) => {
  if (h > 12) {
    h = h - 12;
  }
  return h;
};

const amOrPm = (hours) => (hours > 11 ? "pm" : "am");

const getTime = () => {
  const today = new Date();
  const h = today.getHours();
  let m = today.getMinutes();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = weekday[today.getDay()];
  m = checkTime(m);
  const time = fixHour(h) + ":" + m + " " + amOrPm(h);
  return { time, day };
  // const t = setTimeout(startTime, 10000);
};

export default function Home() {
  const [timer, setTimer] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  const startTimer = useCallback(() => {
    const { time, day } = getTime();
    // only update currentTime if it is different than value already in state
    if (time && time !== currentTime) {
      setCurrentTime(time);
    }
    // only update currentDay if it is different than value already in state
    if (day && day !== currentDay) {
      setCurrentDay(day);
    }
    setTimeout(() => {
      startTimer();
    }, 10000)
  }, [currentDay, currentTime]);

  useEffect(() => {
    if (!timer) {
      startTimer();
      setTimer(true);
    }
  }, [timer, startTimer]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Always Sunny Clock</title>
        <meta
          name="description"
          content="Simple clock in the style of It's Always Sunny in Philadelphia."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <h1 className={styles.time}>{currentTime}</h1>
          <h1 className={styles.time}>on a {currentDay}</h1>
        </div>
      </main>
    </div>
  );
}
