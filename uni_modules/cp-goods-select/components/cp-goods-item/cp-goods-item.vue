<template>
  <view id="scroll-item" class="scroll-item">
    <view class="cp-goods-select-goods__classify">
      <slot name="category">
        <text class="cp-goods-select-goods__classify_text">{{category}}</text>
      </slot>
    </view>
    <view class="cp-goods-select-goods__list" :class="[customClass]">
      <slot></slot>
    </view>
  </view>
</template>

<script>
  import scorll from '../scroll-mixin.js'
  export default {
    isScrollItem: true,
    name:'cp-goods-item',
    options: {
      // 微信小程序中 options 选项
      multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用
      styleIsolation: "shared", //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
      addGlobalClass: true, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
      virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
    },
    mixins: [scorll],
    inject: ['goodsSelect'],
    props: {
      category: String,
      "customClass": String,
    },
    data: () => ({

    }),
    computed: {},
    methods: {}
  }
</script>

<style lang="scss">
  @import '../cp-goods-select/cp-goods-select.scss';
</style>