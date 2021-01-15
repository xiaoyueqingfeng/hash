export const rules = vm => {
  return {
    bank_id: {
      initialValue: vm.account.bank_id
    },
    bank_user_name: {
      initialValue: vm.account.bank_user_name
    },
    bank_subbranch_name: {
      initialValue: vm.account.bank_subbranch_name
    },
    bank_card_number: {
      initialValue: vm.account.bank_card_number
    }
  }
}
