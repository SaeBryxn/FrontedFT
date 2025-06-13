import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SidebarClient from '../src/components/shared/SidebarClient.vue'
import { i18n } from '../src/i18n'

describe('SidebarClient', () => {
  it('renderiza enlaces principales', () => {
    const wrapper = mount(SidebarClient, {
      global: {
        plugins: [i18n],
        stubs: {
          'router-link': { template: '<a><slot /></a>' }
        }
      }
    })
    expect(wrapper.text()).toContain('Admin')
    expect(wrapper.text()).toContain('Orders')
  })
})
