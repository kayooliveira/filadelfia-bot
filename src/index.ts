import { bootstrap } from "#base";
import { ActivityType } from "discord.js";

export const client = await bootstrap({ 
  meta: import.meta,
  intents: [
    'Guilds'
  ],
  presence: {
    status: 'online',
    activities: [
      {name: 'Filadélfia City',state: 'Recrutamento de Médicos',type: ActivityType.Playing}
    ],
  },
});