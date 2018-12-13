function createandModify(first,last){

  var div = document.getElementById('wrapper'),myDivs = [],i = 0,numOfDivs = 3;

      for (i; i < numOfDivs; i ++) {
        myDivs.push(document.createElement('div'));
          for(j = 0;j <  myDivs.length; j++){
            myDivs[j].className = "container1 rte_" + (j+1);
            myDivs[j].id = "route_" + (j+1);
          }
        div.appendChild(myDivs[i]);
      }
  
  var primCont = document.getElementsByClassName('container1'),i = 0,num = primCont.length;

      for(i;i < num;i++){
        var namedDiv = document.createElement('div');
        namedDiv.className = 'column-routes';
        primCont[i].appendChild(namedDiv);
      }
  
  var routeHeader = document.getElementsByClassName('column-routes');
  var t = document.createTextNode('Route');
  var dow = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
  var routes = document.getElementsByClassName('container1');
  var colRoutes = document.getElementsByClassName('column-routes');
  var myColumns = document.getElementsByClassName('column');
  var myHeaders = document.getElementsByClassName('column-header');

  routeHeader[0].id = 'route-header';
  colHead = document.createElement('div');
  colHead.className = 'column-header-routes';
  colHead.appendChild(t);
  routeHeader[0].appendChild(colHead);

      for(i = 0; i < routes.length; i++){
        var routeDiv = document.createElement('div');
        var name1 = routes[i].id;
        var name2 = name1.charAt(0).toUpperCase() + name1.slice(1);
        name2 = name2.replace("_", " ");
        var thisName = document.createTextNode(name2);
        routeDiv.className = 'item-route';
        routeDiv.appendChild(thisName);
        colRoutes[i].appendChild(routeDiv);
      }

  const myFrag = document.createDocumentFragment();

      for(i =0; i < routes.length; i++){
        for(j = 0; j < dow.length;j++){
          const myNewDivs = document.createElement('div');
          myNewDivs.className = "column " + dow[j];
          myFrag.appendChild(myNewDivs);
        }
        routes[i].appendChild(myFrag);
      }
      for(i = 0;i < 7; i++){
        var headerDiv = document.createElement('div');
        var thisName = document.createTextNode(dow[i]);
        headerDiv.className = 'column-header';
        headerDiv.appendChild(thisName);
        myColumns[i].appendChild(headerDiv);
      }
      myArrayWeek = arrayWeek(first);
      for(i = 0;i < myHeaders.length; i++){
        var myDiv = document.createElement('div');
        var myHeaderDate = document.createTextNode(myArrayWeek[i]);
        myDiv.appendChild(myHeaderDate);
        myHeaders[i].appendChild(myDiv);
      }
      
      var arrayRoutes = [3,5,7]
      var arrRoutes = [];
      j = 0;
      while(j < arrayRoutes.length + 1){
        for(i = 0;i < 7;i++){
          arrRoutes.push(arrayRoutes[j]);
        }
        j++
      }
      for(i = 0; i < myColumns.length; i++){
          var myGrids = document.createElement('div');
          myGrids.className = 'grid grid-' + (i+1);
          myGrids.setAttribute('data-date',myArrayWeek[i%myArrayWeek.length]);
          myGrids.setAttribute('data-route',arrRoutes[i]);
          myColumns[i].appendChild(myGrids);
          
      }
      var itemContainers = [].slice.call(document.querySelectorAll('.grid'));
      for(i = 0;i < itemContainers.length; i++){
          var myEmp = document.createElement('div');
          myEmp.className = 'empHeader';
          var textName = document.createTextNode('Employees/Vehicle');
          myEmp.appendChild(textName);
          itemContainers[i].before(myEmp);
      }
      var empContainers = [].slice.call(document.querySelectorAll('.empHeader'));
      for(i = 0;i < empContainers.length; i++){
        empContainers[i].setAttribute('data-emp-date',myArrayWeek[i%myArrayWeek.length]);
        empContainers[i].setAttribute('data-emp-route',arrRoutes[i]);
 
      }
      for(i = 0;i < primCont.length; i++){
        var myHr = document.createElement("hr");
        primCont[i].after(myHr);
      }      
}

function setGrid(){
    var itemContainers = [].slice.call(document.querySelectorAll('.grid'));
    var columnGrids = [];

    itemContainers.forEach(function (container) {
      var grid = new Muuri(container, {
        items: '.item',
        layoutDuration: 400,
        layoutEasing: 'ease',
        dragEnabled: true,
        dragSort: function () {
          return columnGrids;
        },
        dragSortInterval: 0,
        dragContainer: document.body,
        dragReleaseDuration: 200,
        dragReleaseEasing: 'ease'
      }).on('dragReleaseEnd',function(){
        gridSynch(grid);
      })
      columnGrids.push(grid);
    });
    
}


var getChildIndex = function(child){
    var parent = child.parentNode;
    var i = parent.children.length - 1;
    for (; i >= 0; i--){
        if (child == parent.children[i]){
            break;
        }
    }
    return i;
};

function myFunction2(){
var element = document.getElementById('myId_2');
var index = getChildIndex(element);
console.log(index);
}

function gridSynch(grid){
  grid.synchronize();
  
}

$('#load').click (function(){ 
  $.ajax({
    type: "GET",
    url: "test.php?id=5",
    dataType: 'json',
    success: function(data){
      createJobs(data); 
    }
  })
});

function getMonday(d) {
d = new Date(d);
var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1);
var first_date =  new Date(d.setDate(diff));
var first_date1 = (first_date.getMonth() +1) + "/" + first_date.getDate() + "/" + first_date.getFullYear();
getSunday(first_date1);
document.getElementById('first_date').value = first_date1;
}

function getSunday(d) {
var thisSunday = moment(d, 'MM-DD-YYYY').add(6,'days');
var myDate1 = moment(thisSunday).format('L');
document.getElementById('second_date').value = myDate1;
}

function findWeek(type){
  if(type == "next"){
    var num1 = 7,num2 = 6;
  }else if (type = "prev"){
    var num1 = -7, num2 = 6;
  }
    var thisMonday = document.getElementById('first_date').value;
    var nextMonday = moment(thisMonday, 'MM-DD-YYYY').add(num1,'days');
    var nextSunday = moment(nextMonday, 'MM-DD-YYYY').add(num2,'days');
    var myDate1 = moment(nextMonday).format('L');
    var myDate2 = moment(nextSunday).format('L');
    document.getElementById('first_date').value = myDate1;
    document.getElementById('second_date').value = myDate2; 
}

function arrayWeek(first){
  var myArray = [first];
  for(i = 1;i < 7; i++){
      var nextDate = moment(first, "L").add(i, 'days');
      var finalDate = moment(nextDate).format('L');
      myArray.push(finalDate);
  }
  return myArray;
}

function beginCreate(){
  document.getElementById('wrapper').innerHTML = "";
  createandModify(document.getElementById('first_date').value,document.getElementById('second_date').value);
}

function createJobs(data){
  var itemContainers = [].slice.call(document.querySelectorAll('.grid'));
  for(i = 0; i < itemContainers.length; i++){
    for(j = 0; j < data.length; j++){
      
      if ((itemContainers[i].getAttribute('data-date') == moment(data[j].job_date).format('L')) && (itemContainers[i].getAttribute('data-route') == data[j].job_route)){
              var myItem = document.createElement('a');
              var myItemContent = document.createElement('div');
              myItemContent.innerHTML = "<div class='textDiv'>" + data[j].cust_name + "<br>" + data[j].job_name + "<br>" + "</div>";
              var myFrag = document.createDocumentFragment();
                myItem.className = 'item';
                myItem.id = data[j].id;
                myItem.setAttribute('data-item-date', data[j].job_date);
                myItem.setAttribute('data-item-route', data[j].job_route);
                myItem.setAttribute('href','javascript: jobDetails(' + myItem.id + ')');
                myItemContent.className = 'item-content';
                myItem.appendChild(myItemContent);
                myFrag.appendChild(myItem);
                itemContainers[i].appendChild(myFrag);
      }
    }
  }
  setGrid();
}

var modal = document.getElementById('id01');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(document).on('dblclick','.empHeader',function(){

  var modalName = 'modalContent';
  resetModal(modalName);

  $.ajax({
    type: "GET",
    url: "test.php?id=6",
    dataType: 'json',
    success: function(data){
      empDropDown(data); 
    }
  })
  
  document.getElementById('id01').style.display='block';
  var myDate = this.getAttribute('data-emp-date');
  var myRte = this.getAttribute('data-emp-route');
  document.getElementById('rte_header').innerHTML = "Route " + myRte + " <span id='pipe'>|</span> " + myDate;
  
});

function resetModal(modal){
    document.getElementById(modal).reset();  
}

function empDropDown(data){
  document.forms['empEnter'].elements['emp_Name'].options.length = 0;
  var myFrag = document.createDocumentFragment();
  for(i=0;i < data.length; i++){
    var myOption = document.createElement('option');
    myOption.innerHTML = data[i].emp_last + ", " + data[i].emp_first;
    myOption.setAttribute('value', data[i].id);
    myFrag.appendChild(myOption);
  }
  var mySelect = document.getElementById('emp_Name');
  mySelect.appendChild(myFrag);
}
function jobDetailData(data){
  document.getElementById('id02').style.display='block';
  document.getElementById('jobNumber').innerHTML = data.cust_name + "<br>" + data.job_name + "<br>" + data.job_date;
}
 
function jobDetails(data){
  var jobId = data;
  $.ajax({
    type: 'GET',
    url: "test.php?id=7&myId=" + jobId,
    data: {
      id: 7,
      myId: jobId
    },
    dataType: 'json',
    success: function(data){
        jobDetailData(data);
    }
  });
}


