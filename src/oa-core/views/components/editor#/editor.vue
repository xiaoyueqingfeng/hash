<template>
  <textarea :class="editorId"></textarea>
</template>

<script>
import { ossService } from 'oa-core/utils/oss.service'
import { OA } from 'oa-core/constants/oss'
import EditorImage from './editor-image'
import Vue from 'vue'

// 组件监听事件
const editorEvents = [
  'activate',
  'addUndo',
  'beforeAddUndo',
  'beforeExecCommand',
  'beforeGetContent',
  'beforeRenderUI',
  'beforeSetContent',
  'beforePaste',
  'blur',
  'change',
  'clearUndos',
  'click',
  'contextMenu',
  'copy',
  'cut',
  'dblclick',
  'deactivate',
  'dirty',
  'drag',
  'dragDrop',
  'dragEnd',
  'dragGesture',
  'dragOver',
  'drop',
  'execCommand',
  'focus',
  'focusIn',
  'focusOut',
  'getContent',
  'hide',
  'init',
  'keyDown',
  'keyPress',
  'keyUp',
  'loadContent',
  'mouseDown',
  'mouseEnter',
  'mouseLeave',
  'mouseMove',
  'mouseOut',
  'mouseOver',
  'mouseUp',
  'nodeChange',
  'objectResizeStart',
  'objectResized',
  'objectSelected',
  'paste',
  'postProcess',
  'postRender',
  'preProcess',
  'progressState',
  'redo',
  'remove',
  'reset',
  'saveContent',
  'selectionChange',
  'setAttrib',
  'setContent',
  'show',
  'submit',
  'undo',
  'visualAid'
]

export default {
  name: 'StEditor',
  props: {
    value: {
      type: String
    },
    serviceType: {
      type: String,
      default: OA
    }
  },
  computed: {
    selector() {
      return '.' + this.editorId
    },
    editorId() {
      return 'st-editor-' + this._uid
    }
  },
  watch: {},
  methods: {
    onChangeGetFile({ image, editor }) {
      editor.insertContent(`<img src="${image.url}" width='100%'><p></p>`)
      this.$emit('ready', editor)
    },
    isJs(src) {
      return src.indexOf('.js') > -1
    },
    loadJs(src) {
      const s = document.createElement('script')
      console.log(process.env.BASE_URL)
      const url = process.env.BASE_URL + src
      if (document.querySelector(`script[src='${url}']`)) {
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
        s.src = url
        document.head.appendChild(s)
        s.onload = () => {
          resolve()
        }
        s.onerror = err => {
          reject(err)
        }
      })
    },
    dyamicLoad(srcs) {
      const tasks = []
      srcs.forEach(src => {
        if (this.isJs(src)) {
          tasks.push(this.loadJs(src))
        }
      })
      return Promise.all(tasks)
    }
  },
  mounted() {
    console.log('mounted')
    this.dyamicLoad(['tinymce/5.0.8/tinymce.min.js'])
      .then(() => this.dyamicLoad(['tinymce/5.0.8/themes/silver/theme.min.js']))
      .then(() => {
        const vm = this
        window.tinyMCE.init({
          selector: vm.selector,
          // target: this.$el,
          language: 'zh_CN',
          // 右键菜单
          contextmenu: ['paste'],
          // 隐藏右下角技术支持
          branding: false,
          // 隐藏底栏的元素路径
          elementpath: false,
          menubar: false,
          body_class: 'oa-editor',
          plugins: ['link', 'autoresize'],
          autoresize_bottom_margin: 50,
          toolbar:
            'undo redo | styleselect bold italic forecolor backcolor | bullist numlist | alignleft aligncenter alignright  | image link',
          language_url: process.env.BASE_URL + 'zh_CN.js',
          setup(editor) {
            editor.on('change keyup undo redo', value => {
              const currentContent = editor.getContent()
              console.log('currentContent', currentContent)

              vm.$emit('input', currentContent)
              vm.$emit('change', currentContent)
            })
            // editorEvents.forEach(key => {
            //   if (vm.$listeners[key]) {
            //     editor.on(key, e => {
            //       vm.$emit(key, e, editor)
            //     })
            //   }
            // })
          },
          init_instance_callback(editor) {
            const editorToolbarEl = document.querySelector(
              vm.selector + '~.tox' + ' .tox-toolbar'
            )

            console.log(editorToolbarEl)
            let ele = document.createElement('div')
            editorToolbarEl.appendChild(ele)
            new Vue({
              components: {
                EditorImage
              },
              render: h => (
                <editor-image
                  editor={editor}
                  serviceType={this.serviceType}
                  onChange={vm.onChangeGetFile}
                />
              )
            }).$mount(ele)
            editor.setContent(vm.value)
            vm.$emit('ready', editor)
          }
        })
      })
  },
  destroyed() {
    console.log(this.editor)
    window.tinyMCE.remove()
  }
}
</script>
