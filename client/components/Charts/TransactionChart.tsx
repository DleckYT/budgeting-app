import { ChartData } from "./GraphData"
import CanvasJSReact from '@canvasjs/react-charts'

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface Props{
  data: Array<ChartData>
  title: string
}

export default function TransactionChart(props: Props){

  const options = {
    theme: "light2",
    title:{
      text: props.title
    },
    toolTip:{
      shared: true
    },
    axisX:{
      viewportMinimum: props.data[0] ? Math.max(0, props.data[0].dataPoints!.length - 240) : undefined,
      labelAngle: -30,
      valueFormatString: " ",
    },
    axisY:{
      minimum: 0,
      valueFormatString: "$#,##0.#0",
    },
    zoomEnabled: true,
    data: props.data
  }
  return <div style={{width: '1200px'}}>
    <CanvasJSChart options={options}/>
  </div> 
}