<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f18">订单确认</h1>
      <img src="~/assets/img/cart_setp2.png" class="fr">
      <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
      <table class="GoodList">
        <tbody>
          <tr>
            <th class="name">商品</th>
            <th class="price">原价</th>
            <th class="priceNew">价格</th>
          </tr>
        </tbody>
        <tbody>
          <!-- <tr>
          <td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td>
        </tr> -->
          <tr>
            <td colspan="3" class="teacher">讲师：{{order.teacher_name}}</td>
          </tr>
          <tr class="good">
            <td class="name First">
              <a target="_blank" :href="'https://localhost:3000/course/'+order.course_id">
                <img :src="order.course_cover"></a>
              <div class="goodInfo">
                <input type="hidden" class="ids ids_14502" value="14502">
                <a target="_blank" :href="'https://localhost:3000/course/'+ order.course_id">{{order.course_title}}</a>
              </div>
            </td>
            <td class="price">
              <p>￥<strong>{{order.total_fee}}</strong></p>
              <!-- <span class="discName red">限时8折</span> -->
            </td>
            <td class="red priceNew Last">￥<strong>{{order.total_fee}}</strong></td>
          </tr>
          <tr>
            <td class="Billing tr" colspan="3">
              <div class="tr">
                <p>共 <strong class="red">1</strong> 件商品，合计<span
                    class="red f20">￥<strong>{{order.total_fee}}</strong></span></p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="Finish">
        <div class="fr" id="AgreeDiv">

          <label for="Agree">
            <p class="on"><input type="checkbox" checked="checked">我已阅读并同意<a href="javascript:"
                target="_blank">《购买协议》</a></p>
          </label>
        </div>
        <div class="clear"></div>
        <div class="Main fl">
          <div class="fl">
            <a :href="'/course/'+order.course_id">返回课程详情页</a>
          </div>
          <div class="fr">
            <p>共 <strong class="red">1</strong> 件商品，合计<span class="red f20">￥<strong
                  id="AllPrice">{{order.total_fee}}</strong></span></p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore">
        <button class="fr redb" type="button" id="submitPay" @click="toPay()">去支付</button>
        <div class="clear"></div>
      </div>
    </form>
  </div>
</template>
<script>
import orders from "@/api/orders";
export default {
  data() {
    return {
      payVo: {
        out_trade_no: "",
        subject: "",
        total_amount: "",
        body: ""
      }
    };
  },
  asyncData({ params, error }) {
    return orders.getOrdersInfo(params.oid).then(res => {
      return {
        order: res.data.order
      };
    });
  },
  methods: {
    toPay() {
       console.log(this.order.order_no);
      this.payVo.out_trade_no = this.order.order_no;
      this.payVo.subject = this.order.course_title
      this.payVo.total_amount = this.order.total_fee
        //去支付
        //  this.$router.push({path:'/pay/'+this.order.order_no})
        orders.toAlipay(this.payVo).then(res => {
          console.log(res.data.s)
          document.querySelector("body").innerHTML = res.data.s; //查找到当前页面的body，将后台返回的form替换掉他的内容
          document.forms[0].submit(); //执行submit表单提交，让页面重定向，跳转到支付宝页面
        });
    }
  }
};
</script>
