<template>
  <view class="cp-goods-select" :style="{height}" :class="customClass">
    <slot name="category">
      <cp-goods-select-category></cp-goods-select-category>
    </slot>
    <view class="cp-goods-select_wrap">
      <scroll-view class="cp-goods-select-goods" :style="{'height':height}" @scroll="handleScroll"
        @scrolltolower="$emit('scrolltolower' , $event)" :scroll-top="scrollTop" :scroll-with-animation="false"
        :scroll-y="true">

        <view class="cp-goods-select-goods__wrap">
          <view id="top-anchor"></view>
          <!-- 列表插槽 -->
          <slot></slot>
        </view>
        <view class="cp-goods-select-goods__placeholder" :style="{'padding-bottom':(height/2)+'px'}"></view>
      </scroll-view>
    </view>

  </view>
</template>

<script>
  import scorll from '../scroll-mixin.js'

  export default {
    options: {
      // 微信小程序中 options 选项
      multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用
      styleIsolation: "apply-shared", //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
      addGlobalClass: true, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
      virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
    },
    name: "cp-goods-select",
    components: {},
    mixins: [scorll],
    provide() {
      return {
        goodsSelect: this
      };
    },
    props: {
      customClass: String,
      "height": {
        type: String,
        default: "500upx"
      },
      "props": {
        type: Object,
        default: function() {
          return { label: 'label', value: 'value', children: 'children', }
        }
      },
      "options": Array,
    },
    data() {
      return {
        currentCategory: ''
      };
    },

    watch: {
      "options": {
        immediate: true,
        async handler(v) {
          if (!v?.length) return;

          if (!this.currentCategory) {
            this.currentCategory = v[0][this.props?.value || 'value']
          }

          let list = v.map(item => {
            let key = item[this.props?.value || 'value']
            return { key: key }
          })
          this._scrollDataGoods = JSON.parse(JSON.stringify(list))
          this._scrollDataCategroy = list

          await this.$nextTick()
          this.initScrollTop(this._scrollDataGoods, ".cp-goods-select-goods__wrap")
        }
      }
    },

    methods: {
      scrollTo(categoryId) {
        let p = this._scrollDataGoods?.find(row => row.key == categoryId)
        if (!p?._rect) return

        let top = p._rect[0] || 0
        this.setScrollTop(top)
      },
      async changeCategroy(category) {
        let value = category[this.props?.value || 'value']
        if (value != this.currentCategory) {
          this._no_scroll = true //点击分类不要在触发滚动之后的计算
          setTimeout(() => this._no_scroll = false, 1000)

          this.scrollTo(value)
          this.currentCategory = value
          this.$emit('category-change', category)
        }
      },
      setCurrentCategory(value) {
        let category = this.options.find(row => row[this.props?.value || 'value'] == value)
        if (!category) return
        this.currentCategory = value
        this.$emit('category-change', category)
      },
      //计算当前应该是哪个分类
      computeCategory(topWatcher) {
        if (this._no_scroll) return
        let options = this._scrollDataGoods
        for (var i = 0; i < options.length; i++) {
          let element = options[i]
          if (!element._rect) return
          let top = element._rect[0],
            bottom = element._rect[1]
          /* 正常事件 */
          if (topWatcher >= top && topWatcher < bottom) {
            return element.key
          };
        }
      },
      /* 商品<scroll-view> 滑动事件*/
      handleScroll({ target }) {
        clearTimeout(this._id)
        this._id = setTimeout(() => {
          let c_id = this.computeCategory(target.scrollTop)
          if (!c_id) return
          if (c_id != this.currentCategory) {
            this.$emit('set-category-scrollTop', c_id)
            this.setCurrentCategory(c_id)
          }
        }, 100);
      },
    },
    mounted() {
      const query = uni.createSelectorQuery().in(this);
      query.select(".cp-goods-select").boundingClientRect(data => {
        this._height = data.height
      }).exec();
    }
  }
</script>

<style lang="scss">
  @import './cp-goods-select.scss';
</style>