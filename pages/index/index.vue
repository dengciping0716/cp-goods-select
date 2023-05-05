<template>
    <view class="content">
        <view class="page-body">
            <view class="btn-area">
                <navigator url="/pages/index/basePage" hover-class="navigator-hover">
                    <button type="default">基础使用</button>
                </navigator>
                <navigator url="/pages/index/customPage" hover-class="navigator-hover">
                    <button type="default">自定义分类</button>
                </navigator>
                <navigator url="/pages/index/threePage" hover-class="navigator-hover">
                    <button type="default">单独列表</button>
                </navigator>
            </view>
        </view>
    </view>
</template>

<script>
    // import cpGoodsSelect from '@/uni_modules/cp-goods-select/components/cp-goods-select/cp-goods-select'
    export default {
        // components:{cpGoodsSelect},
        data() {
            return {

            }
        },
        onLoad() {

        },
        methods: {

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