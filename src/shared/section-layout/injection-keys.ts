import type { InjectionKey } from 'vue'
import type { SectionLayoutConfig } from './interface'
import type { BEM } from '@/_internal'

export const SectionLayoutInjectionKey: InjectionKey<{
  bem: BEM
  config: SectionLayoutConfig | undefined
}> = Symbol('')
