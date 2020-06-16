<template>
  <div>
     <el-date-picker
      v-model="target"
      @change="handleTargetChange"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    <h3>距离{{target|dateformat}}</h3>
    <h1>{{diff>0?'已过去':'还有'}}<span class="diff-date">{{Math.abs(diff)}}</span>天</h1>
    <div class="diff-date">{{now.format('HH:mm:ss')}}</div>
    <div class="words">为人民服务</div>

  </div>
</template>

<script>
import moment from "moment";
import store from "store";
export default {
  filters: {
    dateformat(value) {
      return moment(value).format("YYYY-MM-DD");
    }
  },
  data() {
    return {
      now: moment(),
      day: moment(),
      target: moment(store.get("target")).startOf()
    };
  },
  computed: {
    diff() {
      return this.day 
        .startOf("day")
        .diff(moment(this.target), "days");
    }
  },
  mounted() {
    setInterval(() => (this.now = moment()), 1000);
    setInterval(() => (this.day = moment()), 60000);
  },
  methods: {
    handleTargetChange(v) {
      store.set("target", v);
    }
  }
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'Exo';
  src: url('../assets/fonts/Exo_2/static/Exo2-Thin.ttf');
}
@font-face {
  font-family: 'LiuJianMaoCao';
  src: url('../assets/fonts/Liu_Jian_Mao_Cao/LiuJianMaoCao-Regular.ttf');
}
.diff-date {
  font-size: 10rem;
  padding: 10px;
  font-family: Exo, Arial, Helvetica, sans-serif;
}
.words{
  font-family: LiuJianMaoCao, Arial, Helvetica, sans-serif;
  font-size: 5rem;
}
</style>