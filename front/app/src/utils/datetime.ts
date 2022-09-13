export const formatDateTime = (date: string) => {
//    input:2019-01-01T00:00:00.000Z output: 2019-01-01 00:00
    const [datePart, timePart] = date.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    return `${year}-${month}-${day} ${hour}:${minute}`;
}