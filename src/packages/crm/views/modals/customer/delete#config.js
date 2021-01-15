export const decorators = vm => ({
  reason: [
    'reason',
    {
      rules: [
        { required: true, message: '请输入删除原因！' },
        {
          max: 30,
          transform: value => value.trim(),
          message: '不能超过30个字！'
        }
      ],
      initialValue: ''
    }
  ]
})
