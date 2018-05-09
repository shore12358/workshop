const setDateString = (timeStamp) => {
    try {
        let date  = new Date(timeStamp),
            year  = date.getFullYear(),
            month = date.getMonth() + 1,
            day   = date.getDate(),
            time  = /([0-9]{2}:?){3}/.exec(date.toString()).shift();
        return `${year.toString().slice(-2)}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${time.toString().slice(0, 5)}`;

    } catch (e) {
        console.warn(new TypeError('wrong received date format.'));
        return '--/--/--';
    }
};

export default (el, binding) => {
    el.innerHTML = setDateString(binding.value);
}
