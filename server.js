import { Client, IntentsBitField } from "discord.js";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log("bot is running");
});

client.on("messageCreate", async (message) => {
  // Check if the message starts with the command prefix
  if (message.content.startsWith("!notify")) {
    // Parse the command arguments
    const args = message.content.slice("!notify".length).trim().split(" ");
    const time = parseInt(args[0]); // Time in milliseconds
    const roleMention = message.mentions.roles.first(); // Get the first mentioned role
    const notification = args.slice(1).join(" "); // Join remaining arguments as notification message

    // Check if the command has valid arguments
    if (!isNaN(time) && notification && roleMention) {
      // Schedule the notification
      setTimeout(() => {
        message.channel.send(`${roleMention.toString()} ${notification}`);
      }, time);
      // Send confirmation message
      message.channel.send(
        `Notification scheduled for ${time} milliseconds from now.`
      );
    } else {
      // Send error message for invalid command usage
      message.channel.send(
        "Invalid command. Usage: `!notify <time_in_milliseconds> <role_mention> <notification_message>`"
      );
    }
  }
});

client.login(
  "MTI0MDUzMzk3ODkyNzA3NTM3MA.GA_KBG.wCm16g9E2HtE-_XXeXtqDzvyLRuU1g9beV1Mzk"
);
