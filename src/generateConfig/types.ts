import { answer } from './constants';

export type whichConfigurationProps = {
  ['typescript']?: boolean;
  ['javascript']?: boolean;
  ['react']?: boolean;
  ['vue']?: boolean;
  ['nextjs']?: boolean;
  ['tailwind']?: boolean;
  ['prettier']?: boolean;
};

export type oraShowType = { text: string; fn: () => Promise<unknown>; successText: string; failText: string; label?: string };

export type returnType = {
  commands?: oraShowType[];
  packages?: string[];
};

export type answerProps = {
  [answer]: whichConfigurationProps;
};

export type shareDataProps = answerProps & {
  [K in keyof whichConfigurationProps]?: returnType;
};

export type shareDataProps2<T, Keys extends keyof T> = {
  [D in Exclude<keyof T, Keys>]?: T[D];
} & {
  [K in Keys]-?: T[K];
};

export type languagePropsType = 'typescript' | 'javascript';
export type frameworksPropsType = 'react' | 'vue' | 'next';

export type nextFucType = () => void;
