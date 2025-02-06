export const formatedDateAndTime = (currentDate) =>{
    const temp = currentDate.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    let count = 0;
    return temp.replace(new RegExp(",", 'g'), (match) => {
      count++;
      if (count === 2) {
        return "at";
      }
      return match;
    });
}