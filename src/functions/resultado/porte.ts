import { createEmbed } from "@magicyan/discord";
import { CommandInteractionOptionResolver,  Guild,  InteractionReplyOptions, User } from "discord.js";

export function porte<R>(options:Omit<CommandInteractionOptionResolver<'cached'>, 'getMessage' | 'getFocused'> ,user:User,guild:Guild):R {

  const nome = options.getString("nome", true);
  const member = guild.members.cache.get(user.id);
  const username = member?.nickname || user.username;
  const passaporte = username.split(" | ") ? username.split(" | ")[1] : null;
  const registro = options.getString("registro", true);
  const numero = options.getString("numero", true);
  const necessidade = options.getString("necessidade", true);
  const profissao = options.getString("profissao", true);
  const arquivo = options.getAttachment("arquivo");

  const embed = createEmbed({
    title: "RESULTADO DE EXAME PSICOTÉCNICO PARA PORTE DE ARMA",
    image: {
      url: "https://i.imgur.com/IzCwSPI.png",
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
    color: "#ff66c4",
  });

  if (arquivo) {
    embed.addFields([
      {
        name: `Certificado do Exame Psicotécnico ${nome}`,
        value: `[Baixar](${arquivo.url})`,
      },
    ]);
  }

  return ({
    embeds: [embed],
  } satisfies InteractionReplyOptions) as R
}