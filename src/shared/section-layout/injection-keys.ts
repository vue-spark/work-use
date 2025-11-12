import type { InjectionKey } from 'vue'
import type { BEM } from '@/_internal'
import type { SetupConfig } from '@/setup-config'

export const SectionLayoutInjectionKey: InjectionKey<{
  bem: BEM
  config: SetupConfig['SectionLayout']
}> = Symbol('')
