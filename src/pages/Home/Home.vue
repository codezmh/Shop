<template>
  <section class="home">
    <!--首页头部-->
    <nav-bar>
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
       <span class="header_title" slot="center">
        <span class="header_title_text ellipsis">{{address.name}}</span>
      </span>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo' : '/login'">
        <span class="header_login_text" v-if="userInfo._id">
          <i class="iconfont icon-person"></i>
        </span>
        <span class="header_login_text" v-else>登录|注册</span>
      </router-link>
    </nav-bar>
    <!--首页导航-->
    <nav class="msite_nav">
      <swiper ref="mySwiper" :options ="swiperOptions" v-if="categorys.length">
          <swiper-slide class="swiper-slide"  v-for="(categorys, index) in categorysArr" :key="index">
            <div class="link_to_food" v-for="(category, indey) in categorys" :key="indey">
              <div class="food_container">
                <img :src="baseUrl + category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </div>
          </swiper-slide>
        <!-- Add Pagination -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
       <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list/>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import NavBar from '../../components/navbar/NavBar'
import ShopList from '../../components/shoplist/ShopLIst'
import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
  name: "Home",
  components: {
    NavBar,
    ShopList,
  },
  data() {
    return {
     swiperOptions: {
        loop:true, //实现循环轮播
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          progressbarOpposite: true, //使进度条分页器与Swiper的direction参数相反
          bulletElement : 'li', //设定分页器指示器（小点）的HTML标签。
        },
        observer:true,
        autoplay: {
          delay: 3000, //自动切换的时间间隔，单位ms
          disableOnInteraction: true, //用户操作swiper之后，是否禁止autoplay。
          reverseDirection: true, //开启反向自动轮播。
        }
      },
     baseUrl:'http://fuss10.elemecdn.com'
    }
  },
  computed: {
    ...mapState(['address','categorys','userInfo']),

    //根据categorys一维数组生成一个categorysArr二维数组,小数组的最大元数个数为8
    categorysArr() {
      const {categorys} = this
      //定义一个空的二维数组
      const arr = []
      //定义一个放在二维数组中的小数组变量
      let minArr = []
      //遍历categorys
      categorys.forEach(cate => {

        //判断小数组的长度是否等于8,如果等于重新生成一个新的小数组
        if(minArr.length === 8) {
          minArr =[]
        }
        //如果minArr是空的,将小数组放在大数组中arr
         if(minArr.length === 0) {
          arr.push(minArr)
        }
        //将当前分类保存到小数组中,保证小数组没有满以及关联到到大数组了
        minArr.push(cate)
      })
      return arr
    },
    swiper() {
        return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  watch: {
      categorys (value) { // categorys数组中有数据了, 在异步更新界面之前执行

        // 界面更新就立即创建Swiper对象
        this.$nextTick(() => {// 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
          // 创建一个Swiper实例对象, 来实现轮播
            //创建一个Swiper实例对象
            this.swiper.slideTo(3, 1000, false)
        })
    }
  },
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.home { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
