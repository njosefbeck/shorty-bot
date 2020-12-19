// The MESSAGE event runs anytime a message is received
// Note that due to the bindings of client to every event,
// every event goees `client, other, args` when this function runs

function message(client, message) {
  // Ignore other bot messages (including this one!)
  if (message.author.bot) return

  // Checks if bot was @ mentioned with no message after it
  // If so, returns the prefix
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`)
  if (message.content.match(prefixMention)) {
    return message.reply(`the only command I know right now is: \`${client.config.prefix}inn\``)
  }

  // Ignore any message that does not start with the prefix
  if (!message.content.startsWith(client.config.prefix)) return

  // Separate our 'command' name from the command 'arguments'
  // e.g. if we have "/inn where are they now?", we'll get:
  // command = inn
  // args = ['where', 'are', 'they', 'now?']
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  // Check whether the command or alias exists
  const cmd = client.commands.get(command)
  if (!cmd) return

  // Some commands may not be useable in DMs. This check prevents
  // those commands from running and returns a friendly error message
  if (cmd && !message.guild && cmd.conf.guildOnly) {
    return message.channel.send('This command is unavailable via private message! Please run it from within a Discord server.')
  }

  message.flags = [];
  while (args[0] && args[0][0] === '-') {
    message.flags.push(args.shift().slice(1))
  }
  // If the command exists, run it
  console.info(`[CMD] ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`)
  cmd.run(client, message, args)
}

export default message;
