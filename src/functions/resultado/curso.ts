import { createEmbed, createEmbedAuthor } from "@magicyan/discord";
import { CommandInteractionOptionResolver, InteractionReplyOptions, User } from "discord.js";

export function curso<R>(options: Omit<CommandInteractionOptionResolver<'cached'>, 'getMessage' | 'getFocused'>, user:User):R {
  const usuario = options.getUser("usuario", true);
  const passaporte = options.getString("passaporte", true);
  const cargo = options.getRole("cargo", true);
  const curso = options.getRole("curso", true);
  const status = options.getString("status", true);

  const embed = createEmbed({
    author: createEmbedAuthor(user),
    title: "RESULTADO DE CURSO",
    description: `
      Usuário: ${usuario}
      Passaporte: ${passaporte}
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