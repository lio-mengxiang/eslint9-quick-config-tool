module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     A new feature',
    },
    {
      value: 'fix',
      name: 'fix:      A bug fix',
    },
    {
      value: 'docs',
      name: 'docs:     documentation only changes',
    },
    {
      value: 'style',
      name: 'style:    Changes that do not affect the meaning of the code',
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance',
    },
    {
      value: 'test',
      name: 'test:     Tests change',
    },
    {
      value: 'revert',
      name: 'revert:   Revert to a commit',
    },
    {
      value: 'build',
      name: 'build:    Build',
    },
    {
      value: 'chore',
      name: 'chore:    Changes to the build process or auxiliary tools',
    },
    {
      value: 'ci',
      name: 'ci:       CI related changes',
    },
  ],
  messages: {
    type: "Select the type of change that you're committing: ",
    scope: 'Denote the SCOPE of this change (optional):',
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change: ',
    body: 'Provide a LONGER description of the change',
    footer: 'List any ISSUES CLOSED by this change',
    confirmCommit: 'Are you sure you want to proceed with the commit above?（y/n）',
  },
  // skip
  skipQuestions: ['customScope', 'scope', 'body', 'footer'],
  // limit subject length
  subjectLimit: 100,
};

