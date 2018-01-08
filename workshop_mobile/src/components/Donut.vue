<script>
    import { Doughnut } from 'vue-chartjs'
    export default {
        extends: Doughnut,
        props: ['percent'],
        computed: {
            color () {
                return this.percent > 100 ? '#ff3c56' : '#007df4'
            }
        },
        mounted () {
            this.renderChart({
                labels: [],
                datasets: [
                    {
                        backgroundColor: [this.color, '#f3f3f3'],
                        borderWidth: 0,
                        data: [this.percent, 100 - this.percent]
                    }
                ]
            }, {
                cutoutPercentage: 85
            })
        }
    }
</script>

