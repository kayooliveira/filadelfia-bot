import { createCommand } from "#base";
import { createEmbed, createEmbedAuthor } from "@magicyan/discord";
import { ApplicationCommandType } from "discord.js";

createCommand({
    name: "atualizar-ids",
    description: "Atualizar os IDs dos membros do servidor!",
    defaultMemberPermissions: ['Administrator'],
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const {guild,user} = interaction;
        if(!guild) {
            return interaction.reply({
              content: 'Este comando só pode ser executado em um servidor!',
              flags,
            });
        }

        // The members has the following pattern to nicknames = "ROLE - Name | ID" except the responsibles that dont need to be in the list.
        // This command should return an embed with the list of members that need to be updated.

        const membersWithIds = guild.members.cache.filter(member => {
            return member.nickname && member.nickname.includes('|');
        }).map(member => {
            const [role, name, id] = member.nickname?.split(' | ') || [];
            if (!role || !name || !id) return null;
            return {
                role,
                name,
                id,
            };
        });

        const embed = createEmbed({
          author: createEmbedAuthor(user),
            title: 'Ids atualizados dos membros do HP',
            description: membersWithIds.map(member => {
              if(!member) return null;
                return `${member.role} - ${member.name} | ${member.id}`;
            }).join('\n'),
            color: '#ff66c4',
        });

        return interaction.reply({
            embeds: [embed],
        });
    }
});