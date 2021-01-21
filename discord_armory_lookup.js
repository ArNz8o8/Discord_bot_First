// Armory Check for Echelon 808303
// Coded by ArNz8o8 on jan 21st 2021

const BlizzAPI = require('blizzapi');
const querystring = require('querystring');
const Discord = require("discord.js");

module.exports = {
	name: "armory",
	aliases: ["wow", "alt", "toon", "warcraft"],
	category: "info",
	description: "Check out your WoW character directly from the Blizzard API",
	usage: "!armory <name> <realm> (realm defaults to Darkmoon Faire, use - instead of spaces)",
	execute: async (message, args, client) => {

		if (!message.member.hasPermission('BAN_MEMBERS'))
			return message.reply("you are not allowed to do that.. haha");
		if (!args.length) {
			return message.reply(`It goes like !armory <name> <realm>`);

		} else {

			let realm = args[1];
			let argz = args[0].toLowerCase();
			if (!realm) realm = "darkmoon-faire"

			const Embed = (
					toonName,
					toonTitle,
					toonRealm,
					toonLevel,
					toonRace,
					toonSpec,
					toonClass,
					toonGuild,
					toonIlevel,
					toonRenown,
		                    	toonConvenant,
					toonLastOnline
				) =>

				new Discord.MessageEmbed()
				.setColor('#FF8315')
				.setTitle(`${toonName} ${toonTitle} (${toonRealm})`)
				.addField(`Currently at:`, `Level ${toonLevel}`)
				.addField(`Class:`, `${toonRace} ${toonSpec} ${toonClass}`)
				.addField(`Guild:`, `\u200b${toonGuild}`)
				.addField(`Item level:`, `\u200b${toonIlevel}`, true)
				.addField(`Renown - Convenant:`, `\u200b${toonRenown} - ${toonConvenant}`, true)
				.addField(`Last seen:`, `\u200b${toonLastOnline}`)
				.setFooter('World of Warcraft Armory lookup coded by ArNz8o8', 'https://i.imgur.com/5r8LkNz.png');

			const BnetApi = new BlizzAPI({
				region: 'eu',
				clientId: '1991ab0d69674657b487039e01478ee5',
				clientSecret: 'OxvPNjx5dDhYLlQwzca5DxL9Kx34ilRa',
				refreshExpiredAccessToken: true,
			});

			BnetApi.query(`/profile/wow/character/${realm}/${argz}?namespace=profile-eu&locale=en_GB`).then((data) => {

					let apiData = data;
					let toonName = apiData.name;
					let toonTitle;
					try {
						toonTitle = apiData.active_title.name;
					} catch (error) {
						toonTitle = "";
					};
					let toonRealm = apiData.realm.name
					let toonLevel = apiData.level;
					let toonRace = apiData.race.name;
					let toonSpec = apiData.active_spec.name;
					let toonClass = apiData.character_class.name
					let toonGuild;
					try {
						toonGuild = apiData.guild.name;
					} catch (error) {
						toonGuild = "Not in any guild";
					};
					let toonIlevel = apiData.equipped_item_level
					let toonRenown;
					try {
						toonRenown = apiData.covenant_progress.renown_level;
					} catch (error) {
						toonRenown = "No covenant... yet";
					};
		            		let toonConvenant
		            		try {
						toonConvenant = apiData.covenant_progress.chosen_covenant.name;
					} catch (error) {
						toonConvenant = "";
					};
					let toonLastOnline;
					try {
						toonLastOnline = apiData.last_login_timestamp;
					} catch (error) {
						toonLastOnline = "Unknown";
					};
					var d = new Date(toonLastOnline),
						yyyy = d.getFullYear(),
						mm = ('0' + (d.getMonth() + 1)).slice(-2),
						dd = ('0' + d.getDate()).slice(-2),
						hh = d.getHours(),
						h = hh,
						min = ('0' + d.getMinutes()).slice(-2),
						ampm = 'AM',
						toonFormattedTime;

					if (hh > 12) {
						h = hh - 12;
						ampm = 'PM';
					} else if (hh === 12) {
						h = 12;
						ampm = 'PM';
					} else if (hh == 0) {
						h = 12;
					}
				var toonFormattedTime = dd + '/' + mm + '/' + yyyy + ' at ' + h + ':' + min + ' ' + ampm;
					message.channel.send(Embed(toonName, toonTitle, toonRealm, toonLevel, toonRace, toonSpec, toonClass, toonGuild, toonIlevel, toonRenown, toonConvenant, toonFormattedTime));
				})
				.catch(function(error) {
					console.log(error);
				});
		}


		//console.log(character_query);
	}
}
