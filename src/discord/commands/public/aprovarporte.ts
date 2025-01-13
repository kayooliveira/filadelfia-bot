import { createCommand } from "#base";
import { createEmbed } from "@magicyan/discord";
import { ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";

// Modelo mensagem Porte.
// SOLICITAÇÃO DE PORTE DE ARMA

// Nome: Gisele Gross
// Passaporte: 19165
// Registro: 73VBD275
// Número: 613-492
// Necessidade: Defesa Pessoal
// Profissão: Mecânica
// Solicitante: @oliveirakayo 

// STATUS: APROVADO :white_check_mark:
createCommand({
    name: "aprovarporte",
    description: "Aprovar porte de armas",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "nome",
            description: "Nome do cidadão",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "passaporte",
            description: "Número do passaporte",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "registro",
            description: "Número do registro",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "numero",
            description: "Número do porte",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "necessidade",
            description: "Necessidade do porte",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "profissao",
            description: "Profissão do cidadão",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
          name: "arquivo",
          description: "Arquivo do porte",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        }
    ],
    async run(interaction){
        const {guild,user, options } = interaction;
        if(!guild) {
            return interaction.reply({ content: "Este comando só pode ser executado em um servidor", ephemeral: true });
        }

        const nome = options.getString("nome", true);
        const passaporte = options.getString("passaporte", true);
        const registro = options.getString("registro", true); 
        const numero = options.getString("numero", true);
        const necessidade = options.getString("necessidade", true);
        const profissao = options.getString("profissao", true);
        const arquivo = options.getAttachment("arquivo");

        const embed = createEmbed({
            title: "SOLICITAÇÃO DE PORTE DE ARMA",
            image: {
              url: 'https://i.imgur.com/IzCwSPI.png',
            },
            description: `
            Nome: ${nome}
            Passaporte: ${passaporte}
            Registro: ${registro}
            Número: ${numero}
            Necessidade: ${necessidade}
            Profissão: ${profissao}
            Solicitante: <@${user.id}>

            STATUS: APROVADO ✅
            `,
            color: "#00ff00",
        });

        if(arquivo) {
          embed.addFields([
            {
              name: `Certificado do Exame Psicotécnico ${nome}`,
              value: `[Baixar](${arquivo.url})`,
            }
          ]);
        }
        return interaction.reply({ embeds: [embed] });
    }
});