import { createCommand } from "#base";
import { createEmbed } from "@magicyan/discord";
import { ApplicationCommandOptionType, ApplicationCommandType,  Colors, InteractionContextType } from "discord.js";


createCommand({
    name: 'aprovar',
    description: 'Aprova um usuário do edital 🧾!',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuário',
            description: 'Usuário a ser aprovado',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
    contexts: [
        InteractionContextType.Guild,
    ],

    async run(interaction){
        const user = interaction.options.getUser('usuário',true);
        const guild = interaction.guild;

        if(!guild){
            return interaction.reply({ content: 'Este comando só pode ser executado em um servidor', ephemeral: true });
        }

        
        const embed = createEmbed({
            title: 'Aprovação de usuário ✅',
            description: `
            Olá, <@${user.id}>!

            Agradecemos por ter preenchido nosso edital de recrutamento. Para dar início ao processo, solicitamos que se dirija ao hospital e procure um membro da gerência, que auxiliará no início de seu recrutamento.

            Após esta etapa, pedimos que acesse o canal https://discord.com/channels/859859639419142144/1170773626723778690 e siga cuidadosamente as orientações descritas para continuar o procedimento.

            Estamos à disposição para esclarecer qualquer dúvida e desejamos sucesso em sua jornada conosco!

            Aprovado por: @${interaction.user.id}
            `,
            color: Colors.Purple,
            image:{
                url: 'https://i.imgur.com/OvNzaZK.png',
            },
            author: {
                name: 'Filadélfia Medical Center',
                iconURL: 'https://cdn.discordapp.com/icons/859859639419142144/571f1b5692e2686834e4ef04e6f6672f.webp?size=96'
            },
            footer: {
                text: `Filadélfia Medical Center`,
                iconURL: 'https://cdn.discordapp.com/icons/859859639419142144/571f1b5692e2686834e4ef04e6f6672f.webp?size=96'
            },
        });

        const guildMember = await guild.members.fetch(user.id);


        await guildMember.roles.add('1327704525582241907')

        await user.send({ embeds: [embed] }).catch(()=>{
            console.log('Erro ao enviar mensagem para o usuário')
        })

        return await interaction.reply({ embeds: [embed] });
    }
});