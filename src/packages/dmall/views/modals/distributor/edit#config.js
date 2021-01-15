export const rules = vm => {
  const level = vm.distributor.level || 0
  return {
    level: {
      initialValue: level
    },
    remark: {
      initialValue: vm.distributor.remark
    },
    valid_to: {
      initialValue:
        vm.distributor.valid_to === '-'
          ? moment()
          : moment(vm.distributor.valid_to)
    }
  }
}
