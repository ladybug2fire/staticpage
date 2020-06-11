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
      target: moment(store.get("target")).startOf()
    };
  },
  computed: {
    diff() {
      return moment()
        .startOf("day")
        .diff(moment(this.target), "days");
    }
  },
  mounted() {
    console.log(store.get("target"));
    setInterval(() => (this.now = moment()), 1000);
  },
  methods: {
    handleTargetChange(v) {
      store.set("target", v);
    }
  }
};
</script>

<style lang="less" scoped>
.diff-date {
  font-size: 10rem;
  padding: 10px;
}
</style>