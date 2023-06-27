import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js'

function Statistic({ data, type }) {
  useEffect(() => {
    var ctx = document.getElementById('chart').getContext('2d')
    new Chart(ctx, {
      type: type,
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Your Progress',
            data: data.values,
            borderColor: 'transparent',
            backgroundColor: [
              'rgb(2 44 34)',
              'rgb(146 64 14)',
              'rgb(8 47 73)',
              'rgb(88 28 135)',
            ],
            hoverBackgroundColor: [
              'rgb(6 78 59)',
              'rgb(180 83 9)',
              'rgb(12 74 110)',
              'rgb(107 33 168)',
            ],
          },
        ],
      },
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 5,
              },
            },
          ],
        },
      },
    })
  }, [data, type])

  return (
    <div>
      <h1 className='text-xl ml-10'>Your statistic</h1>
      <canvas
        id='chart'
        width='200'
        height='100'
        className='chart mx-5'
      ></canvas>
    </div>
  )
}

export default Statistic
