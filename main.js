//把Json轉為陣列存為data
let data = [];
let xhr = new XMLHttpRequest();
xhr.open('get','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',true);
xhr.send(null);
xhr.onload=function(){
  data = JSON.parse(xhr.responseText);
  data = data.result.records;
//資料onload 執行篩選顯示不重複地址下拉選單 
    placeList();
  //資料onload 執行顯示不重複地址方塊
  updatePlaceSelect();
}

let select = document.querySelector('.location');
let place = document.querySelector('.popularButton');
let list = document.querySelector('.locationList');
let title = document.querySelector('.place');

//篩選下拉選單重複地址
function updatePlaceSelect(){
  let str = '';
  let set = new Set();//?
   let result = data.filter(item => !set.has(item.Zone) ? set.add(item.Zone):false);//if set.add(item.Zone) else false
  let len = result.length;
  
  for(let i=0; i<len; i++){
    str += `<option value="${result[i].Zone}">${result[i].Zone}</option>`
    select.innerHTML = `<option value='請選擇行政區'> - - 請選擇行政區 - - </option>${str}`;
  }
}
//戴入網頁方塊區全顯示不篩選
function placeList(){
  let str = '';
  let len = data.length;
  
  for(let i=0; i<len; i++){
   str +=  `
      <li>
      <div>
         <div class="img">
         <img src="${data[i].Picture1}" alt=""></div>
         </div>
            <h3>${data[i].Picdescribe1}</h3>
            <p>${data[i].Zone}</p>
          </div>
          <div class="text">
            <p><img src="https://chiyum.github.io/ajaxmani/img/icons_clock.png" alt=""/>&nbsp&nbsp${data[i].Opentime}</p>
            <p><img src="https://chiyum.github.io/ajaxmani/img/icons_pin.png" alt=""/>&nbsp&nbsp&nbsp${data[i].Add}</p>
            <div class="tel">
              <p><img src="https://chiyum.github.io/ajaxmani/img/icons_phone.png" alt=""/>&nbsp&nbsp&nbsp&nbsp${data[i].Tel}                  </p>
                <img src="https://chiyum.github.io/ajaxmani/img/icons_tag.png" alt=""/>&nbsp&nbsp&nbsp&nbsp${data[i].Ticketinfo}</p>
            </div>
          </div>
      </li>`;
  }
  list.innerHTML = str;
}

//篩選方塊區
function placeUpdate(e){
  let str = '';
  let len = data.length;
  
  for(let i=0; i<len; i++){
    if(e.target.value === data[i].Zone){
      str +=  `
      <li>
      <div>
         <div class="img">
         <img src="${data[i].Picture1}" alt=""></div>
         </div>
            <h3>${data[i].Picdescribe1}</h3>
            <p>${data[i].Zone}</p>
          </div>
          <div class="text">
            <p><img src="https://chiyum.github.io/ajaxmani/img/icons_clock.png" alt=""/>&nbsp&nbsp${data[i].Opentime}</p>
            <p><img src="https://chiyum.github.io/ajaxmani/img/icons_pin.png" alt=""/>&nbsp&nbsp&nbsp${data[i].Add}</p>
            <div class="tel">
              <p><img src="https://chiyum.github.io/ajaxmani/img/icons_phone.png" alt=""/>&nbsp&nbsp&nbsp&nbsp${data[i].Tel}</p>
                <img src="https://chiyum.github.io/ajaxmani/img/icons_tag.png" alt=""/>&nbsp&nbsp&nbsp&nbsp${data[i].Ticketinfo}</p>
            </div>
          </div>
      </li>`;
    }
  }
  list.innerHTML = str;
  title.innerHTML = e.target.value;
}
  
select.addEventListener('change', placeUpdate);
place.addEventListener('click', placeUpdate);



//返回頂部
$('.gotop').click(function (e) { 
  $('html, body').animate({ 
    scrollTop: 0
  }, 800);
});

$(window).scroll(function() {
  if ( $(this).scrollTop() > 200){
      $('.gotop').fadeIn();
  } else {
      $('.gotop').fadeOut();
  }
});

