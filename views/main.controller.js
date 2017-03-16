/**
 * Created by natha on 16.03.2017.
 */
Vue.component('aperture-calc', {
    template: '<div><p>{{ valueBefore }}</p><p>{{ value }}</p><p>{{ valueAfter }}</p><input type="number" v-model="value"></div>',
    data: function (){
        return {
            value: 0,
            valueBefore: 0,
            valueAfter: 0
        }
    },
    watch: {
        value: function (val) {
            this.valueBefore = Math.sqrt(Math.pow(2, Math.round(log10(Math.pow(val, 2)) / log10(2)) - 1));
            this.valueAfter = Math.sqrt(Math.pow(2, Math.round(log10(Math.pow(val, 2)) / log10(2)) + 1));
        }
    }
});

var app = new Vue({
    el: '#app'
});

function log10(val) {
    return Math.log(val) / Math.LN10;
}