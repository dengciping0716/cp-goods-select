<template>
  <scroll-view class="cp-goods-select-category" :style="{'height':height}" :scroll-y="true" :scroll-top="scrollTop"
    :scroll-with-animation="false">
    <view class="cp-goods-select-category__wrap">
      <view id="top-anchor"></view>
      <slot>
        <template v-for="(category,index) in options">
          <cp-goods-category-item :category="category" :key="index"></cp-goods-category-item>
        </template>
      </slot>
      <view class="" style="margin-bottom: 200rpx;"></view>
    </view>
    <view class="cp-goods-select-category__actions">
      <!-- 菜单底部插槽 -->
      <slot name="bottom"></slot>
    </view>
  </scroll-view>
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
    name: "cp-goods-select-category",
    inject: ['goodsSelect'],
    provide() {
      return {
        categoryControl: this
      };
    },
    mixins: [scorll],
    props: {
      "value": [String, Number],
      "props": Object,
    },
    data() {
      return {};
    },
    computed: {
      height() {
        return this.goodsSelect ? this.goodsSelect.height : '80vh'
      },
      valueKey() {
        let key = this.props?.value || this.goodsSelect?.props?.value || 'value'
        return key
      },
      labelKey() {
        let key = this.props?.label || this.goodsSelect?.props?.label || 'label'
        return key
      },
      childrenKey() {
        let key = this.props?.children || this.goodsSelect?.props?.children || 'children'
        return key
      },
      options() {
        return this.goodsSelect?.options || [];
      },
    },
    watch: {
      "options": {
        immediate: true,
        async handler(v) {
          if (!v?.length) return;
          await this.$nextTick();
          this.initScrollTop(this.goodsSelect?._scrollDataCategroy, ".cp-goods-select-category__wrap")
        }
      },

    },
    async mounted() {
      await this.$nextTick()
      this.goodsSelect.$on('set-category-scrollTop', async (categoryId, instance) => {
        if (this.value == categoryId) return
        this.scrollTo(categoryId)
      })
    },
    methods: {
      onSelected(v) {
        this.$emit('input', v[this.valueKey] || '')
        this.$emit('change', v)
      },
      scrollTo(categoryId) {
        let p = this.goodsSelect?._scrollDataCategroy.find(row => row.key == categoryId)
        if (!p?._rect) return

        let top = p._rect[0] || 0
        this.setScrollTop(top - this.goodsSelect?._height / 2)
      },
    }
  }
</script>

<style lang="scss">
  @import '../cp-goods-select/cp-goods-select.scss';
</style>