import { createCommand } from "#base";
import { createEmbed } from "@magicyan/discord";
import { ApplicationCommandOptionType, ApplicationCommandType, Colors } from "discord.js";

createCommand({
    name: 'reprovar',
    description: 'Reprova um usuário do edital 🧾!',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuário',
            description: 'Usuário a ser reprovado',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'motivo',
            description: 'Motivo da reprovação',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async run(interaction){
        const user = interaction.options.getUser('usuário');

        const reason = interaction.options.getString('motivo');

        const guild = interaction.guild;

        if(!guild){
            return interaction.reply({ content: 'Este comando só pode ser executado em um servidor', ephemeral: true });
        }


        if(!user){
            const embed = createEmbed({
                title: 'Erro ao reprovar usuário ❌',
                description: 'Usuário não encontrado',
                color: Colors.Red,
            });
            interaction.reply({ embeds: [embed], flags: ['Ephemeral'] });
            return 
        }

        const embed = createEmbed({
            title: 'Reprovação de usuário ❌',
            description: `
           Olá, <@${user.id}>!

            Agradecemos por ter participado de nosso processo de recrutamento e por ter preenchido nosso edital. Após análise detalhada, informamos que, infelizmente, você não foi aprovado neste momento.

            Motivo da reprovação: ${reason}

            Embora esta não seja a notícia que esperávamos compartilhar, queremos encorajá-lo a continuar aprimorando suas habilidades e competências. Caso deseje, estaremos sempre abertos para futuras oportunidades.

            Você ainda pode preencher o formulário novamente acessando o link no canal https://discord.com/channels/859859639419142144/1327717813913255936, caso deseje tentar novamente.

            Agradecemos por seu interesse e desejamos sucesso em seus projetos futuros!
            `,
            color: Colors.Purple,
            image:{
                url: 'https://i.imgur.com/Pd1LXcV.png',
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

        await user.send({ embeds: [embed] }).catch(()=>{
            interaction.reply({ content: 'Não foi possível enviar a mensagem ao usuário', ephemeral: true });
        })

        await guildMember.roles.remove('1327704525582241907')
        await guildMember.roles.add('1328446018261618800')

        return await interaction.reply({ embeds: [embed] });
    }
});