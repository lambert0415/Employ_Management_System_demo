function doSelectAll(chk){
    $(":checkbox[name=chk]").prop("checked",chk.checked);    
} 

function doDelete(btn){
    if(confirm("Make sure to delete employee information?")){
        $(btn).parent().parent().remove();
    }
    resortIndex();
}

//resort index number after delete
function resortIndex(){
    var $trList = $(".table tr");
    $trList.each(function(index, tr){
        if(index>0){
            //jqery to dom
            $(tr).children()[1].innerHTML = index;
        }
    });
}

function batchDelete(){
    if(confirm("Make sure to delete in batches?")){
        // if(checkSelectOneRow()){
            var $checkList = $(":checkbox[name=chk]:checked");
            $checkList.each(function(index,chk){
                $(chk).parent().parent().remove();
            });
            resortIndex(); 
        // }
    }
}

//check if at least one roll has been selected 
// function checkSelectOneRow(){
//     if($(":checkbox[name=chk]:checked").size() == 0){
//         alert("select rows to delete in batches");
//         return false;
//     }else{
//         return true;
//     }
// }

function inverseSelect(){
    $(":checked[name=chk]").each(function(index,chk){
        //inverse
        chk.checked = !chk.checked;
    });
}

function closeDialog(){
    $("#addNew").fadeOut(700);
}

function openDialog(){
    $("#addNew").fadeIn(700);
}

/*  check format
    insert form into last row
    delete form content when add complete
    close add window
*/
function save(){
    if(checkFormat()){
        alert("Add Complete!");
        insertRow();
        //reset form after insert (jq to dom)
        $(".addForm")[0].reset();
        closeDialog();
    }
}

function checkFormat(){
    //name
    if($("#employeeName").val() == ""){
        $("#employeeName").next("span").show();
        return false;
    }else{
        $("#employeeName").next("span").hide();
    }
    //id
    if($("#employeeId").val() == ""){
        $("#employeeId").next("span").show();
        return false;
    }else{
        $("#employeeId").next("span").hide();
    }
    //age
    var regAge = /^\d{2}$/g;
    var age = $("#employeeAge").val();
    if(age == "" || !(regAge.test(age)) ||parseInt(age) < 18 || parseInt(age) > 70 ){
        $("#employeeAge").next("span").show();
        return false;
    }else{
        $("#employeeAge").next("span").hide();
    }

    //Phone
    var tel = $("#employeeTel").val();
    var regTel = /^[278]\d{9}$/g;
    if(tel == "" || !(regTel.test(tel)) ){
        $("#employeeTel").next("span").show();
        return false;
    }else{
        $("#employeeTel").next("span").hide();
    }

    //e-mail
    var email = $("#employeeEmail").val();
    var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(email == "" || !(regEmail.test(email)) ){
        $("#employeeEmail").next("span").show();
        return false;
    }else{
        $("#employeeEmail").next("span").hide();
    }

    //department
    if($("#employeeDe").val() == ""){
        $("#employeeDe").next("span").show();
        return false;
    }else{
        $("#employeeDe").next("span").hide();
    }

    return true;
}

function insertRow(){
    var html = "<tr>";
    html += '<td><input type="checkbox" name="chk"></td>';
    html += '<td>'+ $(".table tr").length +'</td>';
    html += '<td>'+ $("#employeeId").val()+'</td>';
    html += '<td>'+ $("#employeeName").val()+'</td>';
    html += '<td>'+ $("#employeeAge").val()+'</td>';
    html += '<td>'+ $("#employeeGender").val()+'</td>';
    html += '<td>'+ $("#employeeTel").val()+'</td>';
    html += '<td>'+ $("#employeeEmail").val()+'</td>';
    html += '<td>'+ $("#employeeDe").val()+'</td>';
    html += '<td><input class="btn" type="button" value="Delete" onclick="doDelete(this)"></td>';
    html += '</tr>';

    $(".table").append(html);
}