window.onload = pageLoad;

function pageLoad() {
	var form = document.getElementById("Myform");
 	form.onsubmit = validateForm;
}

function validateForm() {
    var pass = document.getElementById("ps");
    var cfpass = document.getElementById("cps");
    
    if (pass.value != cfpass.value)
    {
        alert('รหัสผ่านไม่ตรงกัน, โปรดลองอีกครั้ง');
    }
}