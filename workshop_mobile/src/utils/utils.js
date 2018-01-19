/**
 * get the theme color of each order
 *
 * @param currentTime {number} should be timeStamp
 * @param planTime {number} should be timeStamp
 * @return {number} 1: red 2: orange 3: green 4: blue
 */
const getOrderColor = () => {
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;
    let today_str, today;

    return (currentTime, planTime) => {
        if (!today) {
            today_str = new Date(currentTime)
                .toString()
                .replace(/([0-9]{2}:?){3}/, '00:00:00');
            today = new Date(today_str).getTime();
        }

        if (currentTime > planTime) {
            return 'red';
        }
        if ((planTime - today) < ONE_DAY_MS) {
            return 'orange';
        }
        if ((planTime - today) < 2 * ONE_DAY_MS) {
            return 'green';
        }
        return 'blue';
    };

};

export {
    getOrderColor
};