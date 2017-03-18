/**
 * Created by natha on 16.03.2017.
 */
Vue.component('aperture-calc', {
    template: `<div class="row">
    <div class="col-lg-3">
        <table class="table table-bordered">
            <thead>
            <tr>
                <th class="col-md-1">Full stop</th>
                <th class="col-md-1">Half stop</th>
                <th class="col-md-1">Third stop</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{{ valueBefore }}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>{{ thirdBefore[1] }}</td>
            </tr>
            <tr>
                <td></td>
                <td>{{ halfBefore }}</td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>{{ thirdBefore[0] }}</td>
            </tr>
            <tr class="active">
                <td>{{ value }}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>{{ thirdAfter[0] }}</td>
            </tr>
            <tr>
                <td></td>
                <td>{{ halfAfter }}</td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>{{ thirdAfter[1] }}</td>
            </tr>
            <tr>
                <td>{{ valueAfter }}</td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="form-group col-lg-12">
        <label for="iAperture">Your Aperture:</label>
        <input id="iAperture" class="form-control" type="number" v-model="value">
    </div>
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
            thirdAfter: [0, 0],
            newValues: [0, 1/3, 1/2, 2/3, 1]
        }
    },
    watch: {
        value: function (val) {
            val = parseFloat(val);
            let step = ((get_step(val) * 10) / 10).toString().split(".");
            if (step.length > 1) {
                step[1] = "0." + step[1];
                step[1] = get_closest(parseFloat(step[1]), this.newValues);
            }

            step = parseInt(step[0]) + (step.length > 1 ? step[1] : 0);
            step = parseFloat(step);

            this.valueBefore = aperture_calc(val, - 1, step);
            this.valueAfter = aperture_calc(val, 1, step);
            this.halfBefore = aperture_calc(val, - 0.5, step);
            this.halfAfter = aperture_calc(val, 0.5, step);
            this.thirdBefore = [aperture_calc(val, - 1/3, step), aperture_calc(val, - 2/3, step)];
            this.thirdAfter = [aperture_calc(val, 1/3, step), aperture_calc(val, 2/3, step)];
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

function aperture_calc_without_step(val, step) {
    return Math.round(Math.sqrt(Math.pow(2, get_step(val) + step)) * 10) / 10;
}

function aperture_calc(val, step, orgStep) {
    let calcedVal = 0;
    if (!orgStep) {
        calcedVal = aperture_calc_without_step(val, step);
    } else {
        calcedVal = Math.round(Math.sqrt(Math.pow(2, orgStep + step)) * 10) / 10;
    }
    calcedVal = calcedVal >= 10 ? Math.round(calcedVal) : calcedVal;
    return calcedVal;
}

function get_closest(num, arr) {
    let curr = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (Math.abs(num - arr[i]) < Math.abs(num -curr)) {
            curr = arr[i];
        }
    }
    return curr;
}