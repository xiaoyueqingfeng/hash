import { forEach } from 'lodash-es'

export class FormBuilder {
  constructor(_setupConfig = {}) {
    this._setupConfig = _setupConfig
  }
  get labels() {
    const _labels = {}
    forEach(this._setupConfig, (config, k) => {
      _labels[k] = config.label
    })
    return _labels
  }
  get decorators() {
    let _decorators = []
    forEach(this._setupConfig, (config, k) => {
      const rules = (config.rules || []).map(rule => {
        if (rule.required) {
          return {
            required: true,
            message: (rule.message || `{label}必填`).replace(
              '{label}',
              config.label || ''
            )
          }
        }
      })
      _decorators.push([k, { rules }])
    })
    return _decorators
  }
  get placehoders() {
    let _placehoders = {}
    forEach(this._setupConfig, (config, k) => {
      _placehoders[k] = (config.placehoder || `请输入{label}`).replace(
        '{label}',
        config.label || ''
      )
    })
    return _placehoders
  }
}
