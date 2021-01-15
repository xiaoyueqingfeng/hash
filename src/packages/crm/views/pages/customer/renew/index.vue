<template>
  <oa-panel class="renew" v-if="!getReNewOptions$loading" app>
    <a-spin v-if="setReNew$loading" />
    <section class="renew-brand-info">
      <div class="renew-brand-info__left">
        <oa-t3 class="mg-r16">
          <oa-tag type="work-model" :value="titleInfo.work_model"></oa-tag>
          <span>{{ titleInfo.name }}</span>
        </oa-t3>
        <div>
          <span class="lable">ID:</span>
          <span class="value">{{ titleInfo.id }}</span>
        </div>
      </div>
      <ul class="renew-brand-info__right">
        <li class="mg-r16">
          <span class="label">当前系统:</span>
          <span class="value">{{ titleInfo.system_type_tip }}</span>
        </li>
        <li>
          <span class="label">当前版本:</span>
          <span class="value">{{ titleInfo.system_version_id_tip }}</span>
        </li>
      </ul>
    </section>
    <div class="tabs">
      <a-steps :current="currentStep">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div class="tabCon">
      <div v-show="currentStep === 0" class="step_one">
        <StepOne
          :sysBaseInfo="stepOneProps"
          @skip="skipStep"
          @next-step="nextStep"
          @re-step="getSignStepForm"
        />
      </div>
      <div v-show="currentStep === 1" class="step_two">
        <StepTwo
          :sysInfo="stepTwoProps"
          @next-step="nextStep"
          @pre-step="preStep"
          @re-step="getSignStepForm"
        />
      </div>
      <div v-show="currentStep === 2" class="step_three">
        <StepThree
          :salesInfo="stepThreeProps"
          @pre-step="preStep"
          @re-step="getSignStepForm"
        />
      </div>
    </div>
  </oa-panel>
</template>
<script>
import StepOne from './renew#step/step-one'
import StepTwo from './renew#step/step-two'
import StepThree from './renew#step/step-three'
import { getReNewOptions, setReNew } from '@/api/pay'
import { get, cloneDeep } from 'lodash-es'
import { getModuleList } from '@/api/pay'
export default {
  name: 'ReSign',
  data() {
    return {
      currentStep: 0,
      stepOneProps: {
        shop_num: null,
        system_expired_days: null,
        system_expired_time: null
      },
      steps: [
        {
          title: '选择系统',
          content: '选择系统'
        },
        {
          title: '购买其他服务及赠送'
        },
        {
          title: '输入付费信息'
        }
      ],
      stepTwoProps: {
        work_model_tip: null,
        plugins: null,
        system_version: null,
        system_version_id: ''
      },
      titleInfo: {},
      stepThreeProps: {
        sales: null
      },
      form: [],
      isCanSubmit: true,
      system_type: null
    }
  },
  computed: {
    leads_id() {
      return this.$route.query.customer_id
    }
  },
  async: {
    getModuleList(version_id) {
      return getModuleList({ version_id: version_id })
    },
    setReNew() {
      if (!this.isCanSubmit) {
        return
      }
      this.isCanSubmit = false
      const leads_id = this.leads_id
      return setReNew({ ...cloneDeep(this.form), leads_id }).then(res => {
        this.isCanSubmit = true
        this.$router.push({
          name: 'customer-pay-list',
          query: { keywords: leads_id }
        })
      })
    },
    getReNewOptions() {
      let leads_id = this.leads_id
      return getReNewOptions({ leads_id }).then(res => {
        this.system_type = res.system_type
        let {
          shop_num,
          shop_list, // pro
          shop_info, // pro
          shop_choose_type_tips, // pro
          system_type,
          system_type_tips,
          system_expired_days,
          system_expired_time,
          work_model_tip,
          plugins,
          system_version,
          system_version_id
        } = res
        this.stepOneProps = {
          shop_num,
          shop_list,
          shop_info,
          shop_choose_type_tips,
          system_type,
          system_type_tips,
          system_expired_days,
          system_expired_time
        }

        this.stepTwoProps = {
          system_type,
          work_model_tip,
          plugins,
          system_version
        }

        this.stepThreeProps.sales = res.sale

        this.titleInfo = {
          id: res.id,
          name: res.name,
          work_model: res.work_model,
          system_type_tip: res.system_type_tip,
          system_version_id_tip: res.system_version_id_tip
        }
        if (system_type === 2) {
          this.getModuleList(system_version_id).then(moduleRes => {
            let moduleList = moduleRes || []
            this.stepTwoProps.moduleList = moduleList.map(item => {
              return {
                id: item.id,
                name: item.module_name
              }
            })
          })
        }
      })
    }
  },
  mounted() {
    this.getReNewOptions()
  },
  watch: {
    $route(newRoute) {
      this.getReNewOptions()
    }
  },
  methods: {
    skipStep(isSkip) {
      this.isSkip = isSkip
    },
    // 跳过
    nextStep(step) {
      this.currentStep = step
    },

    // 返回上一步
    preStep(step) {
      this.currentStep = step
    },

    // 获取每个步骤的表单数据
    getSignStepForm(stepForm) {
      this.form = { ...this.form, ...stepForm }
      this.form.is_buy_system = this.isSkip
      this.form.system_type = this.system_type
      // 第三部 提交表单
      if (this.currentStep === 2) {
        this.setReNew()
      }
    }
  },
  components: {
    StepOne,
    StepTwo,
    StepThree
  }
}
</script>
<style lang="less" scoped>
.renew-brand-info {
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .pd(16px 80px 24px 80px);
  &__left {
    display: flex;
    align-items: center;
  }
  &__right {
    display: flex;
  }
}
.renew {
  .tabs {
    overflow: hidden;
    padding: 48px 186px;
  }
  .tabCon {
    width: 750px;
    margin: 0 auto;
    padding-bottom: 40px;
  }
}
</style>
