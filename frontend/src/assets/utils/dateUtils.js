export const formattedDateTime = (date) => {
        const d = new Date(date);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        
        const hours = d.getHours();
        const minutes = d.getMinutes();

        const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`

        return `${day}/${month} ${formattedTime}`
    }