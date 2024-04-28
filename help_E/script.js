/*top_btn_st*/
function chimg(layerName){
	document.getElementById(layerName).style.backgroundImage="url(img/BtnContentsRo.png)";
	document.getElementById(layerName+'_num').style.color="#0099CC";
	document.getElementById(layerName+'_tx').style.color="#0099CC";
}
function bkimg(layerName){
	document.getElementById(layerName).style.backgroundImage="url(img/BtnContents.png)";
	document.getElementById(layerName+'_num').style.color="#333333";
	document.getElementById(layerName+'_tx').style.color="#333333";
}
function jump(url){
	parent.location.href = url;
}
/*top_btn_ed*/

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}



function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

var lang_map=
{
  en:'start_ukv.html', // english
  ja:'start_jp.html', // japanese
  de:'start_noe.html', // german
  fr:'start_fra.html', // french
  es:'start_esp.html', // spanish
  it:'start_ita.html', // italian
  nl:'start_hol.html', // dutch
  au:'start_aus.html' // australia
}

/*
#define SC_PRODUCT_AREA_JPN            0     // Japan
#define SC_PRODUCT_AREA_USA            1     // North America
#define SC_PRODUCT_AREA_EUR            2     // Europe
*/

var getLangCode=function()
{
  var language=navigator.browserLanguage.slice(0,2);
  var country=opera.system.getSystemPreference('tv-user-language').toLowerCase();
  switch (country)
  {
    case 'au':
    case 'nz': // new zealand
    {
      return 'au';
    }
  }
  return language;
}

var getHelpPath=function()
{
  var region=opera.system.getSystemPreference('tv-user-region');
  var language=getLangCode();
  var pathStart='help_';
  switch (region)
  {
    case '0':
    {
      switch(language)
      {
        default:
        {
          return pathStart+'J/'+lang_map['ja'];
        }
      }
      break;
    }
    case '1':
    {
      switch(language)
      {
        case 'en':
        case 'fr':
        case 'es':
        {
          return pathStart+'A/'+lang_map[language];
        }
        default:
        {
          return pathStart+'A/'+lang_map['en'];
        }
      }
      break;
    }
    case '2':
    {
      switch(language)
      {
        case 'en':
        case 'de':
        case 'fr':
        case 'es':
        case 'it':
        case 'nl':
        case 'au':
        {
          return pathStart+'E/'+lang_map[language];
        }
        default:
        {
          return pathStart+'E/'+lang_map['en'];
        }
      }
      break;
    }
  }
}

var __hoverElement=null;
var __documentId=parseInt(location.href.split('?')[1]);
var __reStartpage=new RegExp('start_[a-z]{2,3}\\.html')
var __isStartpage=function()
{
  return __reStartpage.test(location.href)
}

var sendMessage=function(string)
{
  if(opera.htmldialog)
  {
    opera.htmldialog(document, __documentId, "tv-menu-to-chrome", string);
  }
}
sendMessage("setState:help");
document.addEventListener
(
  'click',
  function(event)
  {
    event.preventDefault();
    event.stopPropagation();
    var ele=event.target, handler=null, re=new RegExp("jump\\((\"|')(.*)?(\"|')"), match=null;
    while(ele)
    {
      if(handler=(ele.getAttribute('href') || ele.onclick))
      {
        handler=handler.toString();
        if((handler.indexOf('function')>-1) && (match=re.exec(handler)))
        {
          handler=match[2]
        }
        break;
      };
      ele=ele.parentElement;
    }
    if(handler)
    {
      opera.htmldialog(document, __documentId, "tv-remote-sound", "DECIDE","1");
      opera.htmldialog(document, __documentId, "tv-remote-sound", "DECIDE_TV","0");
      if(/^ {0,2}https?:\/\//.test(handler))
      { 
        sendMessage('setState:Default');
        opera.htmldialog(document, __documentId, "tv-open-url", handler);
        window.close();
      }
      else
      {
        opera.htmldialog(document, __documentId, "tv-chrome-url", location.href.replace(/\/[^/]*$/, '/')+handler);
      }
    }
  },
  true
)
var onMenuEvent=function(event)
{
  var message=event.message.split(':'), type=message[0], data=message[1];
  switch(type)
  {
    case 'forwardAction':
      
      switch(data)
      {
        case 'close':
        {
          var pos = opera.system.getSystemPreference("history-pos");
          if(pos>0)
          {
            sendMessage("setState:Default");
            window.close();
          }
          else
          {
            opera.htmldialog(document, parseInt(location.href.split('?')[1]), "tv-chrome-url", "startpage/startpage.html");
          }
          break;
        }

        case 'home':
        {
          sendMessage("enableChrome");
          opera.htmldialog(document, __documentId, "tv-chrome-url", getHelpPath());
          break;
        }
      }
      break
  }
}

document.addEventListener
(
  'load',
  function()
  {
    if(__isStartpage())
    {
      sendMessage('enableChrome');
      document.addEventListener
      (
        'mouseover',
        function(event)
        {
          var ele=event.target;
          while(ele)
          {
            if(ele.onmouseover) break;
            ele=ele.parentElement;
          }
          if(ele && ele!=__hoverElement)
          {
            __hoverElement=ele;
            opera.htmldialog(document, __documentId, "tv-rumble", "0");
            opera.htmldialog(document, __documentId, "tv-remote-sound", "ROLLOVER","1");
            opera.htmldialog(document, __documentId, "tv-remote-sound", "ROLLOVER_TV","0");
          }
          if(!ele)
          {
            __hoverElement = null;
          }
        },
        false
      )
    }
    else
    {
      sendMessage('enableHome');
    }
    if(innerHeight>500)
    {
      if(document.body.scrollHeight>500)
      {
        document.body.style.paddingBottom=(parseInt((document.body.currentStyle.paddingBottom))+100)+'px';
      }
    }
    else
    {
      if(document.body.scrollHeight>375)
      {
        document.body.style.paddingBottom=(parseInt((document.body.currentStyle.paddingBottom))+75)+'px';
      }
    }
    opera.htmldialog(document, __documentId, "tv-rendering-mode", "none");
  },
  false
)

document.addEventListener('MenuEvent', onMenuEvent, false);
