import { useEffect, useRef } from "react"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

const StepsChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // 1. Initialize Root
    const root = am5.Root.new(chartRef.current)

    // Remove amCharts logo
    if (root._logo) {
      root._logo.dispose()
    }

    // Set themes
    root.setThemes([am5themes_Animated.new(root)])

    // 2. Create Chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 10,
        paddingTop: 20,
      })
    )

    // Define consistent theme color
    const themeColor = am5.color("#8979FF")

    // 3. Create Axes
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
    })
    
    // Grid styling: dashed lines
    xRenderer.grid.template.setAll({
      strokeDasharray: [3, 3],
      strokeOpacity: 0.1
    })

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    )

    const yRenderer = am5xy.AxisRendererY.new(root, {})
    yRenderer.grid.template.setAll({
      strokeDasharray: [3, 3],
      strokeOpacity: 0.1
    })

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        strictMinMax: true,
        numberFormat: "#'%'",
        renderer: yRenderer,
      })
    )

    // 4. Create Series
    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "month",
        stroke: themeColor,
        // strokeWidth: 3, // Slightly thicker line
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}%"
        })
      })
    )

    // --- GRADIENT FILL IMPLEMENTATION ---
    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.5,
      // Creates the fade-out effect
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          { color: themeColor, opacity: 0.4 },
          { color: themeColor, opacity: 0 }
        ],
        rotation: 90 // Vertical gradient
      })
    })

    // 5. Add Bullets (White center, purple border)
    series.bullets.push(() =>
      am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: am5.color("#ffffff"), 
          stroke: themeColor,          
          strokeWidth: 2,
        }),
      })
    )

    // 6. Data
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

    // 7. Animations
    series.appear(1000)
    chart.appear(1000, 100)

    // Clean up
    return () => {
      root.dispose()
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div
        ref={chartRef}
        className="w-full h-full bg-white rounded-3xl border border-gray-100  transition-all"
      />
    </div>
  )
}

export default StepsChart