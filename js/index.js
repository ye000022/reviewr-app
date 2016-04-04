var app = {
    METHOD: "POST",
    init: function(){
        document.querySelector(".btnList").addEventListener("click", app.fetchList);
        document.querySelector(".btnDtl").addEventListener("click", app.getDetail);
        document.querySelector("#save").addEventListener("click",app.upload);
        document.querySelector("#takePhoto").addEventListener("click",app.takePic);
        document.querySelector(".fab").addEventListener("click",app.navigate);
    },
    fetchList:function(ev){ 
        ev.preventDefault();
        var xhr = new XMLHttpRequest();
        var url = "https://griffis.edumedia.ca/mad9022/reviewr/reviews/get/";
        xhr.open(app.METHOD,url);
        xhr.addEventListener("load", app.gotList);
        xhr.addEventListener("error",app.badStuff);
        
        var params = new FormData();
        params.append("uuid","steve-sample");
        xhr.send( params );
    },
    gotList:function(ev){
        var data = JSON.parse (ev.target.responseText);
        if(data.code == 0){
            var msg = document.getElementById("msg");
            var ul = document.createElement("ul");
            var numReviews = data.reviews.length;
            if (numReviews > 0){
                msg.appendChild(ul);
                for(var i=0; i<numReviews; i++){
                    var li = document.createElement("li");
                    li.textContent = data.reviews[i].title + " \n" + "Rating: " +  + data.reviews[i].rating;
                    ul.appendChild(li);
                }
            }
            data.reviews.forEach(function(item,index){
                document.createAttribute("li");
                li.textContent = item.title;
                ul.appendchild(li);
            });
        }else{
            app.gotAWarning(data.code, data.message);
        }        
    },
    getDetail:function(ev){
        ev.preventDefault();
        var xhr = new XMLHttpRequest();
        var url = "https://griffis.edumedia.ca/mad9022/reviewr/review/get/";
        xhr.open(app.METHOD,url);
        xhr.addEventListener("load",app.gotReview);
        xhr.addEventListener("error",app.badStuff);
        
        var params = new FormData();
        params.append("uuid","steve-sample");
        params.append("review_id","20");
                                                                      
        xhr.send( params );
    },
    gotRivew:function(ev){
        var data = JSON.parse (ev.target.responseText);
        if(data.code == 0){
            var msg = document.getElementById("msg");
            var p = document.createElement("p");
            var num = data.review.length;
            if(num > 0){
                for(var i=0; i < num; i++){
                    p.textContent = data.review[i].title + "\n" + data.review[i].review_text + data.review[i].image ;
                }
            }
            
        }
    },
    upload: function(ev){
        ev.preventDefault();
        var xhr = XMLHttpRequest();
        var url =  "https://griffis.edumedia.ca/mad9022/reviewr/review/set/";
        xhr.open(app.METHOD,url);
        xhr.addEventListener("error",app.badStuff);
        
        var params = new FormData();
        params.append("title",document.getElementById("title").value);
        params.append("review_text",document.getElementById("detail").value);
        params.append("rating",(this.index+1));
        document.querySelector("#msg").textContent = "Sent";
        
        xhr.send(params);
    },
    takePic: function(ev){
        ev.preventDefault();
        var cameraOptions = {
            quality:50,
            encodingType: 'JPEG',
            targetWidth:300,
            sourceType:'CAMERA',
            destinationType:Camera.DestinationType.DATA_URL
        };
        navigator.camera.getPicture(app.cameraSuccess, app.cameraError, cameraOptions)
    },
    navigate:function(ev){
        ev.preventDefault();
        var url = ev.target.getAttribute("data-href");
        var activePage = document.querySelector(".active-page");
            
        history.pushState({"page":url}, null, '#'+ url);
      
        activePage.removeAttribute("class");
        document.querySelector("#" + url).setAttribute("class", "active-page");
    }
    cameraSuccess: function(imageData){
        var image = document.getElementById('myImage');
        var realData = "data:image/jpeg;base64," + imageData;
        image.src = realData;
        var encodedData = encodeURIComponent(realData);
        
        var xhr = XMLHttpRequest();
        xhr.open("POST","https://griffis.edumedia.ca/mad9022/reviewr/review/set/");
        xhr.addEventListener("load",function(ev){
            
        });
        var params = new FormData();
        params.append("name","zz");
        params.append("image",encodedData);
        
        xhr.send(params);
    },
    
    gotAWarning: function(code, msg){
        document.querySelector("#msg").textContent = "WARING" + code + "::" + msg;
        
    },
    badStuff:function(ev){
        document.querySelector('#msg').textContent = "ERROR" + ev.message;
    }
};

document.addEventListener("DOMContentLoaded", app.init);