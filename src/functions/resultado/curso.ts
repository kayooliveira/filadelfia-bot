import { createEmbed, createEmbedAuthor } from "@magicyan/discord";
import { CommandInteractionOptionResolver, Guild, InteractionReplyOptions, User } from "discord.js";

export function curso<R>(options: Omit<CommandInteractionOptionResolver<'cached'>, 'getMessage' | 'getFocused'>, user:User,guild:Guild):R {
  const usuario = options.getUser("usuario", true);
  const crm = options.getString("crm", true);
  const cargo = options.getRole("cargo", true);
  const curso = options.getRole("curso", true);
  const status = options.getString("status", true);
  const cargocurso = options.getRole("cargocurso");

  if (status === "APROVADO" && cargocurso) {
    guild.members.cache.get(usuario.id)?.roles.add(cargocurso);
  }

  const embed = createEmbed({
    author: createEmbedAuthor(user),
    title: "RESULTADO DE CURSO",
    description: `
      Usuário: ${usuario}
      CRM: ${crm}
      Cargo atual: ${cargo}
      Curso efetuado: ${curso}
      Status: ${status}
    `,
    color: status === "APROVADO" ? "#00ff00" : "#ff0000",
  })

  return ({
    embeds: [embed]
  } satisfies InteractionReplyOptions) as R
}