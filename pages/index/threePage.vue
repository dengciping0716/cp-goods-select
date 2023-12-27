<template>
  <view class="content">
    <view style="height: 100upx;"></view>
    <cp-goods-select height="90vh" :options="list" :props="{label:'label',value:'value',children:'children'}"
      @scrolltolower="handelScrolltolower" @category-change="handelCategoryChange">
      <view v-for="(item,index) in goods" :key="index" :category="item.label">
        <view class="goods__item ">
          {{ item.label}}
        </view>
      </view>
    </cp-goods-select>
  </view>
</template>

<script>
  // import cpGoodsSelect from '@/uni_modules/cp-goods-select/components/cp-goods-select/cp-goods-select'
  export default {
    // components:{cpGoodsSelect},
    data() {
      return {
        title: 'Hello',
        list: [],
        goods: []
      }
    },
    onLoad() {
      this.list = this.initList()
      this.handelCategoryChange(this.list[0])
    },
    methods: {
      initList() {
        let result = []
        let i = 0
        while (++i < 20) {
          let children = []
          let j = 0
          while (++j < 10) {
            children.push({
              label: '商品' + j,
              value: j,
            })
          }
          result.push({
            label: '分类' + i,
            value: i,
            children: children
          })
        }
        return result
      },
      handelScrolltolower(e) {
        console.log('handelScrolltolower', e)
      },
      handelCategoryChange(e) {
        console.log('handelCategoryChange', e)
        let goods = [],
          j = 0;
        while (++j < 10) {
          goods.push({
            label: e.label + ': 商品' + j,
            value: j,
          })
        }
        this.goods = goods
      }
    }
  }
</script>

<style lang="scss">
  //小程序需要实现商品样式
  .cp-goods-select-goods__item {
    padding: 30upx;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 4px;
    font-size: 14px;
    color: #262626;
    margin-bottom: 10upx;

    .sub-info {
      font-size: 12px;
      color: #84898f;
    }
  }
</style>
<style>
  .content {
    background-color: #eceff5;
    height: 100%;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }

  .item {
    padding: 10upx 30upx;
    background-color: #fff;
    margin: 0 10upx;
    margin-bottom: 10upx;
  }

  .num {
    border-radius: 50%;
    background-color: #ff0099;
    color: #fff;
    display: inline-block;
    width: 30upx;
    height: 30upx;
    line-height: 30upx;
    text-align: center;
    padding: 2px;
    position: absolute;
    top: 4px;
  }
</style>