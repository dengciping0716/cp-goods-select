<template>
  <view id='scroll-item' class="scroll-item  cp-goods-select-category-item " :class="{'actived': actived }"
    @click.stop="handelClick()">
    <!-- 菜单项插槽 -->
    <slot>
      {{label}}
    </slot>
  </view>
</template>

<script>
  export default {
    isScrollItem: true,
    name: 'cp-goods-select-category-item',
    options: {
      // 微信小程序中 options 选项
      multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用
      styleIsolation: "shared", //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
      virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
    },
    inject: ['goodsSelect', 'categoryControl'],
    props: {
      category: {
        type: Object,
        required: true
      }
    },
    data: () => ({

    }),
    computed: {
      actived() {
        return this.goodsSelect?.currentCategory == this.value
      },
      value() {
        let key = this.props?.value || this.goodsSelect?.props?.value || 'value'
        return this.category[key]
      },
      label() {
        let key = this.props?.label || this.goodsSelect?.props?.label || 'label'
        return this.category[key] || '未知'
      },
    },
    methods: {
      async handelClick() {
        this.goodsSelect?.changeCategroy(this.category)
        this.categoryControl?.onSelected(this.category)
      },
    }
  }
</script>

<style lang="scss">
  @import '../cp-goods-select/cp-goods-select.scss';
</style>