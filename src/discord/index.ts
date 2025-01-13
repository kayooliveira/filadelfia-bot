import { setupCreators } from "#base";

export const { createCommand, createEvent, createResponder } = setupCreators({
  commands: {   
    guilds: [
      '1170583336838779012',
      '859859639419142144'
    ],
    defaultMemberPermissions: ['ChangeNickname'],
  },
});