export {}
declare global {
  type ExcludeId<T> = Exclude<T, `${string}Id`>
  type OmitId<T extends Record<string, unknown>> = {
    [K in keyof T as K extends `${string}Id` ? never : K]: T[K]
  }
}
