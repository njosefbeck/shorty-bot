// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 14) throw new Error("Node 14.0.0 or higher is required. Update Node on your system.")

import Discord from 'discord.js'
import fs from 'fs'
import { promisify } from 'util'
const readdir = promisify(fs.readdir)

const client = new Discord.Client();

const config = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX
}

client.config = config

/**
 * Add all event listeners
 * to the client
 */
const eventFiles = await readdir('./src/events/')
console.info(`Loading a total of ${eventFiles.length} events.`)
eventFiles.forEach(async file => {
  const eventName = file.split('.')[0]
  console.info(`Loading Event: ${eventName}`)
  const { default: event } = await import(`./events/${file}`)
  client.on(eventName, event.bind(null, client))
})

client.commands = new Discord.Collection();

/**
 * Add all commands to client.commands
 */
const cmdFiles = await readdir('./src/commands/')
console.info(`Loading a total of ${cmdFiles.length} commands.`)
cmdFiles.forEach(async file => {
  if (!file.endsWith('.js')) return
  const commandName = file.split('.')[0]
  console.info(`Loading Command: ${commandName}`)
  const { default: command } = await import(`./commands/${file}`)
  client.commands.set(commandName, command)
});

client.login(process.env.TOKEN)
