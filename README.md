# Browser101

## Web apis basic

### APIS
api란?  
복잡한 기능에 대한 걸 간단하게 사용할수 있게 제공하는 프로그래밍언어의 구성!  
크게 Web apis, external apis로 구분가능  
그렇다고 내가 만든 코드가 api가 아니란게 아니다!  
내가 만든 로그인 구현 코드로 사용자가 로그인할수있다. -> 로그인 구현한 함수도 API이다.  

### Browser의 구성
우리가 Html Css Javascript완성하고 웹페이지로 볼때 브라우저의 구성은?  
브라우저 전체 정보를 가지고있는 window라는 글로벌한 오브젝트와, 내가 작성한 html코드인 document객체, 그리고 사용자에겐 안보이지만 브라우저의 정보를 담고있는 navigator 객체가 있다.  
즉, Html, css, Javascript를 완성하고 서버한테 해당 페이지를 응답받으면  
Window - (DOM, BOM ,JavaScript) ...  
로 브라우저는 구성된다.!  
DOM, BOM은 모델일뿐 오브젝트가아니다. 전부 window 오브젝트이지만 분류를 위해서 두 모델로 분류한 것이다.  
DOM : Document Object Model(document 오브젝트.. )   
BOM : Browser Object Model(setTimeout, fetch, setInterval, navigator등의 web apis)  
위의 두 모델이 가지고있는 프로퍼티, 메소드는 전부 window오브젝트의 프로퍼티 메소드이다. 그냥 DOM, BOM으로 분류만 해놓은것.  
브라우저 위에서 동작하는 JavaScript를 사용할때 그래서! window오브젝트의 apis를 사용할수있는것이다.(DOM의 document, BOM의 navigator, settimeout ..  - 결국 모두 window 오브젝트의 프로퍼티와 메소드임은 잊지말자)  
```
document.querySelector('.className') ~  
fetch('~').then(~) ..  
setTimeout(()=>{~}, ~);  
모두 사용한 경험이 있다. 이는 JS가 window의 프로퍼티 메소드를 사용할수 있기 떄문인 것!  
```

+ window는 글로벌 오브젝트로 document도 window.document이고 alert("~")도 window.alert("~")인 것이다.  
즉, 콘솔창에서 console.log(this)하면 window 객체가 나올것이다.  

### Web APIS 
브라우저에서 제공하는 APIS.. 이는 브라우저 위에서 동작하는 JavsScript를 사용할때 JavaScript에서는 window의 오브젝트들, 즉 DOM의 document, BOM의 webapis들을 사용할수있다.  
그러므로 JS에서 BOM의 web apis를 사용할수있다.(BOM : Browser Object Model로 브라우저에서 제공하는 web apis를 가지고있다.)  

### JS에서 다양한 web apis사용
        ```
        screenWidth.innerHTML = `${window.screen.width}`;  
        screenHeight.innerHTML = `${window.screen.height}`;  
        outerWidth.innerHTML = `${window.outerWidth}`;  
        outerHeight.innerHTML = `${window.outerHeight}`;  
        innerWidth.innerHTML = `${window.innerWidth}`;  
        innerHeight.innerHTML = `${window.innerHeight}`;  
        documentWidth.innerHTML = `${document.documentElement.clientWidth}`;  
        documentHeight.innerHTML = `${document.documentElement.clientHeight}`;  
        window.scrollTo(~);  
        window.scrollBy(~);  
        ```
