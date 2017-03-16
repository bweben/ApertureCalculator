/**
 * Created by natha on 16.03.2017.
 */

Vue.component('aperture-calc', {
    template: '<p>{{ calc.valueBefore }}</p><p>{{ calc.value }}</p><p>{{ calc.valueAfter }}</p><input type="number" v-model="calc.value">'
});