import { mount } from '@vue/test-utils'
import BeSwitch from '../src/be-switch.vue'
import { ref } from 'vue'
import {asyncExpect} from "../../../utils/utils";

const _mount = (options: any) =>
  mount({
    components: {
      BeSwitch: BeSwitch,
    },
    ...options,
  })
/**
 * 测试props生效
 * @param options
 */
describe('test-be-switch-props', () => {

  test('init-value', async () => {
    const wrapper = _mount({
      template: `
              <div @click="varSwitch = false" id="test_click"></div>  
              <BeSwitch v-model="varSwitch"></BeSwitch>`,
      setup() {
        const varSwitch = ref<boolean>(true)
        return {
          varSwitch,
        }
      },
    })
    asyncExpect(()=>{
      expect(wrapper.find('.be-switch__checked').exists()).toBeTruthy()
      wrapper.find('#test_click').trigger('click')
      asyncExpect(()=>{
        expect(wrapper.find('.be-switch__unChecked').exists()).toBeTruthy()
      },null)
    },null)


  })

  test('props-size-small', () => {
    const wrapper = mount(BeSwitch, {
      props: {
        size: 'small',
      },
    })
    const elm = wrapper.element as HTMLElement
    expect(elm.className.indexOf('be-switch__small') > 0).toBeTruthy()
  })
  test('props-size-default', () => {
    const wrapper = mount(BeSwitch, {
      props: {
        size: 'default',
      },
    })
    const elm = wrapper.element as HTMLElement
    expect(elm.className.indexOf('be-switch__default') > 0).toBeTruthy()
  })
  test('props-size-large', () => {
    const wrapper = mount(BeSwitch, {
      props: {
        size: 'large',
      },
    })
    const elm = wrapper.element as HTMLElement
    expect(elm.className.indexOf('be-switch__large') > 0).toBeTruthy()
  })
  test('props-disabled', async () => {
    const wrapper = _mount({
      template: `
              <BeSwitch v-model="varSwitch" disabled></BeSwitch>`,
      setup() {
        const varSwitch = ref<boolean>(false)
        return {
          varSwitch,
        }
      },
    })
    await wrapper.find('.be-switch').trigger('click')
    expect(!wrapper.vm.varSwitch).toBeTruthy()
  })
  test('props-isLoading', async () => {
    const wrapper = _mount({
      template: `
              <BeSwitch v-model="varSwitch" isLoading></BeSwitch>`,
      setup() {
        const varSwitch = ref<boolean>(false)
        return {
          varSwitch,
        }
      },
    })
    const loadingIcon = wrapper.element.querySelector('.be-switch--circle--icon') as HTMLElement
    expect(loadingIcon.className.indexOf('be-icon__spin be-switch--circle--icon') > 0).toBeTruthy()
    await wrapper.find('.be-switch').trigger('click')
    expect(!wrapper.vm.varSwitch).toBeTruthy()
  })
  test('props-customClass', () => {
    const wrapper = mount(BeSwitch, {
      props: {
        customClass: 'customClass',
      },
    })
    const elm = wrapper.element as HTMLElement
    expect(elm.className.indexOf('customClass') > 0).toBeTruthy()
  })
  test('props-checkedValue-unCheckedValue', async () => {
    const wrapper = _mount({
      template: `
              <BeSwitch
                  :checkedValue="'checkedValue'"
                  :unCheckedValue="'unCheckedValue'"
                  v-model="varSwitch">
              </BeSwitch>`,
      setup() {
        const varSwitch = ref<string>('checkedValue')
        return {
          varSwitch,
        }
      },
    })
    await wrapper.find('.be-switch').trigger('click')
    expect(wrapper.vm.varSwitch === 'unCheckedValue').toBeTruthy()
    await wrapper.find('.be-switch').trigger('click')
    expect(wrapper.vm.varSwitch === 'checkedValue').toBeTruthy()
  })
})
describe('test-be-switch-slot', () => {
  test('slot-unCheckedRender', async () => {
    const wrapper = _mount({
      template: `
              <BeSwitch v-model="varSwitch">
              <template v-slot:unCheckedRender="slotProps">
                <span id="unChecked-test">unChecked</span>
              </template>
              </BeSwitch>`,
      setup() {
        const varSwitch = ref<boolean>(false)
        return {
          varSwitch,
        }
      },
    })
    const slot = await wrapper.find('#unChecked-test')
    expect(slot).toBeTruthy()
  })
  test('slots-checkedRender', async () => {
    const wrapper = _mount({
      template: `
              <BeSwitch v-model="varSwitch">
              <template v-slot:checkedRender="slotProps">
                <span id="checked-test">checked</span>
              </template>
              </BeSwitch>`,
      setup() {
        const varSwitch = ref<string>('checkedValue')
        return {
          varSwitch,
        }
      },
    })
    const slot = await wrapper.find('#checked-test')
    expect(slot).toBeTruthy()
  })
})
describe('test-be-switch-event', () => {
  const handleChange = jest.fn()
  const handleClick = jest.fn()
  test('event:click', async () => {
    const wrapper = _mount({
      template: `
              <BeSwitch @click="testClick" v-model="varSwitch"></BeSwitch>`,
      setup() {
        const varSwitch = ref<boolean>(false)
        const testClick = (): void => {
          handleClick()
        }
        return {
          varSwitch,
          testClick,
        }
      },
    })
    await wrapper.find('.be-switch').trigger('click')
    expect(handleClick).toBeCalled()
    expect(wrapper.vm.varSwitch).toBeTruthy()
  })
  test('event:change', async () => {
    const wrapper = _mount({
      template: `
              <BeSwitch @change="testChange" v-model="varSwitch"></BeSwitch>`,
      setup() {
        const varSwitch = ref<boolean>(false)
        const testChange = (): void => {
          handleChange()
        }
        return {
          varSwitch,
          testChange,
        }
      },
    })
    await wrapper.find('.be-switch').trigger('click')
    expect(handleChange).toBeCalled()
    expect(wrapper.vm.varSwitch).toBeTruthy()
  })
})
