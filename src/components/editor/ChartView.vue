<template>
    <div v-if="!russian">
        <table>
            <tr>
                <th colspan="5">Unique Cards</th> <th colspan="5">Total Cards</th> <th colspan="4">Total Value</th>
            </tr>
            <tr>
                <td v-for="type in cardTypes" :style="`background-color: ${type.color};`"><UnmatchedCardIcon :cardType="type.name"/></td>
                <td>Total</td>

                <td v-for="type in cardTypes" :style="`background-color: ${type.color};`"><UnmatchedCardIcon :cardType="type.name"/></td>
                <td>Total</td>

                <template v-for="type in cardTypes">
                <td v-if="type.name != 'scheme'" :style="`background-color: ${type.color};`"><UnmatchedCardIcon :cardType="type.name"/></td>
                </template>
                <td>Total</td>
            </tr>
            <tr>
                <td v-for="type in cardTypes" :style="`background-color: ${type.color};`">{{ uniqueSum[type.name] }}</td>
                <td>{{ totalSums.unique }}</td>

                <td v-for="type in cardTypes" :style="`background-color: ${type.color};`">{{ cardsSum[type.name] }}</td>
                <td>{{ totalSums.cards }}</td>

                <template v-for="type in cardTypes">
                <td v-if="type.name != 'scheme'" :style="`background-color: ${type.color};`">{{ cardsValueSum[type.name] }}</td>
                </template>
                <td>{{ totalSums.cardsValue }}</td>
            </tr>
        </table>
    </div>

    <div v-else>
        <table class="card-stats">
            <tr>
                <th colspan="5">Уникальные карты</th> <th colspan="5">Всего карт</th> <th colspan="4">Суммарное значение</th>
            </tr>
            <tr>
                <td v-for="type in cardTypes" :style="`background-color: ${type.color};`"><UnmatchedCardIcon :cardType="type.name"/></td>
                <td>Сумма</td>

                <td v-for="type in cardTypes" :style="`background-color: ${type.color};`"><UnmatchedCardIcon :cardType="type.name"/></td>
                <td>Сумма</td>

                <template v-for="type in cardTypes">
                <td v-if="type.name != 'scheme'" :style="`background-color: ${type.color};`"><UnmatchedCardIcon :cardType="type.name"/></td>
                </template>
                <td>Сумма</td>
            </tr>
            <tr>
                <td v-for="type in cardTypes" :style="`background-color: ${type.color};`">{{ uniqueSum[type.name] }}</td>
                <td>{{ totalSums.unique }}</td>

                <td v-for="type in cardTypes" :style="`background-color: ${type.color};`">{{ cardsSum[type.name] }}</td>
                <td>{{ totalSums.cards }}</td>

                <template v-for="type in cardTypes">
                <td v-if="type.name != 'scheme'" :style="`background-color: ${type.color};`">{{ cardsValueSum[type.name] }}</td>
                </template>
                <td>{{ totalSums.cardsValue }}</td>
            </tr>
        </table>
    </div>

    <div class="row" style="justify-content: space-evenly;">
        <template v-for="type in cardTypes">
            <div class="col-auto">
            <Chart type="bar"
                :data="{
                    labels: chartData.labels[type.name],
                    datasets: [
                        {
                            data: chartData.boost[type.name],
                            borderColor: '#FFFFFFAA',
                            stepped: 'middle',
                            backgroundColor: 'white',
                            label: 'boost',
                            type: 'line'
                        },
                        {
                            data: type.name != 'scheme' ? chartData.values[type.name] : [],
                            backgroundColor: type.color,
                            label: type.name,
                            type: 'bar'
                        }
                    ]
                }"
                :options="{
                    responsive: false,
                    scales: {
                        y: {
                            min: 0,
                            max: maxCardValue + 1,
                            stacked: false
                        }
                    }
                }"></Chart>
            </div>
        </template>
    </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import UnmatchedCardIcon from '../UnmatchedCardIcon.vue';

import { Chart, Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)


export default defineComponent({
    name: "ChartView",
    components: {UnmatchedCardIcon, Bar, Chart},
    props: ['deck', 'fullDeck', 'russian'],
    data() {
        return {
            cardTypes: [
                {name: 'attack', color: '#DC3034'},
                {name: 'defence', color: '#2C76AC'},
                {name: 'versatile', color: '#6C4E8D'},
                {name: 'scheme', color: '#FCBD71'},
            ],
        };
    },
    computed: {
        uniqueSum() {
            let res = {
                versatile: 0,
                attack: 0,
                defence: 0,
                scheme: 0,
            };
            for (let card of this.deck.cards) {
                res[card.type]++;
            }
            return res;
        },
        cardsSum() {
            let res = {
                versatile: 0,
                attack: 0,
                defence: 0,
                scheme: 0,
            };
            for (let card of this.fullDeck) {
                res[card.data.type]++;
            }
            return res;
        },
        cardsValueSum() {
            let res = {
                versatile: 0,
                attack: 0,
                defence: 0,
                scheme: 0,
            };
            for (let card of this.fullDeck) {
                res[card.data.type] += card.data.value;
            }
            return res;
        },
        totalSums() {
            let unique = 0;
            for (let val of Object.values(this.uniqueSum)) {
                unique += val;
            }
            let cards = 0;
            for (let val of Object.values(this.cardsSum)) {
                cards += val;
            }
            let cardsValue = 0;
            for (let val of Object.values(this.cardsValueSum)) {
                cardsValue += val;
            }
            return {unique, cards, cardsValue};
        },
        chartData: function() {
            let values = {
                defence: [],
                attack: [],
                scheme: [],
                versatile: [],
            };
            let boost = {
                defence: [],
                attack: [],
                scheme: [],
                versatile: [],
            };
            let labels = {
                defence: [],
                attack: [],
                scheme: [],
                versatile: [],
            };
            for (let card of this.fullDeck) {
                boost[card.data.type].push(card.data.boost);
                values[card.data.type].push(card.data.value);
                labels[card.data.type].push(this.capitalize(card.data.title));
            }
            return {values, boost, labels};
        },
        maxCardValue: function() {
          let maxValue = 0;
          for (let card of this.deck.cards) maxValue = Math.max(maxValue, card.value);
          for (let card of this.deck.cards) maxValue = Math.max(maxValue, card.boost);
          return maxValue;
        },
    },
    methods: {
        capitalize(str) {
            return str[0].toUpperCase().concat(str.slice(1).toLowerCase());
        },
    }
});
</script>

<style scoped>
.card-stats {
    th {
        border-bottom: 2px solid white;
    }
    th:not(:last-child), td:nth-child(5n) {
        border-right: 2px solid white;
    }
}
</style>
