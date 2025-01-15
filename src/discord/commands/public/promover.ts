import { createCommand } from "#base";
import { createEmbed, createEmbedAuthor } from "@magicyan/discord";
import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";

createCommand({
  name: "promover",
  type: ApplicationCommandType.ChatInput,
  description: "Promover usuário",
  options: [
    {
      name: "usuario",
      description: "Usuário a ser promovido",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "cargoantigo",
      description: "Cargo antigo do usuário",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
    {
      name: "cargonovo",
      description: "Cargo novo do usuário",
      type: ApplicationCommandOptionType.Role,
      required: true,
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

    const usuario = options.getUser("usuario", true);
    const cargoAntigo = options.getRole("cargoantigo", true);
    const cargoNovo = options.getRole("cargonovo", true);
    const passaporte = usuario.username.split("|")[1].trim();


    const embed = createEmbed({
      author: createEmbedAuthor(user),
      title: "Promoção de cargo",
      description: `
          **Nome**: ${usuario.id}
          **Passaporte**: ${passaporte}
          **Cargo antigo**: ${cargoAntigo}
          **Cargo novo**: ${cargoNovo}  

          **Promovido por**: ${user}
      `
    })

    const member = await guild.members.fetch(usuario.id);

    if (!member) {
      return interaction.reply({
        content: "Usuário não encontrado",
        ephemeral: true,
      });
    }

    if (!member.roles.cache.has(cargoAntigo.id)) {
      return interaction.reply({
        content: "Usuário não possui o cargo antigo",
        ephemeral: true,
      });
    }

    if (member.roles.cache.has(cargoNovo.id)) {
      return interaction.reply({
        content: "Usuário já possui o cargo novo",
        ephemeral: true,
      });
    }

    await member.roles.add(cargoNovo.id);
    await member.roles.remove(cargoAntigo.id);

    return interaction.reply({
      embeds: [embed],
    });
  },
});
