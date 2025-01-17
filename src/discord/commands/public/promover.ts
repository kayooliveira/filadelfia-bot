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
    const member = await guild.members.fetch(usuario.id);
    const memberName = member.nickname || usuario.username

    const passaporte =  memberName.split(' | ')?memberName.split(' | ')[1]:null
    
    if(!passaporte){
      return interaction.reply({
        content: "O nome do usuário deve estar no formato [CARGO] - [NOME] [SOBRENOME] | [PASSAPORTE]",
        ephemeral: true,
      });
    }


    if (!member) {
      return interaction.reply({
        content: "Usuário não encontrado",
        ephemeral: true,
      });
    }

    console.log(member)
    const embed = createEmbed({
      author: createEmbedAuthor(user),
      title: "Promoção de cargo",
      description: `
          **Nome**: ${usuario}
          **Passaporte**: ${passaporte}
          **Cargo antigo**: ${cargoAntigo.name}
          **Cargo novo**: ${cargoNovo.name}  

          **Promovido por**: ${user}
      `,
      color: '#ff66c4'
    })



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
