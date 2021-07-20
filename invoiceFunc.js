//Adding Data To the table
var table = document.getElementById('inside-table');
const buildTable = (data,check=true)=>{
  if(check){
  table.innerHTML=""
  for(var i=0;i<10;i++){
   var rows = `
              <tr name="tableRows">
                <td><input type="checkbox" name="cb" onchange="backchange(${i})"></td>
                <td>${data[i].name_customer}</td>
                <td>${data[i].cust_number}</td>
                <td>${data[i].invoice_id}</td>
                <td>$ ${data[i].total_open_amount}</td>
                <td>${data[i].due_in_date}</td>
                <td>${data[i].Predicted_payment_date}</td>
                <td>${data[i].Notes}</td>
            </tr> `
            
             table.innerHTML+=rows
   } 
  }

  
}

const fetchTableData = ()=>{

    fetch('http://localhost:8080/Summer_Internship_Backend/FetchData')
    .then(response=>{
      return response.json()
    })
    .then(jsonResult=>{
      buildTable(jsonResult)
    })
    .catch(error =>{
      console.log(error)
    })
}

(   
  function(){
        fetchTableData()  
  }
)()



//Add Button Modal
addModal = document.querySelector(".addmodal");
addmodalBtn = document.querySelector(".btn-add");
closeAddModal= document.querySelector(".closeadd");
let timeout;


// Events
addmodalBtn.addEventListener('click', openaddModal);
closeAddModal.addEventListener('click', closeaddModal);


// Open
function openaddModal() {
    addModal.style.display = 'block';
    timeout=setInterval(validateAddModal,500);
  }

// Close
function closeaddModal() {
    addModal.style.display = 'none';
    clearInterval(timeout)
  }

var addBtn = document.getElementById('addRecord');
function validateAddModal(){

            cname = document.getElementById('customerName').value;
            cno = document.getElementById('customerNo').value;
            incno = document.getElementById('invoiceNo').value;
            incamt = document.getElementById('invoiceAmt').value;
            ddt = document.getElementById('dueDt').value;
            shortNote = document.getElementById('shortNote').value;

            var table = document.getElementsByTagName('table')[0];
            
            
            if(cname!='' && cno!='' && incno!=''&& incamt!='' && ddt!=''){
             
              addBtn.classList.remove("disableAdd")
              addBtn.disabled = false
              addBtn.style.cursor="pointer"

            }
            else{
              addBtn.classList.add("disableAdd")
              addBtn.disabled = true
              addBtn.style.cursor="normal"

            }

}

// Add Button Functionality
//addBtn = document.getElementById('addRecord');

addBtn.addEventListener('click', ()=>{

  tblen = document.querySelectorAll("#inside-table tr").length
  console.log(tblen)
  var table = document.getElementById('inside-table')
  fetch(`http://localhost:8080/Summer_Internship_Backend/add?cname=${cname}&cno=${cno}&incno=${incno}&incamt=${incamt}&ddt=${ddt}&notes=${shortNote}`,
  {
    method:'POST'
  }).then(()=>{
    fetchTableData()
    
  })                     
         
});


// Cancel Button in Add Modal
addModalCancelBtn = document.getElementById('clearAdd');

addModalCancelBtn.addEventListener('click',function clearDataAddModal(){


  document.getElementById('customerName').value="";
  document.getElementById('customerNo').value="";
  document.getElementById('invoiceNo').value="";
  document.getElementById('invoiceAmt').value="";
  document.getElementById('dueDt').value="";
  document.getElementById('shortNote').value="";



});



// Edit button Modal
editModal = document.querySelector(".editModal");
editmodalBtn = document.querySelector(".btn-edit");
closeEditModal= document.querySelector(".closeEdit");
editmodalBtn.addEventListener('click', openeditModal);
closeEditModal.addEventListener('click', closeeditModal);
// Open
function openeditModal() {
    editModal.style.display = 'block';
  }

// Close
function closeeditModal() {
    editModal.style.display = 'none';
  }

var editSelected = -1;
//Taking input and sending data to backend for edit function
editSaveBtn = document.getElementById("editSave")
editSaveBtn.addEventListener('click',()=>{
  editInvoiceAmt = document.getElementById("editIncAmt").value
  editInvoiceNote = document.getElementById("changeNotes").value

  if(editSelected!=-1){
    var tbody = document.querySelectorAll("#inside-table tr")[editSelected]
    var tdata = tbody.querySelectorAll("td")
    editcname = tdata[1].innerText;
    editcno = tdata[2].innerText;
    editincno  = tdata[3].innerText;
    editincamt = tdata[4].innerText.split("$")[1].trim();
    editddt = tdata[5].innerText;
    console.log(editcname,editcno,editincno,editincamt,editddt);
    console.log(editInvoiceAmt,editInvoiceNote)
    fetch(`http://localhost:8080/Summer_Internship_Backend/EditData?editcname=${editcname}&editcno=${editcno}&editincno=${editincno}&editincamt=${editincamt}&editddt=${editddt}&editInvoiceAmt=${editInvoiceAmt}&editInvoiceNote=${editInvoiceNote}`,
    {
      method:'POST'
    }).then(()=>{
      fetchTableData()
      
    })
    
    
  }


})


// Delete Button Modal
deleteModal = document.querySelector(".deleteModal");
deletemodalBtn = document.querySelector(".btn-delete");
closeDeleteModal= document.querySelector(".closeDelete");

deletemodalBtn.addEventListener('click', openDeleteModal);
closeDeleteModal.addEventListener('click', closedeleteModal);


// Open
function openDeleteModal() {
    deleteModal.style.display = 'block';
    
  }

// Close
function closedeleteModal() {
    deleteModal.style.display = 'none';
  }


//Delete Rows
deleteBtn = document.getElementById("deleteDelete");
deleteBtn.addEventListener('click',()=>{
  
table = document.getElementsByTagName('table');
tbody = document.querySelectorAll("#inside-table tr") 
const chkbox = document.getElementsByName('cb');
clen = chkbox.length
let ind=[]
    
for(let i=0;i<clen;i++){
    if(chkbox[i].checked==true){
      ind.push(i)
     }
    
  }

  ind.forEach(rowInd=>{
    // tbody[rowInd].remove()
    console.log(tbody[rowInd].cells[1])
  })
  
})




//All Checkbox Function
allChkBtn = document.getElementById('All');
chkbox = document.getElementsByName('cb');

function selectAll(){
  var tbody = document.querySelectorAll("#inside-table tr")
  for(let i =0;i<tbody.length;i++){
    const chbox = tbody[i].childNodes[1].childNodes[0]
    
    chbox.checked = !chbox.checked
    backchange(i)

  }
  editSelected=-1;

}

//changing backgroung color

function backchange(ind){
  
  var tbody = document.querySelectorAll("#inside-table tr")[ind] 
  console.log(tbody.childNodes[1].childNodes[0])
  const chbox = tbody.childNodes[1].childNodes[0]
    if(chbox.checked==true){
      editSelected=ind;
      tbody.style.color = "#14AFF1";
      tbody.style.fontWeight="bold";
      tbody.style.backgroundColor="#14AFF1"
    }
    if(chbox.checked==false){
      editSelected=-1;
      tbody.style.color = "#97A1A9";
      tbody.style.fontWeight="normal";
    }
    
  
}


