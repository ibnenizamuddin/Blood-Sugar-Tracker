async function getChartDataValue(){
  const apiUrl = '/getSugarLevel';
  try {
    const response = await fetch(apiUrl);
    const ResponseData = await response.json();
    console.log(ResponseData);
    let labels=[];
    let PreColor= 'rgb(255, 99, 132)';
    let PostColor='rgb(255,140,0)';
    let RandomColor='rgb(0,191,255)';
    let allvalues=[];
    let allValuesBackgroundColor=[];
    for (let i = 0; i < ResponseData.length; i++) {
      labels.push(i);
      allvalues.push(ResponseData[i][1]);
      if(ResponseData[i][2]=='Pre\n'){
          allValuesBackgroundColor.push(PreColor);
      }
      if(ResponseData[i][2]=='Post\n'){
        allValuesBackgroundColor.push(PostColor);
      }
      if(ResponseData[i][2]=='Random\n'){
        allValuesBackgroundColor.push(RandomColor);
      }
    }
    return [labels,allvalues,allValuesBackgroundColor];

} catch (error) {

}


}

async function setChart(){
  try {

  chartdata=await getChartDataValue();

  const data = {
    labels: chartdata[0],
    datasets: [
   {
      label: 'Blood Sugar Tracker',
      backgroundColor: chartdata[2],
      borderColor: chartdata[2],
      data: chartdata[1],
      borderWidth: 3,
      tension: 0.5,
      color:chartdata[2],
 
    }],
    
  };
  
  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  
  
  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
  
} catch (error) {

}

}

let sugarValueField=document.getElementById('sugarlevel');
let sugarValueType=document.getElementById('typeofsugarlevelrecord');

async function submitServerSugarValue(sugarvalue,sugarvaluetype) {

  let submiteValuearray=[sugarvalue,sugarvaluetype]

  const apiUrl = '/storeSugarLevel?value=' + sugarvalue+'&type='+sugarvaluetype;

  try {
      const response = await fetch(apiUrl);
      const submitResponse = await response.json();
      windows.location.reload();

  } catch (error) {

  }

}

function submitSugarValue(){
  let sugarvalue=sugarValueField.value;
  let sugarvaluetype=sugarValueType.value;
  submitServerSugarValue(sugarvalue,sugarvaluetype);
}


setChart();