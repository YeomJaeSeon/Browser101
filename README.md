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

### DOM에대한 전반적인 그림
내가 만든 HTML파일을 브라우저가 읽을 때 ! 브라우저도 하나의 실행되는 어플리케이션 이므로 브라우저가 이해할수 있는 형태로 바뀌어야한다.  
내가 만든 HTML파일을 읽을때 HTML TAG는 JavaScript의 Node오브젝트로 변환이 된다.  
Node 오브젝트는 EventTarget오브젝트를 상속받고 Document, Element, Text .. 등의 오브젝트는 Node 오브젝트를 상속받는다. 그리고 HTMLElement, SVGElement는 Element 오브젝트를 상속받는다. 그리고 HTMLDivElement, HTMLButtonElement, HTMLInputElement 오브젝트들은 HTMLElement오브젝트를 상속받는다.  
즉, HTML파일을 브라우저가 읽을 때 HTML TAG가 해당 태그에 맞는 요소(ex. HTMLDivElement)로 변환될때의 상속 관계를 나타낸다.  
다시한번더 말하면 div태그가 브라우저가 읽어 HTMLDivElement 오브젝트로 변환되고 이 HTMLDivElement오브젝트는 EventTarget 클래스를 상속받기 때문에 HTMLDivElement오브젝트는 이벤트를 발생시킬수있다. (사실 모든 태그가 EventTarget클래스를 상속받으므로 이벤트 발생시킬수있어. 상속관계에서 가장 상위에 존재하잖아.)  
지금까지 한말은 하나의 HTML 태그가 브라우저가 이해할수있는 형태인 오브젝트로 바뀌었을때 해당 오브젝트의 상속 관계를 말한 것이다.  
그렇다면 실제로 내가 만든 HTML파일은 어떻게 브라우저가 읽는 것일까?  
위에서 살짝 얘기했지만 하나의 html 태그에 맞물리는 브라우저가 이해할수있는 오브젝트가 있다고 했다.  
모든 html 태그는 브라우저가 이해할수있는 형태로 변할 때 자신과 맞물리는 오브젝트(요소)가 존재하고 브라우저는 HTML파일을 위에서부터 한줄, 한줄 Parsing해나가며 해당 태그에 맞는 오브젝트로 변환한다.  
이렇게 변환하다보면 HTML파일을 모두 Parsing했을 때 모든 태그들이 오브젝트로 변해있고 각 오브젝트들은 나무형태로 존재한다.  
즉, 내가 만든 HTML파일을 브라우저는 오브젝트들로 구성된 하나의 큰 나무로 변환했다.  
이 하나의 큰 나무가 DOM TREE이다.  
정리하면 내가만든 HTML파일을 브라우저는 자신이 이해할수있는 오브젝트 형태로 바꾸는 데 바꾼 결과가 DOM TREE이다.  
이 DOM TREE로 브라우저는 웹페이지상에 우리에게 보여주는 것이다.  
우리가 만든 html, css, JavaScript로 파일은 브라우저 위에서 Window(브라우저의 전체적인 창), DOM(Document ... ), BOM(WEb apis .. ex)setTimeout, navigator, fetch, ..), JavaScript로써 존재하게 되는 것이다.  
여기서 DOM은 트리형태로 DOM TREE형태로 존재하게 되는 것이고 "브라우저가 DOM을 읽는다"라는 표현은 내가 만든 HTML파일을 브라우저가 DOM TREE형태로 변환한다는 말과 같다.  
Document와 DOM TREE의 차이는?  
Document는 DOM TREE의 진입점이다.  
Document는 내가 만든 문서(웹페이지)자체에 대한 전반적인 기능을 담고있는 오브젝트이다.  
Document오브젝트를 통해서 DOM TREE의 각요소에 접근한다.  
