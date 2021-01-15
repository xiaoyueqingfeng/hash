<template>
  <oa-panel class="increase-purchase">
    <section class="increase-purchase-info">
      <div class="increase-purchase-info__left">
        <oa-t3 class="mg-r16">
          <span>{{ titleInfo.name }}</span>
        </oa-t3>
        <div>
          <span>ID:</span>
          <span>{{ titleInfo.id }}</span>
        </div>
      </div>
      <div class="increase-purchase-info__right">
        <div class="mg-r16">
          <span>当前系统：</span>
          <span>{{ titleInfo.system_type_tip }}</span>
        </div>
        <div>
          <span>当前版本：</span>
          <span>{{ titleInfo.system_version_id_tip }}</span>
        </div>
      </div>
    </section>
    <div class="increase-purchase-tabs">
      <a-steps :current="currentStep">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div class="increase-purchase-tab-con">
      <div v-show="currentStep === 0">
        <step-one
          :sysInfo="stepOneInfo"
          @next-step="nextStep"
          @re-step="getStepformData"
        ></step-one>
      </div>
      <div v-show="currentStep === 1">
        <step-two
          :sysInfo="stepTwoInfo"
          @pre-step="preStep"
          @re-step="getStepformData"
          :loading="setIncreasePurchase$loading"
        ></step-two>
      </div>
    </div>
  </oa-panel>
</template>
<script>
import StepOne from './increase-purchase#step/step-one'
import StepTwo from './increase-purchase#step/step-two'
import { get, cloneDeep } from 'lodash-es'
import { getBuyMoreOptions, setBuyMore } from '@/api/software'
import { getModuleList } from '@/api/pay'
export default {
  data() {
    return {
      titleInfo: {},
      currentStep: 0,
      steps: [
        {
          title: '购买其他服务及赠送'
        },
        {
          title: '输入付费信息'
        }
      ],
      formData: {},
      leads_id: this.$route.query.leads_id,
      stepOneInfo: {},
      stepTwoInfo: {}
    }
  },
  components: {
    StepOne,
    StepTwo
  },
  async: {
    getModuleList(system_version_id) {
      return getModuleList({ version_id: system_version_id })
    },
    getBuyMoreOptions() {
      return getBuyMoreOptions({ leads_id: this.leads_id }).then(res => {
        this.stepOneInfo = {
          system_type: res.system_type,
          work_model_tip: res.work_model_tip,
          system_version: res.system_version,
          plugins: res.plugins
        }
        this.stepTwoInfo = {
          system_type: res.system_type,
          sales: res.sale
        }
        this.titleInfo = {
          id: res.id,
          name: res.name,
          system_type_tip: res.system_type_tip,
          system_version_id_tip: res.system_version_id_tip
        }

        if (res.system_type === '2') {
          this.getModuleList(res.system_version_id).then(moduleRes => {
            let moduleList = moduleRes || []
            this.stepOneInfo.moduleList = moduleList.map(item => {
              return {
                id: item.id,
                name: item.module_name
              }
            })
          })
        }
      })
    },
    setIncreasePurchase() {
      const leads_id = this.leads_id
      return setBuyMore({ ...cloneDeep(this.formData), leads_id }).then(res => {
        this.$router.push({
          name: 'customer-pay-list',
          query: { keywords: leads_id }
        })
      })
    }
  },
  mounted() {
    this.getBuyMoreOptions()
  },
  methods: {
    nextStep(step) {
      this.currentStep = step
    },
    preStep(step) {
      this.currentStep = step
    },
    getStepformData(stepData) {
      this.formData = { ...this.formData, ...stepData }

      if (this.currentStep === 1) {
        this.setIncreasePurchase()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.increase-purchase {
  &-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid @border-color;
    .pd(16px 80px 24px);
    &__left {
      display: flex;
      align-items: center;
    }
    &__right {
      display: flex;
    }
  }
  &-tabs {
    overflow: hidden;
    padding: 48px 186px;
  }
  &-tab-con {
    width: 750px;
    margin: 0 auto;
    padding-bottom: 40px;
  }
}
</style>
