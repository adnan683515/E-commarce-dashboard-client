import { useEffect, useRef } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

const StepsChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const root = am5.Root.new(chartRef.current)

    // Remove logo
    root._logo?.dispose()

    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 20,
      })
    )

    // Define the Purple Color used in your image
    const themeColor = am5.color('#8979FF')

    // X Axis
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
    })
    // Hide x-axis line and ticks to match the clean UI
    xRenderer.grid.template.setAll({ strokeDasharray: [3, 3] })

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: xRenderer,
      })
    )

    // Y Axis
    const yRenderer = am5xy.AxisRendererY.new(root, {})
    yRenderer.grid.template.setAll({ strokeDasharray: [3, 3] })

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        strictMinMax: true,
        numberFormat: "#'%'",
        renderer: yRenderer,
      })
    )

    // Series
    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "month",
        stroke: am5.color('#8979FF'), // <--- CHANGE THIS for the line border
      })
    )
    // 🌊 Gradient Fill (Matches the image)
series.fills.template.setAll({
  visible: true,
  fillOpacity: 0.05,
})
series.fills.template.set("fill", am5.color("#000000"))


    // This adds a background color to the chart area
    chart.set("background", am5.Rectangle.new(root, {
      fill: am5.color(0xF3F4F6), // Light gray "body" color
      fillOpacity: 0.5
    }));

    // 🔵 Bullets (White center, purple border)
    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: am5.color('#8979FF'),
          stroke: themeColor,
          strokeWidth: 2,
        }),
      })
    })

    // Data points approximating your provided image
    const data = [
      { month: "Jan", value: 58 },
      { month: "Feb", value: 57 },
      { month: "Mar", value: 20 },
      { month: "Apr", value: 98 },
      { month: "May", value: 92 },
      { month: "Jun", value: 43 },
      { month: "Jul", value: 38 },
      { month: "Aug", value: 72 },
      { month: "Sept", value: 42 },
      { month: "Oct", value: 88 },
      { month: "Nov", value: 41 },
      { month: "Dec", value: 26 },
    ]

    xAxis.data.setAll(data)
    series.data.setAll(data)

    series.appear(1000)
    chart.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [])

  return (
    <div className="p-6 bg-gray-50 flex justify-center">
      <div
        ref={chartRef}
        className="w-full max-w-3xl h-[400px] bg-white rounded-2xl shadow-sm border border-gray-100"
      />
    </div>
  )
}

export default StepsChart