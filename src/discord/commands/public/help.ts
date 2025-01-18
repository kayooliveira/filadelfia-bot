import { createCommand } from "#base";
import { createEmbed, createEmbedAuthor } from "@magicyan/discord";
import { ApplicationCommandType } from "discord.js";

createCommand({
    name: "help",
    description: "Veja a lista de comandos disponíveis 📋",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: [
        'SendMessages',
        "UseApplicationCommands",
    ],
    async run(interaction){
        const {user,guild} = interaction
        if(!guild){
            return interaction.reply({content:"Esse comando só pode ser usado em servidores",ephemeral:true})
        }

        const embed = createEmbed({
          author: createEmbedAuthor(user),
          title: "Lista de comandos 📋",
          description: "Aqui está a lista de comandos disponíveis",
          fields: [
            {
              name: '/solicitar',
              value: 'Solicite um curso ou especialização',
            },
            {
              name: '/aprovar',
              value: 'Aprovar um preenchimento do edital',
            },
            {
              name: '/reprovar',
              value: 'Reprovar um preenchimento do edital',
            },
            {
              name: '/promover',
              value: 'Promover um usuário',
            },
            {
              name: '/resultado',
              value: 'Lançar um resultado de curso, especialização ou exame ex: Psicotécnico',
            },
          ],
          color: '#ff66c4'
        });  

        return interaction.reply({embeds:[embed],ephemeral:true})
    }
});