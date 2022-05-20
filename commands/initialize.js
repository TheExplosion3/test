const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientId, guildId} = require('../config.json');
const { ScChange } = require('../functions.js');
const myId = process.env['myid'];

module.exports = {
  data: new SlashCommandBuilder()
		.setName('initialize')
		.setDescription('Initializes all new civilians into the Glorious Social Credit System.'),
  async execute(interaction) {
    let currentNewMembers = [];
    let newUserCount = 0;
    const guild = interaction.client.guilds.cache.get(guildId);
    console.log(guild.members.fetch());
    guild.members.fetch().then(members => {   
      console.log(guild.members.fetch());
      let tag;
          // Loop through every members
        members.forEach(member => {
          tag = sc.findOne({ where: { id: member } });
          console.log(tag);
          if(!tag) {  
            currentNewMembers.push(member);
            newUserCount++;
          }
        });
      });
    if (interaction.user.id === myId) {
      currentNewMembers.forEach(member => {
        const list = guild.members.cache.keys();
        const scId = sc.findOne({ where: { id: member } });
        if(scId) {
           try {
          const tag = sc.create({
            name: client.users.cache.find(member => user.id === 'USER-ID'),
            id: member,
            social_credit: 10
          });
        }
          catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
              console.log("Not a new user, silently ignoring.");
            }
          }
        }
      })
      await interaction.reply(newUserCount + " new civilians added.")
    }
    else {
      await interaction.reply('Admin Priviliges Not Found, Deducting Social Credit...');
      ScChange(false, 10, interaction.user.id)
    }
  }
};