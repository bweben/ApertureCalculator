/**
 * Created by natha on 16.03.2017.
 */
Vue.component('aperture-calc', {
    template: `
    <div>
        <div>
            <span class="label label-default">{{ valueBefore }}</span class="label labe-default">
            <span class="label label-default">{{ thirdBefore[1] }}</span class="label labe-default">
            <span class="label label-default">{{ halfBefore }}</span class="label labe-default">
            <span class="label label-default">{{ thirdBefore[0] }}</span class="label labe-default">
        </div>
        <div>
            <span class="label label-primary">{{ value }}</span class="label labe-default">
        </div>
        <div>
            <span class="label label-default">{{ thirdAfter[0] }}</span class="label labe-default">
            <span class="label label-default">{{ halfAfter }}</span class="label labe-default">
            <span class="label label-default">{{ thirdAfter[1] }}</span class="label labe-default">
            <span class="label label-default">{{ valueAfter }}</span class="label labe-default">
        </div>
        <input class="form-control" type="number" v-model="value">
    </div>
`,
    data: function (){
        return {
            value: 0,
            valueBefore: 0,
            valueAfter: 0,
            halfBefore: 0,
            halfAfter: 0,
            thirdBefore: [0, 0],
            thirdAfter: [0, 0]
        }
    },
    watch: {
        value: function (val) {
            val = parseFloat(val);
            this.valueBefore = aperture_calc(val, - 1);
            this.valueAfter = aperture_calc(val, 1);
            this.halfBefore = aperture_calc(val, - 0.5);
            this.halfAfter = aperture_calc(val, 0.5);
            this.thirdBefore = [aperture_calc(val, - 1/3), aperture_calc(val, - 2/3)];
            this.thirdAfter = [aperture_calc(val, 1/3), aperture_calc(val, 2/3)];
            console.log("\n--------\n");
        }
    }
});

var app = new Vue({
    el: '#app'
});

function log10(val) {
    return Math.log(val) / Math.LN10;
}

function get_step(val) {
    return log10(Math.pow(val, 2)) / log10(2);
}

function aperture_calc(val, step) {
    return Math.round(Math.sqrt(Math.pow(2, get_step(val) + step)) * 10) / 10;
}