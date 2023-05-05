export default {

    data() {
        return {
            // 设置滑动的距离
            scrollTop: 0,
        }
    },
    methods: {
        /* 获取元素Rect*/
        boundingClientRectAsync(nodesRef) {
            return new Promise((resolve, reject) => {
                try {
                    nodesRef.boundingClientRect(data => resolve(data)).exec();
                } catch (e) {
                    reject(e)
                }
            })
        },
        // #ifdef MP-ALIPAY
        async initScrollTop(options, selectorStr) {
            //滑动容器距离viewport高度
            const nodeRef = uni.createSelectorQuery().in(this).select(selectorStr + " #top-anchor")
            const { top = 0 } = await this.boundingClientRectAsync(nodeRef);
            const _scrollViewTop = top
            //计算分类区间
            let i = 0;
            let j = 0;
            const scrollItemRefs = uni.createSelectorQuery().selectAll(selectorStr + " #scroll-item")
            const rects = await this.boundingClientRectAsync(scrollItemRefs);
            console.log(111, selectorStr, top, rects)
            for (; i < rects?.length; i++) {
                const data = rects[i]
                let top = data.top - _scrollViewTop,
                    bottom = top + data.height;
                options[j++]._rect = [top, bottom]
            }
        },
        // #endif
        // #ifdef MP-WEIXIN||MP-QQ||MP-JD||MP-BAIDU||MP-360
        async initScrollTop(options, selectorStr) {
            let comp = uni.createSelectorQuery().in(this).select(selectorStr)._component
            //滑动容器距离viewport高度
            const query = uni.createSelectorQuery().in(comp || this);
            const { top = 0 } = await this.boundingClientRectAsync(query.select("#top-anchor"));
            const _scrollViewTop = top
            //计算分类区间
            let i = 0;
            let j = 0;
            let components = comp.$children
            for (; i < components.length; i++) {
                const node = uni.createSelectorQuery().in(components[i]).select("#scroll-item")
                const data = await this.boundingClientRectAsync(node)
                if (!data) continue;

                let top = data.top - _scrollViewTop,
                    bottom = top + data.height;
                options[j++]._rect = [top, bottom]
            }
        },
        // #endif
        // #ifdef H5 || APP-VUE || QUICKAPP-WEBVIEW
        async initScrollTop(options, selectorStr) {
            //滑动容器距离viewport高度
            const query = uni.createSelectorQuery().in(this);
            const { top = 0 } = await this.boundingClientRectAsync(query.select(selectorStr + " #top-anchor"));
            const _scrollViewTop = top
            //计算分类区间
            let i = 0;
            let j = 0;
            const rects = await this.boundingClientRectAsync(query.selectAll(selectorStr + " #scroll-item"))
            for (; i < rects?.length; i++) {
                const data = rects[i]
                let top = data.top - _scrollViewTop,
                    bottom = top + data.height;
                options[j++]._rect = [top, bottom]
            }
        },
        // #endif
        setScrollTop(target = 0) {
            this.scrollTop = target - 1;
            this.$nextTick(() => this.scrollTop = target);
        },
    }
}