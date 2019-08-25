			
			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}			function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
///////////////////checkLocalStorageFunction//////////////////
				function checkLocalStorage(){
					if(localStorage.getItem("user") != null){
						document.getElementById("menulogin").style = "display:none";
						document.getElementById("menumore").style = "";
						document.getElementById("menulogout").style = "";
						var localuser = localStorage.getItem('user')
						document.getElementById('menutext').innerHTML = 'Welcome, '+ localuser + '<span class="caret"></span>' ;
					}else{
						document.getElementById("menulogin").style = "";
						document.getElementById("menumore").style = "display:none";
						document.getElementById("menulogout").style = "display:none";
					}
				}

					function random_bg_color() {  //random隨機
    			var h = Math.floor(Math.random() * 360);
    			var s = Math.floor(Math.random() * 80-10)+30;
				var l = Math.floor(Math.random() * 80-10)+30;
    			var hsl =  h + "," + s + "%," + l + "%";
 				return hsl;
		}

	function random_mode() {
		var randomnum = Math.floor(Math.random() * 8);
					switch(randomnum){
						case 0:
							var mode = "monochrome";
							return mode;
							break;
						case 1:
							var mode = "monochrome-dark";
							return mode;
							break;
						case 2:
							var mode = "monochrome-light";
							return mode;
							break;
						case 3:
							var mode = "analogic";
							return mode;
							break;
						case 4:
							var mode = "complement";
							return mode;
							break;
						case 5:
							var mode = "analogic-complement"; 
							return mode;
							break;
						case 6:
							var mode = "triad";
							return mode;
							break;
						case 7:
							var mode = "quad"; 
							return mode;
							break;
									}
									}
		///////////////////////Login///////////////	
		function loginFunction(clicked_id){
			
			var loginname=$("#loginname").val();
			var password=$("#password").val();
			if(loginname!="" & password!=""){
			var mydata="loginname="+loginname+"&password="+password;
			$.ajax({
				type: 'POST',
			url: 'http://127.0.0.1:9999/login',
			dataType:"text",
			data:mydata,
				success: function(data) { 
				if (data == "success"){
						document.getElementById("menulogin").style = "display:none";
						document.getElementById("menulogout").style = "";
						localStorage.setItem("user",loginname);
						location.href="/index.html";	
						alert("Login Success");
					} else {	
						alert("Login Fail");
				}
			}
			});
			}else{				
			alert("Please enter the email and password");
			}
		}
function logoutFunction(){
			
					document.getElementById("menulogin").style = "";
					document.getElementById("menumore").style = "display:none";
					document.getElementById("menulogout").style = "display:none";
					localStorage.clear();
	
				}