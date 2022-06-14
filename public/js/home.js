const con = document.querySelector('.row');
const dis = document.querySelector('.dis');
const district = document.querySelector('.district');
const state = document.querySelector('.value');
const btn = document.querySelector('#btn');
const btn1 = document.querySelector('#btn1');
const center = document.querySelector('.center');
const date =  document.querySelector('.date')
var today = new Date();
const d = today.toDateString();

var auto_date = today.toISOString();
var mod_auto_date = auto_date.split("-");
var auto_year = mod_auto_date[0];
var auto_month = mod_auto_date[1];
var auto_day = mod_auto_date[2].split("");
var mod_auto_date = auto_day[0] + auto_day[1];
var final_auto_date = `${auto_year}-${auto_month}-${mod_auto_date}`;

const statelist = document.querySelector('.statelist');
fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/states`).then((res)=>{ return res.json()}).then((data)=>{
    const states = data.states;

  states.forEach(curElm => {
  
    const htmlData = `<option value="${curElm.state_id}">${curElm.state_name}</option> `;
  
    statelist.insertAdjacentHTML('afterend', htmlData);
  });

})





state.addEventListener("change", async function () {
  const statev = document.querySelector('.value').value;

  
  

        if (statev) {
          district.innerText = "";
          var option = document.createElement("option");
      option.text = "Select District";
      option.value = "Null";
      district.add(option);

          const response = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${statev}`);

       
       var odata = await response.json();
       var data = odata.districts;
    

data.forEach((curElm,index) => {
  

  var option = document.createElement("option");
        option.text = curElm.district_name;
        option.value = curElm.district_id;
        district.add(option);
   
    
  })

          
        } else {

          console.log("select a state");
          
        }
        
        



});

const htmlData1= `<tr>
    <th scope="col"></th>
    <th scope="col">${d}</th>
    <th scope="col">${new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()}</th>
    <th scope="col">${new Date(new Date().setDate(new Date().getDate() + 2)).toDateString()}</th>
    <th scope="col">${new Date(new Date().setDate(new Date().getDate() + 3)).toDateString()}</th>
    <th scope="col">${new Date(new Date().setDate(new Date().getDate() + 4)).toDateString()}</th>
  </tr>`;

  date.insertAdjacentHTML('afterend', htmlData1);

btn.addEventListener('click', async ()=>{
  const dis_id =  document.querySelector('.district').value;
  center.innerText = "";
  var dat = final_auto_date;
  var date_spli = dat.split("-");
  var modified_date = `${date_spli[2]}-${date_spli[1]}-${date_spli[0]}`;

    const response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${dis_id}&date=${modified_date}`);
    const data = await  response.json();
    const data1= data.centers;
    //console.log(data);

    
  
    data1.forEach((curElm,i)=>{

      var ddata1 =[];
      var ddata2=[];
     curElm.sessions.forEach((c,u)=>{
      if (curElm.sessions[u].available_capacity_dose1) {
         ddata1[u] = curElm.sessions[u].available_capacity_dose1;
      } else {
         ddata1[u] = "N/A";
      }
     })

     curElm.sessions.forEach((c,u)=>{
      if (curElm.sessions[u].available_capacity_dose2) {
         ddata2[u] = curElm.sessions[u].available_capacity_dose2;
      } else {
         ddata2[u] = "N/A";
      }
     })

     for(let i=0;i<=4;i++){
       if (ddata1[i] == undefined) {
        ddata1[i] = 'N/A';
       }

       if (ddata2[i]== undefined) {
        ddata2[i]= 'N/A';
       }
     }

     //console.log(ddata1);
     //console.log(ddata2);
      


      const htmlData = ` 
      <tr class="align-middle">
      <td style="max-width: 150px;">${curElm.name}<br> ${curElm.address} , ${curElm.district_name} District, ${curElm.state_name},
        ${curElm.pincode} <br> ${curElm.sessions[0].vaccine} <span class="badge bg-success">${curElm.fee_type}</span> <br> Age: ${curElm.sessions[0].min_age_limit} to ${curElm.sessions[0].max_age_limit} <span
          style="padding-left: 10px;">Dose: #1-${curElm.sessions[0].available_capacity_dose1}, Dose: #2-${curElm.sessions[0].available_capacity_dose2}</span></td>
      <td class="value">Dose: #1-${ddata1[0]}<br>Dose: #2-${ddata2[0]}</td>
      <td class="value">Dose: #1-${ddata1[1]}<br>Dose: #2-${ddata2[1]}</td>
      <td class="value">Dose: #1-${ddata1[2]}<br>Dose: #2-${ddata2[2]}</td>
      <td class="value">Dose: #1-${ddata1[3]}<br>Dose: #2-${ddata2[3]}</td>
      <td class="value">Dose: #1-${ddata1[4]}<br>Dose: #2-${ddata2[4]}</td>
    </tr>
      `;

      center.insertAdjacentHTML('afterbegin', htmlData);
      
    })
})

btn1.addEventListener('click', async ()=>{
  const pin =  document.querySelector('#pin').value;
  center.innerText = "";
 
  var dat = final_auto_date;
  var date_spli = dat.split("-");
  var modified_date = `${date_spli[2]}-${date_spli[1]}-${date_spli[0]}`;

    const response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${modified_date}`);
    const data = await  response.json();
    const data1= data.centers;
    console.log(data1);

    
  
    data1.forEach((curElm,i)=>{

      var ddata1 =[];
      var ddata2=[];
     curElm.sessions.forEach((c,u)=>{
      if (curElm.sessions[u].available_capacity_dose1) {
         ddata1[u] = curElm.sessions[u].available_capacity_dose1;
      } else {
         ddata1[u] = "N/A";
      }
     })

     curElm.sessions.forEach((c,u)=>{
      if (curElm.sessions[u].available_capacity_dose2) {
         ddata2[u] = curElm.sessions[u].available_capacity_dose2;
      } else {
         ddata2[u] = "N/A";
      }
     })

     for(let i=0;i<=4;i++){
       if (ddata1[i] == undefined) {
        ddata1[i] = 'N/A';
       }

       if (ddata2[i]== undefined) {
        ddata2[i]= 'N/A';
       }
     }

     //console.log(ddata1);
     //console.log(ddata2);
      


      const htmlData = ` 
      <tr class="align-middle">
      <td style="max-width: 150px;">${curElm.name}<br> ${curElm.address} , ${curElm.district_name} District, ${curElm.state_name},
        ${curElm.pincode} <br> ${curElm.sessions[0].vaccine} <span class="badge bg-success">${curElm.fee_type}</span> <br> Age: ${curElm.sessions[0].min_age_limit} to ${curElm.sessions[0].max_age_limit} <span
          style="padding-left: 10px;">Dose: #1-${curElm.sessions[0].available_capacity_dose1}, Dose: #2-${curElm.sessions[0].available_capacity_dose2}</span></td>
      <td class="value">Dose: #1-${ddata1[0]}<br>Dose: #2-${ddata2[0]}</td>
      <td class="value">Dose: #1-${ddata1[1]}<br>Dose: #2-${ddata2[1]}</td>
      <td class="value">Dose: #1-${ddata1[2]}<br>Dose: #2-${ddata2[2]}</td>
      <td class="value">Dose: #1-${ddata1[3]}<br>Dose: #2-${ddata2[3]}</td>
      <td class="value">Dose: #1-${ddata1[4]}<br>Dose: #2-${ddata2[4]}</td>
    </tr>
      `;

      center.insertAdjacentHTML('afterbegin', htmlData);
      
    })
})

