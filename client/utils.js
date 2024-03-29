import moment from 'moment';

export const troncText = (text, length) => {
    if (text.length < length) return text
    return text.slice(0, length) + '...'
  }

export const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

export const formatDate = (date) =>{
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month =  months[newDate.getMonth()] 
  const years = newDate.getFullYear()

  const hour = newDate.getHours()
  const minutes = newDate.getMinutes()
  const seconde = newDate.getSeconds()

  return `${day} ${month}, ${years} à ${hour}:${minutes}:${seconde} `

}

export function convertISOToDuration(isoDate) {
  const now = moment();
  const then = moment(isoDate);
  const duration = moment.duration(now.diff(then));

  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (years > 0) {
    return `il y'a ${years} an${years > 1 ? 's' : ''}`;
  } else if (months > 0) {
    return `il y'a ${months} mois`;
  } else if (days > 0) {
    return `il y'a ${days} jour${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `il y'a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `il y'a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return 'à l\'instant';
  }
}