import { getCurrentKoreanTime } from '../utils/time.js'

const buffSchedule = {
  2: 'Aldebaran',
  8: 'Prontera (Left)/Alberta',
  14: 'Geffen/Payon',
  17: 'Einbroch',
  20: 'Prontera (Right)/Morroc',
  23: 'Lighthalzen'
}

function getMinutesString(minutes) {
  if (!minutes) {
    return ''
  }
  if (minutes === 1) {
    return ` and **${minutes} minute**`
  }
  return ` and **${minutes} minutes**`
}

function getHoursString(hours) {
  return hours === 1 ? `**${hours} hour**` : `**${hours} hours**`
}

function getPossibleHours() {
  return Object.keys(buffSchedule)
    .map(numString => parseInt(numString, 10))
    .sort((a, b) => a - b)
}

function getNextActiveHour(currentHour) {
  let nextActiveHour
  const possibleHours = getPossibleHours()
  for (const possibleHour of possibleHours) {
    if (possibleHour < currentHour) {
      continue;
    }
    nextActiveHour = possibleHour
    break;
  }
  return nextActiveHour
}

/**
 * Get message to send when
 * inn command is invoked
 * 
 * @param {number} currentHour
 * @param {number} currentMinutes
 */
export function getInnMessage(currentHour,  currentMinutes) {
  const activeCity = buffSchedule[currentHour]
  if (activeCity) {
    return `Inn buff is currently active in: **${activeCity}**!`
  }
  let nextActiveHour = getNextActiveHour(currentHour)
  if (!nextActiveHour) {
    return 'I can\'t determine the next active inn time. Whoops!'
  }
  let hoursTillNextBuff = nextActiveHour - currentHour
  let minutesToHour;
  if (currentMinutes !== 0)  {
    minutesToHour = 60 - currentMinutes
    hoursTillNextBuff = hoursTillNextBuff - 1
  }
  return `No inn buff right now. Next one is in ${getHoursString(hoursTillNextBuff)}${getMinutesString(minutesToHour)} in **${buffSchedule[nextActiveHour]}**!`
}

/**
 * inn command
 */
const inn = {
  conf: {
    enabled: true,
    guildOnly: false
  },
  help: {
    name: 'inn',
    category: 'Informational',
    description: 'Tells you if there is currently an inn buff, and where it is!',
    usage: 'inn'
  },
  run(_client, message, _args) {
    const currentHour = getCurrentKoreanTime().hour()
    const currentMinutes = getCurrentKoreanTime().minute()
    const msg = getInnMessage(currentHour, currentMinutes)
    message.channel.send(msg)
  }
}

export default inn;