import { createEmbed, createEmbedAuthor } from "@magicyan/discord";
import { CommandInteractionOptionResolver, Guild, InteractionReplyOptions, User } from "discord.js";

export function especializacao<R>(options: Omit<CommandInteractionOptionResolver<'cached'>, 'getMessage' | 'getFocused'>, user:User,guild:Guild):R {
  const usuario = options.getUser("usuario", true);
  const member = guild.members.cache.get(usuario.id);
  const username = member?.nickname || usuario.username;
  const crm = username.split(' | ')[1];
  const cargo = options.getString("cargo", true);
  const especializacao = options.getString("especializacao", true);
  const status = options.getString("status", true);
  const cargoespecializacao = options.getRole("cargoespecializacao");

  if (status === "APROVADO" && cargoespecializacao) {
    guild.members.cache.get(usuario.id)?.roles.add(cargoespecializacao);
  }

  const embed = createEmbed({
    author: createEmbedAuthor(user),
    title: "RESULTADO DE ESPECIALIZAÇÃO",
    description: `
      Usuário: ${usuario}
      CRM: ${crm}
      Cargo atual: ${cargo}
      Especialização: ${especializacao}
      Status: ${status}
    `,
    image: {
      url: 'https://i.imgur.com/CaRcuKB.png'
    },
    color: status === "APROVADO" ? "#ff66c4" : "#ff0000",
  })

  return ({
    embeds: [embed]
  } satisfies InteractionReplyOptions) as R
}