import { createCommand } from "#base";
import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";
import { curso,porte } from "#functions";
import { courses } from "consts/courses.js";
import { specializations } from "consts/specializations.js";
import { especializacao } from "functions/resultado/especializacao.js";


createCommand({
  name: "resultado",
  description: "Enviar resultado de um curso ou exame",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "porte",
      type: ApplicationCommandOptionType.Subcommand,
      description: "Resultado de um porte de armas",
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
          name: "status",
          description: "Status do porte",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "Aprovado ✅",
              value: "APROVADO",
            },
            {
              name: "Reprovado ❌",
              value: "REPROVADO",
            },
          ],
        },
        {
          name: "arquivo",
          description: "Arquivo do porte",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        },
      ],
    },
    {
        name: "curso",
        type: ApplicationCommandOptionType.Subcommand,
        description: "Resultado de um curso",
        options: [
            {
                name: 'usuario',
                description: 'Usuário que realizou o curso',
                type: ApplicationCommandOptionType.User,
                required: true
            },
            {
                name: 'cargo',
                description: 'Cargo atual do usuário',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'curso',
                description: 'Curso realizado',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: courses
            },
            {
                name: 'status',
                description: 'Status do curso',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'Aprovado ✅',
                        value: 'APROVADO',
                    },
                    {
                        name: 'Reprovado ❌',
                        value: 'REPROVADO',
                    }
                ]
            },
            {
                name: 'cargocurso',
                description: 'Cargo pra adicionar ao usuário',
                type: ApplicationCommandOptionType.Role,
                required: true
            },
        ]
    },
    {
      name: 'especializacao',
      description: 'Resultado de uma especialização',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'usuario',
          description: 'Usuário que realizou a especialização',
          type: ApplicationCommandOptionType.User,
          required: true
        },
        {
          name: 'cargo',
          description: 'Cargo atual do usuário',
          type: ApplicationCommandOptionType.String,
          required: true
        },
        {
          name: 'especializacao',
          description: 'Especialização realizada',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: specializations
        },
        {
          name: 'status',
          description: 'Status da especialização',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: 'Aprovado ✅',
              value: 'APROVADO',
            },
            {
              name: 'Reprovado ❌',
              value: 'REPROVADO',
            }
          ]
        },
        {
          name: 'cargoespecializacao',
          description: 'Cargo pra adicionar ao usuário',
          type: ApplicationCommandOptionType.Role,
          required: true
        },
      ]
    }
  ],
  async run(interaction) {
    const { guild, user, options } = interaction;
    
    if (!guild) {
      return interaction.reply({
        content: "Este comando só pode ser executado em um servidor",
        ephemeral: true,
      });
    }

    switch (options.getSubcommand()){
        case 'porte':
            return interaction.reply(porte(options,user))
        case 'curso':
            return interaction.reply(curso(options,user,guild))
        case 'especializacao':
          return interaction.reply(especializacao(options,user,guild))
        default: 
            return interaction.reply({content: 'Comando inválido', ephemeral: true})
    }
  },
});
