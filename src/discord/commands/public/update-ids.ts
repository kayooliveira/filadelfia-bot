import { createCommand } from "#base";
import { createEmbed, createEmbedAuthor } from "@magicyan/discord";
import { ApplicationCommandType } from "discord.js";

createCommand({
    name: "atualizar-ids",
    description: "Atualizar os IDs dos membros do servidor!",
    defaultMemberPermissions: ['Administrator'],
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const { guild, user } = interaction;
        if(!guild) {
            return interaction.reply({
              content: 'Este comando só pode ser executado em um servidor!',
              flags,
            });
        }
        const allowedRoles = [
          '859861221188042792', // Coord.Gera
          '1300470367889915966', // Coord
          '859861232558407700', // Diretor
            '859866676127465483', //vice
            '1277404554543108116', //gerente
            '1301257722876133477', // supervisor
            '1188223307317788723', // chefe medico
            '1065441549695058021', // medico
            '1065441497446613033', // paramedico
            '1065441309638262784', // enfermeiro
            '1065440873820733450', // auxiliar de enfermagem
            '1330708267088875551', // tecnico de enfermagem
            '1161209673232425000', //membro do hospital
        ]
        const members =  (await guild.members.fetch()).filter(member => member.nickname?.includes('|') && !member.user.bot && !member.user.system && member.roles.cache.some(role => allowedRoles.includes(role.id)));

        const membersWithIds = members.map(member => {
            const [namewithRole, id] = member.nickname?.split(' | ') ?? [null, member.user.username];
            const name = namewithRole?.split(' - ')[1];
            return {
                name,
                id:Number(id?.trim()),
            };
        });

        const sortedMembers = membersWithIds.sort((a, b) => a.id - b.id);


        const embed = createEmbed({
          author: createEmbedAuthor(user),
            title: `Lista de IDs atualizados dos membros do hospital (${sortedMembers.length})`,
            description: sortedMembers.map(member => {
                return `**[${member.id}]** ${member.name && '- ' + member.name }`;	
            }).join('\n'),
            color: '#ff66c4',
        });

        return interaction.reply({
            embeds: [embed],
        });
    }
});