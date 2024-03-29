import { mount, VueWrapper } from '@vue/test-utils'
import BaseIcon from './BaseIcon.vue'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'

describe('Icon', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(BaseIcon, {
      props: {
        iconKey: 'testIconClass'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders with aria-hidden=true attribute', async () => {
    const icon = wrapper.find('[data-test="icon"]')
    expect(icon.attributes('aria-hidden')).toBe('true')
  })

  it('renders with bootstrap-icon default class', async () => {
    const icon = wrapper.find('[data-test="icon"]')
    expect(icon.classes()).toContain('bi')
  })

  it('renders with given icon class', async () => {
    const icon = wrapper.find('[data-test="icon"]')
    expect(icon.classes()).toContain('testIconClass')
  })
})
