<template>
  <oa-panel class="new-sign-brand" app>
    <section class="new-sign-brand-info">
      <oa-t3 class="title">
        <oa-tag type="work-model" :value="workModel" class="mg-r8"></oa-tag>
        {{ titleInfo.name }}
      </oa-t3>
      <div class="mg-l8">
        <span>ID: {{ titleInfo.id }}</span>
      </div>
    </section>

    <div class="new-sign-brand-tabs">
      <a-steps :current="currentStep">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>

    <div class="new-sign-brand-tab-con">
      <div v-show="currentStep === 0">
        <step-one
          :version="version"
          @next-step="nextStep"
          @sign-step="getSignStepForm"
        />
      </div>
      <div v-show="currentStep === 1">
        <step-two
          :plugins="plugins"
          :system_type="system_type"
          :version_id="version_id"
          @next-step="nextStep"
          @pre-step="preStep"
          @sign-step="getSignStepForm"
        />
      </div>
      <div v-show="currentStep === 2">
        <step-three
          :isBindBrand="isBindBrand"
          :sales="salesOpt"
          @pre-step="preStep"
          @sign-step="getSignStepForm"
        />
      </div>
    </div>
  </oa-panel>
</template>

<script>
import StepOne from './new-sign#step/step-one'
import StepTwo from './new-sign#step/step-two'
import StepThree from './new-sign#step/step-three'
import { getNewSignOptions, setNewSign } from '@/api/potential'
import { cloneDeep } from 'lodash-es'

// saas 版本 1.0 和 2.0

export default {
  name: 'NewSign',
  data() {
    return {
      // 初始化步骤为1
      currentStep: 0,
      version: [],
      plugins: [],
      salesOpt: {
        sale: [],
        contact: [],
        default_sale_id: ''
      },
      titleInfo: {},
      steps: [
        {
          title: '选择系统'
        },
        {
          title: '购买其他服务及赠送'
        },
        {
          title: '输入付费信息'
        }
      ],
      workModel: '',
      isBindBrand: '',
      form: {},
      isCanSubmit: true,
      version_id: null,
      system_type: this.$route.query.system_type
    }
  },
  mounted() {
    this.getNewSignOptions()
  },
  watch: {
    $route(newRoute) {
      this.getNewSignOptions()
    }
  },
  async: {
    // 获取页面初始化数据
    getNewSignOptions() {
      let query = {
        leads_id: this.$route.query.customer_id,
        system_type: this.$route.query.system_type
      }
      return getNewSignOptions(query).then(res => {
        this.version = res.system_version
        this.plugins = res.plugins

        this.salesOpt.sale = res.sale
        this.salesOpt.contact = res.contact
        this.salesOpt.default_sale_id = res.default_sale_id

        this.isBindBrand = res.is_need_bind_brand
        this.workModel = res.work_model
        this.titleInfo = {
          id: res.id,
          name: res.name
        }
      })
    },

    // 提交表单
    setNewSign() {
      if (!this.isCanSubmit) {
        return
      }
      this.isCanSubmit = false
      const leads_id = this.$route.query.customer_id
      const system_type = this.$route.query.system_type
      return setNewSign({ ...cloneDeep(this.form), leads_id, system_type })
        .then(res => {
          this.$router.push({
            name: 'customer-pay-list',
            query: { keywords: leads_id }
          })
          this.isCanSubmit = true
        })
        .catch(() => {
          this.isCanSubmit = true
        })
    }
  },
  methods: {
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

      // 第一步选择版本
      if (this.currentStep === 0) {
        this.version_id = stepForm.system_version_id
      }
      // 第三部 提交表单
      if (this.currentStep === 2) {
        this.setNewSign()
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
.new-sign-brand {
  background: white;
  &-info {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    padding: 26px 186px;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
    }
  }
  &-tabs {
    padding: 48px 186px;
  }
  &-tab-con {
    width: 750px;
    margin: 0 auto;
    padding-bottom: 40px;
  }
}
</style>
