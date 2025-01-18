import { createCommand } from "#base";
import { createEmbed, createEmbedAuthor } from "@magicyan/discord";
import { courses,specializations } from "#consts"
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";

createCommand({
  name: "solicitar",
  description: "Comando para solicitar cursos, exames entre outros 📋",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: [
    'SendMessages',
    "UseApplicationCommands",
  ],
  options: [
    {
      name: "curso",
      description: "Solicitar um curso 📋",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "nomecurso",
          description: "Nome do curso que deseja solicitar 🧾",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: courses,
        },
        {
          name: "cargoatual",
          description: "Cargo atual do usuário 🧑",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "horariodisponivel",
          description: "Horário disponível para fazer o curso 🕒",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: "especializacao",
      description: "Solicitar uma especialização 📋",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "nomeespecializacao",
          description: "Nome da especialização que deseja solicitar 🧾",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: specializations,
        },
        {
          name: "cargoatual",
          description: "Cargo atual do usuário 🧑",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "horariodisponivel",
          description: "Horário disponível para fazer a especialização 🕒",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ],
  async run(interaction) {
    const { guild, user, options } = interaction;

    if (!guild) {
      return interaction.reply({
        content: "Este comando só pode ser executado em um servidor",
        ephemeral: true,
      });
    }

    const subcommand = options.getSubcommand();

    const cargoatual = options.getString("cargoatual");
    const horariodisponivel = options.getString("horariodisponivel");
    const member = await guild.members.fetch(user.id);
    const username = member.nickname || user.username;
    const passaporte = username.split(" | ") ? username.split(" | ")[1] : null;

    switch (subcommand) {
      case "curso":
        const nomecurso = options.getString("nomecurso");
        const embed = createEmbed({
          author: createEmbedAuthor(user),
          title: "Solicitação de curso 📋",
          description: `
            **NOME**: ${user}
            **CRM**: ${passaporte}
            **CURSO**: ${nomecurso}
            **CARGO ATUAL**: ${cargoatual}
            **HORÁRIO DISPONÍVEL**: ${horariodisponivel}
          `,
          image: {
            url: "https://i.imgur.com/Ky9NJmP.png",
          },
          color: "#ff66c4",
        });

        return interaction.reply({ embeds: [embed] });
      case "especializacao":
        const nomeespecializacao = options.getString("nomeespecializacao");

        const specializationEmbed = createEmbed({
          author: createEmbedAuthor(user),
          title: "Solicitação de especialização 📋",
          description: `
              **NOME**: ${user}
              **CRM**: ${passaporte}
              **ESPECIALIZAÇÃO**: ${nomeespecializacao}
              **CARGO ATUAL**: ${cargoatual}
              **HORÁRIO DISPONÍVEL**: ${horariodisponivel}
              `,
          image: {
            url: "https://i.imgur.com/6yKOa3h.png",
          },
          color: "#ff66c4",
        });

        return interaction.reply({ embeds: [specializationEmbed] });
      default:
        return interaction.reply({
          content: "Subcomando não encontrado",
          ephemeral: true,
        });
    }
  },
});
