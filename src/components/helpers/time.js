const { useRef, useState, useEffect } = require("react");

export const useCountdown = ({ deadline }) => {
    const [countdown, setCountdown] = useState({
        countdownDays: '',
        countdownHours: '',
        countdownMinutes: '',
        countdownSeconds: '',
        remainingDayTime: ''
    });

    const timeInterval = useRef()

    useEffect(() => {
        timeInterval.current = setInterval(() => {
            const countdownDateTime = new Date(deadline).getTime();
            const currentTime = new Date().getTime();
            const remainingDayTime = countdownDateTime - currentTime;
            const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
            const totalHours = Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60));
            const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

            const runningCountdownTime = {
                countdownDays: totalDays,
                countdownHours: totalHours,
                countdownMinutes: totalMinutes,
                countdownSeconds: totalSeconds,
                remainingDayTime: remainingDayTime
            }

            setCountdown(runningCountdownTime);

            if (remainingDayTime < 0) {
                clearInterval(timeInterval.current);

                setCountdown({
                    countdownDays: '',
                    countdownHours: '',
                    countdownMinutes: '',
                    countdownSeconds: '',
                    remainingDayTime: ''
                });
            }

        }, 1000);

        return () => {
            clearInterval(timeInterval.current)
        }
    }, []);

    return countdown
}