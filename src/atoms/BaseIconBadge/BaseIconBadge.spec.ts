import { mount, VueWrapper } from '@vue/test-utils'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import BaseIconBadge from './BaseIconBadge.vue'

describe('IconBadge', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(BaseIconBadge, {
      props: {
        iconKey: 'testIconClass'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders with given icon class', async () => {
    const icon = wrapper.find('[data-test="badge"] [data-test="icon"]')
    expect(icon.classes()).toContain('testIconClass')
  })
})
