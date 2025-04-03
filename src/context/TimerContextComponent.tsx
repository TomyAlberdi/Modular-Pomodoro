import { ReactNode, useState, useRef, useCallback, useEffect } from "react";
import {
  TimerContext,
  TimerContextType,
  TimerType,
} from "@/context/TimerContext";

interface TimerContextComponentProps {
  children: ReactNode;
}

// Storage interfaces
export interface TimerSettings {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}
export interface UserData {
  pomodoroCount: number;
  totalTime: number;
}

// Default storage values
const DEFAULT_SETTINGS: TimerSettings = {
  pomodoroDuration: 1800,
  shortBreakDuration: 300,
  longBreakDuration: 900,
};
const DEFAULT_USER_DATA: UserData = {
  pomodoroCount: 0,
  totalTime: 0,
};

// Storage keys
const STORAGE_KEY = "timer_settings";
const USER_DATA_KEY = "user_data";

// Storage getters
const getStoredSettings = (): TimerSettings => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
};
const getStoredUserData = (): UserData => {
  const stored = localStorage.getItem(USER_DATA_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_USER_DATA;
};

const TimerContextComponent: React.FC<TimerContextComponentProps> = ({
  children,
}) => {
  // Timer audio reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/new-timer.mp3");
  }, []);

  // Notification permission state
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>("default");

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }
  }, []);

  const sendNotification = useCallback(
    (title: string) => {
      if (notificationPermission === "granted") {
        new Notification(title, {
          icon: "/timer.svg",
        });
      }
    },
    [notificationPermission]
  );

  // Retrieve stored settings or use default values
  const storedSettings = getStoredSettings();
  const storedUserData = getStoredUserData();

  const saveSettings = (settings?: TimerSettings, userData?: UserData) => {
    if (settings) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
    if (userData) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    }
  };

  // Timer type and count states
  const [currentType, setCurrentType] = useState<TimerType>("pomodoro");
  const [pomodoroCount, setPomodoroCount] = useState(
    storedUserData.pomodoroCount
  );
  const [totalTime, setTotalTime] = useState(storedUserData.totalTime);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  const resetStats = () => {
    setPomodoroCount(0);
    setCurrentStreak(0);
    setTotalTime(0);
    saveSettings(undefined, {
      ...storedUserData,
      pomodoroCount: 0,
      totalTime: 0,
    });
  };

  // Timer duration states
  const [pomodoroDuration, setPomodoroDuration] = useState(
    storedSettings.pomodoroDuration
  );
  const [shortBreakDuration, setShortBreakDuration] = useState(
    storedSettings.shortBreakDuration
  );
  const [longBreakDuration, setLongBreakDuration] = useState(
    storedSettings.longBreakDuration
  );

  // Timer control states
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(pomodoroDuration);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  // Centralized timer logic
  const startCountdown = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }

    setIsRunning(true);
    setIsStarted(true);

    timerIdRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerIdRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Moves to the next timer type and updates state
  const moveToNextTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }

    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }

    let nextType: TimerType;
    if (currentType === "pomodoro") {
      saveSettings(undefined, {
        ...storedUserData,
        pomodoroCount: pomodoroCount + 1,
        totalTime: totalTime + pomodoroDuration,
      });
      setPomodoroCount((prev) => prev + 1);
      setCurrentStreak((prev) => prev + 1);
      setTotalTime((prev) => prev + pomodoroDuration);
      nextType = (pomodoroCount + 1) % 4 === 0 ? "longBreak" : "shortBreak";
      sendNotification("Break Time!");
    } else {
      nextType = "pomodoro";
      sendNotification("Focus Time!");
    }

    const nextDuration =
      nextType === "pomodoro"
        ? pomodoroDuration
        : nextType === "shortBreak"
        ? shortBreakDuration
        : longBreakDuration;

    setCurrentType(nextType);
    setRemainingTime(nextDuration);
    startCountdown();
  }, [
    currentType,
    pomodoroCount,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    startCountdown,
    sendNotification,
    storedUserData,
    totalTime,
  ]);

  // Starts the timer
  const startTimer = useCallback(() => {
    startCountdown();
  }, [startCountdown]);

  // Pauses the timer
  const pauseTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
      setIsRunning(false);
    }
  }, []);

  // Resumes the timer
  const resumeTimer = useCallback(() => {
    if (!isRunning && remainingTime > 0) {
      startCountdown();
    }
  }, [isRunning, remainingTime, startCountdown]);

  // Resets the timer
  const resetTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    setIsRunning(false);
    setIsStarted(false);
    setCurrentType("pomodoro");
    setRemainingTime(pomodoroDuration);
    setCurrentStreak(0);
  }, [pomodoroDuration]);

  // Auto-transition to next timer when current one ends
  useEffect(() => {
    if (remainingTime === 0 && isStarted) {
      moveToNextTimer();
    }
  }, [remainingTime, isStarted, moveToNextTimer]);

  // Force jumps to the next timer
  const skipTimer = () => {
    moveToNextTimer();
  };

  // Duration update functions
  const updatePomodoroDuration = (duration: number) => {
    setPomodoroDuration(duration);
    saveSettings({
      ...storedSettings,
      pomodoroDuration: duration,
    });
    if (currentType === "pomodoro") {
      setRemainingTime(duration);
    }
  };

  const updateShortBreakDuration = (duration: number) => {
    setShortBreakDuration(duration);
    saveSettings({
      ...storedSettings,
      shortBreakDuration: duration,
    });
    if (currentType === "shortBreak") {
      setRemainingTime(duration);
    }
  };

  const updateLongBreakDuration = (duration: number) => {
    setLongBreakDuration(duration);
    saveSettings({
      ...storedSettings,
      longBreakDuration: duration,
    });
    if (currentType === "longBreak") {
      setRemainingTime(duration);
    }
  };

  // Formats the remaining time
  const formatRemainingTime = (seconds: number) => {
    const formattedTime = `${
      Math.floor(seconds / 60) > 0 ? Math.floor(seconds / 60) + ":" : ""
    }${
      Math.floor(seconds % 60) < 10
        ? "0" + Math.floor(seconds % 60)
        : Math.floor(seconds % 60)
    }`;
    return formattedTime;
  };

  const exportData: TimerContextType = {
    currentType,
    isRunning,
    isStarted,
    remainingTime,
    pomodoroCount,
    currentStreak,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    skipTimer,
    updatePomodoroDuration,
    updateShortBreakDuration,
    updateLongBreakDuration,
    formatRemainingTime,
    resetStats,
    totalTime,
  };

  return (
    <TimerContext.Provider value={exportData}>{children}</TimerContext.Provider>
  );
};

export default TimerContextComponent;
