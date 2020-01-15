<template>
  <div class="chart">
    <el-row>
      <el-col :span="12">
         <div id="viewTrend" :style="{width: '340px', height: '340px'}"></div>
         <div id="category" :style="{width: '340px', height: '300px'}"></div>
      </el-col>
       <el-col :span="12">
         <el-timeline>
      <el-timeline-item
        v-for="(comment, index) in latestCommentList"
        :key="index"
        :timestamp="comment.blogCommentDate|dataFormat('yyyy-MM-dd hh:mm:ss')"
      >{{comment.blogCommentUsername+"说: "+comment.blogCommentContent}}</el-timeline-item>
    </el-timeline>
             
       </el-col>
              
    </el-row>

    <el-row>
      <el-col :span="12">
        <div id="blogMonthNum" :style="{width: '400px', height: '400px'}"></div>
      </el-col>
    
     <el-col :span="12">
         <div v-for="element in blogViewList" :key="element">
           <el-card shadow="hover" class="box-card" style="width:500px;font-size:14px;margin-bottom:10px;background-color:rgba(234, 99, 173, 0.14)" :body-style="{ padding: '10px' }">
          <div>{{"标题: " + element.blogTitle + " 访问量:" + element.blogViews}}</div>
          <div class="time">{{element.blogUpdateTime|dataFormat('yyyy-MM-dd hh:mm:ss')}}</div>
      </el-card>
    </div>
     </el-col>
     </el-row>
   
    
      
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "chartMagagement",
  data() {
    return {
      viewTrendData: {
        title: {
          text: "近期站点每日访问量",
          left: "center"
        },
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross"
          }
        },
        xAxis: {
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#1E90FF"
            }
          },
          type: "category",
          boundaryGap: false,
          data: [],
          triggerEvent: true,
          axisPointer: {
            label: {}
          }
        },
        yAxis: {
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#B22222"
            }
          },
          axisPointer: {
            label: {}
          },
          type: "value",
          triggerEvent: true
        },
        series: [
          {
            data: [],
            type: "line",
            areaStyle: {}
          }
        ]
      },
      categoryData: {
        title: {
          text: "分类文章数量及浏览量",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "文章数量分布",
            type: "pie",
            radius: [5, 55],
            center: ["28%", "55%"],
            roseType: "radius",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: []
          },
          {
            name: "文章阅读数分布",
            type: "pie",
            radius: [5, 55],
            center: ["75%", "50%"],
            roseType: "radius",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: []
          }
        ]
      },
      blogMonthNumData: {
        title: {
          text: "每月文章贡献分布图",
          x: "center"
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sept",
              "Oct",
              "Dec",
              "Nov"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "博客数量:",
            type: "bar",
            barWidth: "60%",
            data: []
          }
        ]
      },
      latestCommentList: [],
      blogViewList: []
    };
  },
  mounted() {
    this.axios.get("/site/view_trend").then(res => {
      this.viewTrendData.xAxis.data = res.data.data.date;
      this.viewTrendData.series[0].data = res.data.data.count;
      let viewTrendChart = this.$echarts.init(
        document.getElementById("viewTrend")
      );
      viewTrendChart.setOption(this.viewTrendData);
    });
    this.axios.get("/blog/category_pie").then(res => {
      let data = res.data.data;
      let categoryNameList = [];
      let categoryNumList = [];
      let categoryViewList = [];
      data.forEach(element => {
        categoryNameList.push(element.categoryName);
        let numItem = {
          value: element.num,
          name: element.categoryName
        };
        let viewItem = {
          value: element.view,
          name: element.categoryName
        };
        categoryNumList.push(numItem);
        categoryViewList.push(viewItem);
      });
      this.categoryData.legend.data = categoryNameList;
      this.categoryData.series[0].data = categoryNumList;
      this.categoryData.series[1].data = categoryViewList;
      let categoryNum = this.$echarts.init(document.getElementById("category"));
      categoryNum.setOption(this.categoryData);
    });
    this.axios.get("/blog/month_num").then(res => {
      this.blogMonthNumData.series[0].data = res.data.data;
      let blogMonthNum = this.$echarts.init(
        document.getElementById("blogMonthNum")
      );
      blogMonthNum.setOption(this.blogMonthNumData);
    });
    this.axios.get("/latest_comment").then(res => {
      this.latestCommentList = res.data.data;
    });
    this.axios.get("/blog_view").then(res => {
      this.blogViewList = res.data.data;
    });
  },
  methods: {},
  filters: {
    dataFormat: function(value, fmt) {
      let getDate = new Date(value);
      let o = {
        "M+": getDate.getMonth() + 1,
        "d+": getDate.getDate(),
        "h+": getDate.getHours(),
        "m+": getDate.getMinutes(),
        "s+": getDate.getSeconds(),
        "q+": Math.floor((getDate.getMonth() + 3) / 3),
        S: getDate.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (getDate.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    }
  }
};
</script>


<style scoped>
.chart{
  font-family: "华文行楷";
  padding:50px;
  cursor: pointer;
}
.time{
  font-family:"华文行楷";
  font-weight:200;
  color: #a9a9a9b9;
  font-size: 14px;
  
  margin-top: 5px;
}
</style>