jquery.imgFit.js
======================
## DEMO
<http://devjam.github.com/jquery.imgFit.js/>

---

画像の縦横比率を崩さず指定範囲内に拡大縮小するだけの簡単なプラグイン

### REQUIRE:
jquery.js

> ### PARAMETERS:
>     area:null(null=$(this).parent())
>     maxWidth: null
>     maxHeight: null
>     minWidth: null
>     minHeight: null
>     align:"center" ["left", "center", "right"]
>     valign:"middle" ["top", "middle", "bottom"]
>     autoResize: true
> 
> 
> ### USAGE:
>     $("img.fit").imgFit();


---


## METHOD:

### resize
Forcibly resize

> #### PARAMETERS:
> null
> 
> 
> ### USAGE:
>     $("img.fit").imgFit.resize();
