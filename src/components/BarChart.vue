<script>
//import { Bar} from "vue-chartjs";
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["chartData", "options"],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.options1 = {
      scales: {
            yAxes: [{
                display: false
            }]
        }
    };
    this.renderChart(this.chartData, this.options1);
  }
};
</script>

<style>
</style>