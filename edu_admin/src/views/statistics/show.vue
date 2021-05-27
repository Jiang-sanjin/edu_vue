<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-date-picker v-model="searchObj.begin" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchObj.end" type="date" placeholder="选择截止日期" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button :disabled="btnDisabled" type="primary" icon="el-icon-search" @click="showChart()">查询</el-button>
    </el-form>
    <div class="chart-container">
      <div id="chart" class="chart" style="height:500px;width:100%" />
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import statistics from "@/api/edu/statistics";

export default {
  data() {
    return {
      searchObj: {
        begin: "",
        end: ""
      },
      btnDisabled: false,
      chart: null,
      title: "",
      xData: [],
      register_num: [],
      login_num: [],
      video_view_num: [],
      course_num: []
    };
  },
  created() {
    this.nowDate();
  },
  methods: {
    nowDate() {
      //获取当前日期和当前日期的前一周
      this.addDate(0), (this.searchObj.end = this.addDate(0));
      this.searchObj.begin = this.addDate(-7);
      //调用图表的方法
      this.showChart();
    },

    addDate(now) {
      const nowDate = new Date();
      var targetday = nowDate.getTime() + 1000 * 60 * 60 * 24 * now;
      nowDate.setTime(targetday);
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      };
      const newmonth = date.month > 10 ? date.month : "0" + date.month;
      const day = date.date > 10 ? date.date : "0" + date.date;
      return date.year + "-" + newmonth + "-" + day;
    },
    showChart() {
      //调用接口的方法

      statistics.showDataEcharts(this.searchObj).then(response => {
        this.xData = response.data.calculatedList;
        this.register_num = response.data.register_num;
        this.login_num = response.data.login_num;
        this.video_view_num = response.data.video_view_num;
        this.course_num = response.data.course_num;
        //调用图表的方法
        this.setChart();
      });
    },

    // 设置图标参数
    setChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById("chart"));
      // console.log(this.chart)

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["学员登录数", "学员注册数", "课程播放数", "每日新增课程数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        // x轴是类目轴（离散数据）,必须通过data设置类目数据
        xAxis: {
          type: "category",
          // boundaryGap: false,
          data: this.xData
        },
        // y轴是数据轴（连续数据）
        yAxis: {
          type: "value"
        },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            name: "学员登录数",
            type: "line",
            stack: "总量",
            data: this.login_num
          },
          {
            name: "学员注册数",
            type: "line",
            stack: "总量",
            data: this.register_num
          },
          {
            name: "课程播放数",
            type: "line",
            stack: "总量",
            data: this.video_view_num
          },
          {
            name: "每日新增课程数",
            type: "line",
            stack: "总量",
            data: this.course_num
          }
        ],
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5"
            },
            textStyle: {
              color: "#fff"
            },
            borderColor: "#90979c"
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ]
      };

      this.chart.setOption(option);
    }
  }
};
</script>
