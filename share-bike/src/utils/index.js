export function nowTime(unix) {
        let date = new Date(unix);
        let dispose = (str) => {
            return str>9 ? (''+str) : ('0'+str)
        };
        let year = date.getFullYear();
        let month = dispose(date.getMonth());
        let day = dispose(date.getDate());
        let hours = dispose(date.getHours());
        let minutes = dispose(date.getMinutes());
        let seconds = dispose(date.getSeconds());
        let time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        return time
    }
