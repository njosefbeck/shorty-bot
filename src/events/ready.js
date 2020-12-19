function ready(client) {
  // Log that bot is online
  const numUsers = client.users.cache.size;
  const userString = numUsers === 1 ? 'user' : 'users';
  const numGuilds = client.guilds.cache.size;
  const guildString = numGuilds === 1 ? 'guild' : 'guilds';
  console.info(`${client.user.tag}, ready to serve ${numUsers} ${userString} in ${numGuilds} ${guildString}.`)

  // Make the bot 'play the game',
  // which is the help command with the default prefix
  const prefix = client.config.prefix;
  client.user.setActivity(`${prefix}inn`, { type: 'PLAYING' })
}

export default ready;