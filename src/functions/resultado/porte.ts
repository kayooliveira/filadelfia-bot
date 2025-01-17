import { createEmbed } from "@magicyan/discord";
import { CommandInteractionOptionResolver,  InteractionReplyOptions, User } from "discord.js";

export function porte<R>(options:Omit<CommandInteractionOptionResolver<'cached'>, 'getMessage' | 'getFocused'> ,user:User):R {

  const nome = options.getString("nome", true);
  const passaporte = options.getString("passaporte", true);
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