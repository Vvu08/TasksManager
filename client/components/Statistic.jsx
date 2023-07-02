import { useEffect, useState } from 'react'
import { Chart } from 'chart.js'
import { getUserStatistics } from '@/api/statistic'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

function Statistic() {
  const { id: userId } = useSelector((state) => state.auth.user)
  const [type, setType] = useState('bar')
  const [data, setData] = useState({
    labels: ['Tasks to Do', 'In Progress', 'Tasks Pending', 'Tasks Done'],
    values: [0, 0, 0, 0],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserStatistics(userId).then((res) => {
      if (res.status === 200) {
        setData({
          ...data,
          values: [
            res.data[0]?.count || 0,
            res.data[1]?.count || 0,
            res.data[2]?.count || 0,
            res.data[3]?.count || 0,
          ],
        })
        setLoading(false)
      }
    })
  }, [])

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
            backgroundColor: ['#472D2D', '#553939', '#A77979', '#704F4F'],
            hoverBackgroundColor: ['#704F4F', '#A7797', '#472D2D', '#553939'],
          },
        ],
      },
      options: {
        layout: {
          padding: 20,
        },
        legend: {
          labels: {
            fontColor: '#adb8c9',
          },
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
                stepSize: 5,
                fontColor: `${type === 'bar' ? '#adb8c9' : 'transparent'}`,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: `${type === 'bar' ? '#adb8c9' : 'transparent'}`,
              },
            },
          ],
        },
      },
    })
  }, [data, type])

  return (
    <div className='ml-5'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
          <button
            className={`${
              type === 'bar' ? ' bg-neutral-900' : ' bg-neutral-950'
            }  btn btn-outline-primary mx-2 border-2 border-neutral-900 px-5 py-2 rounded-md`}
            onClick={() => setType('bar')}
          >
            Bar
          </button>
          <button
            className={`${
              type === 'doughnut' ? ' bg-neutral-900' : ' bg-neutral-950'
            } btn btn-outline-primary mx-2 border-2 border-neutral-900 px-5 py-2 rounded-md`}
            onClick={() => setType('doughnut')}
          >
            Doughnut
          </button>
        </div>
      </div>
      <canvas
        id='chart'
        width='200'
        height='100'
        className='chart bg-neutral-900 rounded-lg'
      ></canvas>
    </div>
  )
}

export default Statistic
