<template> 
  <div>
  <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper"> 
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index" :class="{current: index===currentIndex}"> 
            <h1 class="title">{{good.name}}</h1> 
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index"
              @click="showFood(food)"> 
                <div class="icon"> 
                  <img width="57" height="57" 
                      :src="food.icon"> 
                </div> 
                <div class="content"> 
                  <h2 class="name">{{food.name}}</h2> 
                  <p class="desc">{{food.description}}</p> 
                  <div class="extra"> 
                    <span class="count">月售 {{food.sellCount}} 份</span> 
                    <span>好评率 {{food.rating}}%</span>
                  </div> 
                  <div class="price"> 
                    <span class="now">￥{{food.price}}</span> 
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span> 
                  </div> 
                  <div class="cartcontrol-wrapper"> 
                     <cart-control :food="food"/>
                  </div> 
                </div> 
              </li> 
            </ul> 
          </li> 
        </ul> 
        </li> 
      </ul> 
    </div> 
    <shop-cart/>
  </div> 
  <Food :food="food" ref="Food"/>
  </div>
</template>

<script>
import ShopCart from '../../../components/ShopCart/ShopCart'
import CartControl from '../../../components/CartControl/CartControl'
import Food from '../../../components/Food/Food'
import BScroll from 'better-scroll'
import {mapState} from 'vuex'
export default {
  name: 'SHopGoods',
  components: {
    CartControl,
    Food,
    ShopCart
  },
  data() {
    return {
      scrollY:0 ,//滚动的y值
      tops:[],//各个li距离顶部的值
      food:{} //要显示的food
    }
  },
  mounted () {
    this.$store.dispatch('getShopGoods',() => {//数据更新后执行，用来给better-scroll的外部包裹容器
      this.$nextTick(() => {
        this._initscroll();
        this._initTop()
      }) 
    })
  },
  computed: {
    ...mapState(['goods']),
  
  //计算正在点击的下标
    currentIndex() {
      //收集关联数据
      const {scrollY, tops} = this
      //根据条件计算产生一个下标值
       const index = tops.findIndex((top, index) => {
          // scrollY>=当前top && scrollY<下一个top
          return scrollY >= top && scrollY < tops[index + 1]
      })

      //返回当前下标
      return index
    }
  },
  methods: {
    _initscroll() {
      new BScroll('.menu-wrapper')
         this.foodScroll = new BScroll('.foods-wrapper', {
           probeType:2
         })

          //给右侧列表绑定scroll监听
        this.foodScroll.on('scroll', ({x,y}) => {
          //console.log(x,y);
          this.scrollY = Math.abs(y)
        })
        this.foodScroll.on('scrollEnd', ({x,y}) => {
          //console.log(x,y);
          this.scrollY = Math.abs(y)
        })
    },
    //收集Tops
    _initTop() {
       // 1. 初始化tops
        const tops = []
        let top = 0
        tops.push(top)
        // 2. 收集
        // 找到所有分类的li
        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
        //伪数组变为真数组：Array.prototype.slice.call(lis)
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })

        // 3. 更新数据
        this.tops = tops
        console.log(this.tops)
    },
    clickMenuItem(index) {
      //console.log(index)
      // 使用右侧列表滑动到对应的位置

      // 得到目标位置的y
      const y = this.tops[index]
      //更新scrollY的值(让点击的分类项成为当前分类)
      this.scrollY = -y
      //右侧列表平滑滚动到目标位置
      this.foodScroll.scrollTo(0, -y, 300)

    },
    showFood(food) {
      //更新food
      this.food = food 
      //显示food组件
      this.$refs.Food.toggleShow();
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
