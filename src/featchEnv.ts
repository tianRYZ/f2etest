enum IEnvEnum {
  DEV = 'dev',
  TEST = 'test',
  PRE = 'pre',
  PROD = 'prod',
}

export function fetchEnv(url: string): IEnvEnum {
  const envs = [IEnvEnum.DEV, IEnvEnum.TEST, IEnvEnum.PRE, IEnvEnum.PROD];

  return envs.find((env) => url.includes(env)) || IEnvEnum.PROD;
}
