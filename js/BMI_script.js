// 變數設定 ===============================================
var send = document.querySelector('#sendBtn');
var list = document.querySelector('.BMI-List');
var AryData = JSON.parse(localStorage.getItem('myBMIList'))||[];
var Result = document.querySelector('.showResult');
var refresh = document.querySelector('.reBtn');
var checkInput = document.querySelector('.input-cal');
var BMIstatus = {
    "過輕": {
        divClass: "re-light",
        liClass: "light"
    },
    "理想": {
        divClass: "re-good",
        liClass: "good"
    },
    "過重": {
        divClass: "re-heavy",
        liClass: "heavy"
    },
    "輕度肥胖": {
        divClass: "re-fat",
        liClass: "fat"
    },
    "中度肥胖": {
        divClass: "re-fatter",
        liClass: "fatter"
    },
    "重度肥胖": {
        divClass: "re-fattest",
        liClass: "fattest"
    }
}



// 監聽事件 ===============================================
send.addEventListener('click',BMICal,false);
list.addEventListener('click',deleteList,false);
refresh.addEventListener('click',refreshResult,false);
checkInput.addEventListener('keyup',checkValue,false);



// 函式設計 ===============================================

//進入頁面，都要先更新頁面的資料
updataList(AryData);

//BMI計算
function BMICal(){
    var HeightNum = document.querySelector('#myHeight').value;
    var WeightNum = document.querySelector('#myWeight').value;
    var BMI = (WeightNum / ((HeightNum/100)*(HeightNum/100))).toFixed(2);
    var level = '';

    // 判斷BMI級距
    if( BMI<18.5 ){
        level = '過輕';
    }else if( BMI>=18.5 && BMI<25 ){
        level = '理想';
    }else if( BMI>=25 && BMI<30 ){
        level = '過重';
    }else if( BMI>=30 && BMI<35 ){
        level = '輕度肥胖';
    }else if( BMI>=35 && BMI<40 ){
        level = '中度肥胖';
    }else{
        level = '重度肥胖';
    }

    // 資料存取至localStorage
    var ObjData = {
        saveLevel: level,
        saveH: HeightNum +'cm',
        saveW: WeightNum +'kg',
        saveBMI: BMI,
    }
    AryData.push(ObjData);
    localStorage.setItem('myBMIList',JSON.stringify(AryData));
    updataList(AryData);
    
    //顯示計算結果
    document.querySelector('.reBMI').textContent = BMI;
    document.querySelector('.reLevel').textContent = level;
    Result.className += ' '+BMIstatus[ObjData.saveLevel].divClass;
    send.style.display = 'none';
}

//更新頁面資料
function updataList(){
    var today = new Date();
    var yearStr = today.getFullYear();
    var monthStr = today.getMonth()+1;
    var dayStr = today.getDate();
    var str ='';
    var Len = AryData.length;
    for(var i=0; i<Len; i++){
        str+= '<li class="'+BMIstatus[AryData[i].saveLevel].liClass+'"><span>'+AryData[i].saveLevel+'</span><span class="BMI-value"><small>BMI</small>'+AryData[i].saveBMI+'</span><span><small>weight</small>'+AryData[i].saveW+'</span><span><small>height</small>'+AryData[i].saveH+'</span><span><small>'+monthStr+'-'+dayStr+'-'+yearStr+'</small></span><span class="deleteBtn"><i class="fa fa-trash-o" aria-hidden="true" data-num="'+i+'"></i></span></li>';
    }
    list.innerHTML = str;
}

//刪除記錄功能
function deleteList(e){
    var num = e.target.dataset.num;
    if(e.target.nodeName !=='I'){return};
    AryData.splice(num, 1);

    localStorage.setItem('myBMIList',JSON.stringify(AryData));
    updataList(AryData);
}

//refresh按鈕功能
function refreshResult(){
    send.style.display = 'block';
    Result.className = 'showResult';
    send.className = '';
    send.disabled = true;
    document.getElementById('myHeight').value = '';
    document.getElementById('myWeight').value = '';
    document.querySelector('.reBMI').textContent = '';
    document.querySelector('.reLevel').textContent = '';
}

//判斷有輸入資料才可點選計算鈕
function checkValue(){
    var H = document.getElementById('myHeight').value;
    var W = document.getElementById('myWeight').value;
    if( H.length > 0 && W.length > 0){
        send.disabled = false;
        send.className = 'active';
    }else{
        send.disabled = true;
        send.className = '';
        Result.className = 'showResult';
        send.style.display = 'block';
    }
}