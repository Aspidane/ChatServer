"use strict";
// Online version Sep/12 
    
var max_valor_msg=300;
var max_valor_username=15;
 
//Client's username. Will be updated when they connect to the server.
var username="0";
 
//Array of users currently connected
var users = [];

//Array of chat rooms
var chatrooms=[];
 
//Connect to the server via socket.io    --WARNING-- REMOVE 'http://localhost' if it goes to the online version
//var socket = io('http://localhost');
var socket = io();

var btnadd_me = document.getElementById('add_me');   
var tabs = [];
var tab_total_count = 0;

/*****************************************************/
// Anchorme.js 0.6.0 (min function) License: The MIT License (MIT) - Copyright (c) 2016 Alex Corvi
!function(e){"use strict";String.prototype.endsWith||(String.prototype.endsWith=function(e,t){var i=this.toString();("number"!=typeof t||!isFinite(t)||Math.floor(t)!==t||t>i.length)&&(t=i.length),t-=e.length;var n=i.indexOf(e,t);return-1!==n&&n===t}),String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return t=t||0,this.substr(t,e.length)===e});var t={};t.occurrences=function(e,t,i){if(e+="",t+="",t.length<=0)return e.length+1;for(var n=0,r=0,a=i?1:t.length;;){if(r=e.indexOf(t,r),!(r>=0))break;n++,r+=a}return n},t.dontbreakHTML=function(e){for(var t=["src","href","cite","formaction","icon","manifest","poster","codebase","background","profile","usemap"],i=t.length;i--;){var n=[t[i]+'=" ',t[i]+"=' "],r=[t[i]+'="',t[i]+"='"];e=e.split(n[0]).join(r[0]),e=e.split(n[1]).join(r[1])}return e},t.removeCharifItEndsWithIt=function(e,i){return e.endsWith(i)?(e=e.substring(0,e.length-1),t.removeCharifItEndsWithIt(e,i)):e},t.TLDs=[".com",".org",".edu",".gov",".uk",".net",".ca",".de",".jp",".fr",".au",".us",".ru",".ch",".it",".nl",".se",".no",".es",".io",".aero",".mil",".biz",".cat",".coop",".info",".jobs",".mobi",".museum",".name",".pro",".travel",".ac",".ad",".ae",".af",".ag",".ai",".al",".am",".an",".ao",".ap",".aq",".ar",".as",".at",".aw",".az",".ax",".ba",".bb",".bd",".be",".bf",".bg",".bh",".bi",".bj",".bm",".bn",".bo",".br",".bs",".bt",".bv",".bw",".by",".bz",".cc",".cd",".cf",".cg",".ci",".ck",".cl",".cm",".cn",".co",".cr",".cs",".cu",".cv",".cx",".cy",".cz",".dj",".dk",".dm",".do",".dz",".ec",".ee",".eg",".eh",".er",".et",".eu",".fi",".fj",".fk",".fm",".fo",".ga",".gb",".gd",".ge",".gf",".gg",".gh",".gi",".gl",".gm",".gn",".gp",".gq",".gr",".gs",".gt",".gu",".gw",".gy",".hk",".hm",".hn",".hr",".ht",".hu",".id",".ie",".il",".im",".in",".io",".iq",".ir",".is",".je",".jm",".jo",".ke",".kg",".kh",".ki",".km",".kn",".kp",".kr",".kw",".ky",".kz",".la",".lb",".lc",".li",".lk",".lr",".ls",".lt",".lu",".lv",".ly",".ma",".mc",".md",".mg",".mh",".mk",".ml",".mm",".mn",".mo",".mp",".mq",".mr",".ms",".mt",".mu",".mv",".mw",".mx",".my",".mz",".na",".nc",".ne",".nf",".ng",".ni",".np",".nr",".nu",".nz",".om",".pa",".pe",".pf",".pg",".ph",".pk",".pl",".pm",".pn",".pr",".ps",".pt",".pw",".py",".qa",".re",".ro",".rw",".sa",".sb",".sc",".sd",".sg",".sh",".si",".sj",".sk",".sl",".sm",".sn",".so",".sr",".st",".sv",".sy",".sz",".tc",".td",".tf",".tg",".th",".tj",".tk",".tl",".tm",".tn",".to",".tp",".tr",".tt",".tv",".tw",".tz",".ua",".ug",".um",".uy",".uz",".va",".vc",".ve",".vg",".vi",".vn",".vu",".wf",".ws",".ye",".yt",".yu",".za",".zm",".zw",".guru",".berlin",".photography",".tips",".today",".email",".technology",".company",".clothing",".me",".asia",".abb",".academy",".active",".actor",".ads",".adult",".afl",".agency",".aig",".airforce",".alsace",".amsterdam",".android",".apartments",".app",".aquarelle",".archi",".army",".associates",".attorney",".auction",".audio",".auto",".autos",".axa",".azure",".band",".bank",".bar",".barcelona",".barclays",".bargains",".bauhaus",".bayern",".bbc",".bbva",".bcn",".beer",".bentley",".best",".bharti",".bible",".bid",".bike",".bing",".bingo",".bio",".black",".blackfriday",".bloomberg",".blue",".bmw",".bnl",".bnpparibas",".boats",".bond",".boo",".boutique",".bradesco",".bridgestone",".broker",".brother",".brussels",".budapest",".build",".builders",".business",".buzz",".bzh",".cab",".cafe",".cal",".camera",".camp",".canon",".capetown",".capital",".caravan",".cards",".care",".career",".careers",".cars",".cartier",".casa",".cash",".casino",".catering",".cba",".cbn",".center",".ceo",".cern",".cfa",".cfd",".channel",".chat",".cheap",".chloe",".christmas",".chrome",".church",".cisco",".citic",".city",".claims",".cleaning",".click",".clinic",".cloud",".club",".coach",".codes",".coffee",".college",".cologne",".community",".computer",".condos",".construction",".consulting",".contractors",".cooking",".cool",".corsica",".country",".coupons",".courses",".credit",".creditcard",".cricket",".crown",".crs",".cruises",".cuisinella",".cw",".cymru",".cyou",".dabur",".dad",".dance",".date",".dating",".datsun",".day",".dclk",".deals",".degree",".delivery",".delta",".democrat",".dental",".dentist",".desi",".design",".dev",".diamonds",".diet",".digital",".direct",".directory",".discount",".dnp",".docs",".dog",".doha",".domains",".doosan",".download",".drive",".durban",".dvag",".earth",".eat",".education",".emerck",".energy",".engineer",".engineering",".enterprises",".epson",".equipment",".erni",".esq",".estate",".eus",".events",".everbank",".exchange",".expert",".exposed",".express",".fail",".faith",".fan",".fans",".farm",".fashion",".feedback",".film",".finance",".financial",".firmdale",".fish",".fishing",".fit",".fitness",".flights",".florist",".flowers",".flsmidth",".fly",".foo",".football",".forex",".forsale",".forum",".foundation",".frl",".frogans",".fund",".furniture",".futbol",".fyi",".gal",".gallery",".game",".garden",".gbiz",".gdn",".gent",".genting",".ggee",".gift",".gifts",".gives",".glass",".gle",".global",".globo",".gmail",".gmo",".gmx",".gold",".goldpoint",".golf",".goo",".goog",".google",".gop",".graphics",".gratis",".green",".gripe",".guge",".guide",".guitars",".hamburg",".hangout",".haus",".healthcare",".help",".here",".hermes",".hiphop",".hitachi",".hiv",".hockey",".holdings",".holiday",".homedepot",".homes",".honda",".horse",".host",".hosting",".hoteles",".hotmail",".house",".how",".hsbc",".ibm",".icbc",".icu",".ifm",".iinet",".immo",".immobilien",".industries",".infiniti",".ing",".ink",".institute",".insure",".int",".international",".investments",".irish",".ist",".istanbul",".iwc",".java",".jcb",".jetzt",".jewelry",".jlc",".jll",".joburg",".jprs",".juegos",".kaufen",".kddi",".kim",".kitchen",".kiwi",".koeln",".komatsu",".krd",".kred",".kyoto",".lacaixa",".land",".lasalle",".lat",".latrobe",".law",".lawyer",".lds",".lease",".leclerc",".legal",".lgbt",".liaison",".lidl",".life",".lighting",".limited",".limo",".link",".live",".loan",".loans",".lol",".london",".lotte",".lotto",".love",".ltda",".lupin",".luxe",".luxury",".madrid",".maif",".maison",".management",".mango",".market",".marketing",".markets",".marriott",".mba",".media",".meet",".melbourne",".meme",".memorial",".men",".menu",".miami",".microsoft",".mini",".mma",".moda",".moe",".monash",".money",".montblanc",".mormon",".mortgage",".moscow",".motorcycles",".mov",".movie",".movistar",".mtn",".mtpc",".nadex",".nagoya",".navy",".nec",".netbank",".network",".neustar",".new",".news",".nexus",".ngo",".nhk",".nico",".ninja",".nissan",".nra",".nrw",".ntt",".nyc",".office",".okinawa",".omega",".one",".ong",".onl",".online",".ooo",".oracle",".orange",".organic",".osaka",".otsuka",".ovh",".page",".panerai",".paris",".partners",".parts",".party",".pharmacy",".philips",".photo",".photos",".physio",".piaget",".pics",".pictet",".pictures",".pink",".pizza",".place",".play",".plumbing",".plus",".pohl",".poker",".porn",".post",".praxi",".press",".prod",".productions",".prof",".properties",".property",".pub",".qpon",".quebec",".racing",".realtor",".realty",".recipes",".red",".redstone",".rehab",".reise",".reisen",".reit",".ren",".rent",".rentals",".repair",".report",".republican",".rest",".restaurant",".review",".reviews",".rich",".ricoh",".rio",".rip",".rocks",".rodeo",".rs",".rsvp",".ruhr",".run",".ryukyu",".saarland",".sakura",".sale",".samsung",".sandvik",".sap",".sarl",".saxo",".sca",".scb",".school",".schule",".schwarz",".science",".seat",".sener",".services",".sew",".sex",".sexy",".shiksha",".shoes",".show",".shriram",".singles",".site",".ski",".sky",".skype",".sncf",".soccer",".social",".software",".sohu",".solar",".solutions",".sony",".soy",".space",".spiegel",".spreadbetting",".starhub",".statoil",".studio",".study",".style",".su",".sucks",".supplies",".supply",".support",".surf",".surgery",".suzuki",".swatch",".swiss",".sx",".sydney",".systems",".taipei",".tatar",".tattoo",".tax",".taxi",".team",".tech",".tel",".telefonica",".temasek",".tennis",".thd",".theater",".tickets",".tienda",".tires",".tirol",".tokyo",".tools",".top",".toray",".toshiba",".tours",".town",".toys",".trade",".trading",".training",".trust",".tui",".ubs",".university",".uno",".uol",".vacations",".vegas",".ventures",".versicherung",".vet",".viajes",".video",".villas",".vision",".vista",".vistaprint",".vlaanderen",".vodka",".vote",".voting",".voto",".voyage",".wales",".walter",".wang",".watch",".webcam",".website",".wed",".wedding",".weir",".wien",".wiki",".win",".windows",".wme",".work",".works",".world",".wtc",".wtf",".xbox",".xerox",".xin",".xxx",".xyz",".yandex",".youtube",".zip",".zone",".zuerich"],t.checks={},t.checks.ip=function(e){if(t.occurrences(e,".")>2){var i=e.split("."),n=i[0],r=i[1],a=i[2];if(i[3].indexOf(":")>0)var s=i[3].indexOf(":"),o=i[3].substring(0,s),l=i[3].substring(s);else if(i[3].indexOf("/")>0)var c=i[3].indexOf("/"),o=i[3].substring(0,c),l=i[3].substring(c);else var o=i[3],l=!1;return(l===!1||"/"===l.charAt(0)||":"===l.charAt(0))&&!isNaN(n)&&!isNaN(r)&&!isNaN(a)&&!isNaN(o)&&254>=n-1&&254>=r-1&&254>=a-1&&254>=o-1&&n.length>0&&r.length>0&&a.length>0&&o.length>0?!0:!1}return!1},t.checks.email=function(e,i){if(e=e.toLowerCase(),1==t.occurrences(e,"@")){e=t.removeCharifItEndsWithIt(e,"."),e=t.removeCharifItEndsWithIt(e,","),e=t.removeCharifItEndsWithIt(e,";");for(var n=e.indexOf("@"),r=e.substring(0,n),a=e.substring(n+1,e.length),s=!0,o=0;o<r.length;o++){var l=r[o];-1==="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-/=?^_`{|}~.".indexOf(l)&&(o=r.length,s=!1)}for(var o=0;o<a.length;o++){var c=a[o];-1==="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.:".indexOf(c)&&(o=a.length,s=!1)}if(s){for(var d=!1,o=0;i>o;o++){var u=t.TLDs[o];e.endsWith(u)&&(o=t.TLDs.length,d=!0)}return d===!0?!0:!1}return!1}return!1},t.checks.url=function(e,i){if(e=e.toLowerCase(),e.indexOf(".")>0&&(e.indexOf("/")>3||e.indexOf("/")<0)){if(e=t.removeCharifItEndsWithIt(e,"."),e=t.removeCharifItEndsWithIt(e,","),e=t.removeCharifItEndsWithIt(e,";"),1==t.occurrences(e,".")&&e.indexOf(".")===e.length-1)return!1;var n=!0;if(e.indexOf("/")>3){var r=e.indexOf("/"),a=e.substring(0,r);if(a.indexOf("..")>-1)return!1;for(var s=0;s<a.length;s++){var o=a[s];-1==="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.:".indexOf(o)&&(s=a.length,n=!1)}}else{if(e.indexOf("..")>-1)return!1;for(var s=0;s<e.length;s++){var o=e[s];-1==="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.:".indexOf(o)&&(s=e.length,n=!1)}}if(n){if(e.endsWith(".com"))return!0;for(var s=0;i>s;s++){var l=t.TLDs[s];if(e.endsWith(l)||e.indexOf(l+"/")>-1||e.indexOf(l+":")>-1)return s=t.TLDs.length,!0}return!1}return!1}return!1},t.order=function(e,i){var n=e.split(" "),r=function(e){for(var t=0;t<e.length;t++)!(e[t].indexOf(".")>-1&&""!==e[t])||"("===e[t-1]&&")"===e[t+1]||"("!==e[t+1]&&")"!==e[t+1]||(e[t]=e[t]+e[t+1],"string"==typeof e[t+2]&&(e[t]=e[t]+e[t+2]),"string"==typeof e[t+3]&&(e[t]=e[t]+e[t+3]),"string"==typeof e[t+4]&&(e[t]=e[t]+e[t+4]),e.splice(t+1,4),r(e))},a=function(e){for(var t=0;t<e.length;t++)!(e[t].indexOf(".")>-1&&""!==e[t])||"["===e[t-1]&&"]"===e[t+1]||"["!==e[t+1]&&"]"!==e[t+1]||(e[t]=e[t]+e[t+1],"string"==typeof e[t+2]&&(e[t]=e[t]+e[t+2]),"string"==typeof e[t+3]&&(e[t]=e[t]+e[t+3]),"string"==typeof e[t+4]&&(e[t]=e[t]+e[t+4]),e.splice(t+1,4),r(e))};r(n),a(n);for(var s=0;s<n.length;s++){for(var o=!1,l=s;l>0&&(">"!==n[l]||"/a"!==n[l-1]||"<"!==n[l-2]);l--)if("a"===n[l]&&"<"===n[l-1]){o=!0;break}if(!o){var c=n[s],d=!1,u=!1;if(c.indexOf(".")>-1){for(var f=!0,h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=%",g=0;g<c.length;g++){var m=c[g];-1===h.indexOf(m)&&(g=c.length,f=!1)}if(f&&(i.urls&&(c.startsWith("http://")||c.startsWith("HTTP://"))?d=!0:i.urls&&(c.startsWith("https://")||c.startsWith("HTTPS://"))?d=!0:i.urls&&(c.startsWith("ftp://")||c.startsWith("FTP://"))?d=!0:i.urls&&(c.startsWith("file:///")||c.startsWith("FILE:///"))?d=!0:i.emails&&(c.startsWith("mailto:")||c.startsWith("MAILTO:"))?d=!0:t.checks.ip(c)&&i.ips&&c.indexOf(".")>0?(d=!0,u=i.defaultProtocol):t.checks.email(c,i.TLDs)&&i.emails&&c.indexOf(".")>-1&&c.indexOf("@")>-1?(d=!0,u="mailto:"):t.checks.url(c,i.TLDs)&&i.urls&&(d=!0,u=i.defaultProtocol),d)){var p=u?u+c:c;p=t.removeCharifItEndsWithIt(p,"."),p=t.removeCharifItEndsWithIt(p,","),p=t.removeCharifItEndsWithIt(p,";");var b=i.truncate<=1?c:c.substring(0,i.truncate)+"...";if(i.attributes){n[s]="<a href='"+p+"'";for(var v in i.attributes)n[s]=n[s]+" "+v+"='"+i.attributes[v]+"' ";n[s]=n[s]+">"+b+"</a>"}else n[s]="<a href='"+p+"'>"+b+"</a>"}}}}return n.join(" ")},t.js=function(e,i){"object"!=typeof i?i={attributes:!1,html:!0,ips:!0,emails:!0,urls:!0,TLDs:20,truncate:0,defaultProtocol:"http://"}:("object"!=typeof i.attributes&&(i.attributes=!1),"boolean"!=typeof i.html&&(i.html=!0),"boolean"!=typeof i.ips&&(i.ips=!0),"boolean"!=typeof i.emails&&(i.emails=!0),"boolean"!=typeof i.urls&&(i.urls=!0),"number"!=typeof i.TLDs&&(i.TLDs=20),"string"!=typeof i.defaultProtocol&&(i.defaultProtocol="http://"),"number"!=typeof i.truncate&&(i.truncate=0)),i.html&&(e.indexOf("</a>")>-1||e.indexOf("<img ")>-1||e.indexOf("<blockquote ")>-1||e.indexOf("<del ")>-1||e.indexOf("<iframe ")>-1||e.indexOf("<script  ")>-1||e.indexOf("<audio ")>-1||e.indexOf("<button ")>-1||e.indexOf("<command ")>-1||e.indexOf("<embed ")>-1||e.indexOf("<html ")>-1||e.indexOf("<video ")>-1||e.indexOf("<applet ")>-1||e.indexOf("<area ")>-1||e.indexOf("<base ")>-1||e.indexOf("<body ")>-1||e.indexOf("<frame ")>-1||e.indexOf("<head ")>-1||e.indexOf("<usemap ")>-1||e.indexOf("<link ")>-1||e.indexOf("<input ")>-1||e.indexOf("<source ")>-1||e.indexOf("<q ")>-1)&&(e=t.dontbreakHTML(e)),e=e.split("\n").join(" \n "),e=e.split("(").join(" ( "),e=e.split(")").join(" ) "),e=e.split("[").join(" [ "),e=e.split("]").join(" ] "),e=e.split("<").join(" < "),e=e.split(">").join(" > ");var n=t.order(e,i);return n=n.split(" \n ").join("\n"),n=n.split(" ( ").join("("),n=n.split(" ) ").join(")"),n=n.split(" [ ").join("["),n=n.split(" ] ").join("]"),n=n.split(" < ").join("<"),n=n.split(" > ").join(">")},"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=t),exports.anchorme=t):"function"==typeof define&&define.amd?define("anchorme",[],function(){return t}):e.anchorme=t}("object"==typeof window?window:this);

/*****************************************************/
socket.on('welcome', function (data) {
	console.log(data);
	username=data["name"]; //Get the default name from the server
	//Add the name to the username box
	document.getElementById("WuserID").innerHTML="Welcome "+username+"!";
	//Add user to general chat (creating the tab)
	add_me_chatroom("General");
    
	//Add the users already online to the list of online users
	//This will include the newly connected user
	users=data["others"];
    chatrooms=data["rooms"]
    //Load the rooms
    refresh_rooms();
    
	console.log("users: "+users);
    console.log("\nNumber of tabs: "+tabs.length);
    for(var i=0;i<tabs.length;i++){
   	 console.log("\ntabs["+i+"]:");
   	 console.log("Name: "+tabs[i].tab_name);
   	 console.log("ID: "+tabs[i].id_name);
    }
});
 
/*****************************************************/
socket.on('messageFromServer', function (data) {
	console.log("Received: "+JSON.stringify(data) );
	//Get what type of message it is
	var typeReceived=data["type"]; //data.type or data["type"] will give the type property of the object called data
	//0 is a normal message
	if("0"==typeReceived){
    	//Get the contents, the sender, and the room it should be posted to
    	var received=data["message"];
    	var sender=data["sender"];
        var room=data["room"];
    	//Add the message to the chat
    	write_in_chat(typeReceived,sender,received,room);
	//1 is the response to the user trying to update their username   	 
	} else if("1"==typeReceived){
    	//variable to hold the attempt's result (true==success, false==failure)
    	var changed=data["result"];
    	//If it returned "no", report it to the user
    	if("no"==changed){
        	//Explanation of what went wrong
        	var reason=data["reason"];
        	alert("Error: "+reason);
    	} else if("yes"==changed){
        	//Update the username box
        	username=data["updatedName"];
        	document.getElementById("WuserID").innerHTML="Welcome "+data["updatedName"]+ "!";
        	document.getElementById("userid").value="";
        	//refreshUsers(); //The server will send out a message telling the client to do this
    	}
	//2 is the response for a new user
	} else if("2"==typeReceived){
    	console.log("New user");
    	//Store the name in a variable
    	var newUser=data["name"];
    	//Append the new user
    	users.push(newUser);
    	console.log("users: "+users);
    	//Note that the user has connected
    	write_in_chat(typeReceived,newUser,"","");
    	//Refresh the list of users online
    	refreshUsers();
	//3 is the response is a user leaves
	} else if("3"==typeReceived){
    	//Get the username that left
    	var exUser=data["user"];
    	console.log("Deleting user "+exUser);
    	console.log("Users: "+users);
    	//Search for the name of the user that left
    	for(var i=0;i<users.length;i++){
        	//If it matches, we remove it
        	if(exUser==users[i]){
            	users.splice(i,1);	 
            	refreshUsers();
            	//And exit the loop
            	break;
        	}
    	}
	//4 is the reponse if a user changes their name
	} else if("4"==typeReceived){
    	//Get the old and new names
    	var oldName=data["oldName"];
    	var newName=data["newName"];
    	//Search for the username that was updated
    	for(var i=0;i<users.length;i++){
        	//When it is found
        	if(oldName==users[i]){	 
            	//Update it
            	users[i]=newName;
            	//Refresh the online user list
            	refreshUsers();
            	write_in_chat(typeReceived,oldName,newName,"");
            	break; //And exit the loop
        	}    
    	}
 	//If none of the above, respond that it's an unrecognized command
 	} else {
    	socket.emit("ERROR: unrecognized command: "+typeReceived);
 	}
});
/*****************************************************/
socket.on('newPrivateMessage', function (data) {
	//type "5" private msg
	var typeReceived="5";
	//alert(data["sender"]+", "+data["recipient"]+", "+data["message"]);
	write_in_chat(typeReceived,data["sender"],data["recipient"],data["message"]);   
	console.log("New private message");
	console.log(data["sender"]+" sent this user ("+data["recipient"]+") the following message: "+data["message"]);
});
/*****************************************************/
//Refreshes the list of users online
function refreshUsers(){
    
	var userBox=document.getElementById("onlineUsers");
	//Clear out the list
	userBox.innerHTML="";
	//Iterate through the list of users and add them one by one
	for(var i=0;i<users.length;i++){
    	var temp_name= "option_user_container"+i;
    	//creating the container
    	var main_container = document.createElement("div");
        	main_container.setAttribute("class","user_container");
    	var main_user_on = document.createElement("div");  // this is the "button"
        	//main_user_on.setAttribute("id","id_user_on"+i);   
        	main_user_on.setAttribute("class","user_on");  
        	main_user_on.setAttribute("onclick","user_on_click('"+temp_name+"')");  
        	var name_user = document.createTextNode(users[i]);
        	main_user_on.appendChild(name_user);
    	//appending the user_on to the main_container
    	main_container.appendChild(main_user_on);
   	 
    	var main_option_user_container = document.createElement("div");
        	main_option_user_container.setAttribute("class","option_user_container");   
        	main_option_user_container.setAttribute("id",temp_name);    	 
    	//appending the options to the option_user_container
   	 //Do not add the pm or ignore options if this is the current user
    	if(users[i]!=username){
   		 var option1 = document.createElement("div");
        	option1.setAttribute("id","p_msg_"+i);
        	//option1.setAttribute("class","my_p_msg");
        	option1.setAttribute("onclick","btn_add_me_Click('"+users[i]+"')");   
        	var text_option_1 = document.createTextNode('Send priv. msg'+i);
        	option1.appendChild(text_option_1);
   	 
   		 var option2 = document.createElement("div");
        	//option2.setAttribute("id","p_msg_"+i);
        	//option2.setAttribute("class","my_p_msg");
   		 //option2.setAttribute("onclick","btn_add_me_Click('"+users[i]+"')");   
   		 var text_option_2 = document.createTextNode('Ignore');
        	option2.appendChild(text_option_2);       	 
   		 main_option_user_container.appendChild(option1);
   		 main_option_user_container.appendChild(option2);
   		 //appending the option_user_container to the main_container
   	 }   	 
    	main_container.appendChild(main_option_user_container);   
    	//appending the main_container with all the stuff inside
    	userBox.appendChild(main_container);
    	userBox.innerHTML += "<br />";   	 
	}
    console.log("Users refreshed!");
};
/*****************************************************/
//Refreshes the list of public chat rooms
function refresh_rooms(){
    //Get the space where we'll display the chat rooms
    var chatList=document.getElementById("chatrooms");
    
    console.log("Refreshing chatrooms");
    console.log("chatrooms:"+chatrooms);
    
    //Clear out the current list
    chatList.innerHTML="Chat-Rooms";
    
    //For each chatroom, we'll create a menu
    for(var i=0;i<chatrooms.length;i++){
        var room_container = document.createElement("div");
        room_container.setAttribute("id","join_chat"+i);
        room_container.setAttribute("class","my_chatroom");
        room_container.setAttribute("onclick","add_me_chatroom('"+chatrooms[i]+"')");  
        var room_text = document.createTextNode(chatrooms[i]);
    	room_container.appendChild(room_text);        
    	chatList.appendChild(room_container);
    	chatList.innerHTML += "<br />";   	 
	}//for
}
/*****************************************************/    
function user_on_click(element_id) {
    	// this part remove all the "show" from any older click
    	var t0 = document.getElementsByClassName("option_user_container");
   	 //Removed to avoid pop up when user clicks on their own name
    	//if(t0.length==0) alert(t0.length);
    	for (var i = 0; i < t0.length; i++) {
        	var t1 = t0[i];
        	t1.classList.remove('show');    
    	}  
	document.getElementById(element_id).classList.add("show");  // it was a toggle, but it didnt work propperly
}
/*****************************************************/
function chat_on_click(element_id) {
    //console.log("chat_on_click called with "+element_id);
    // this part remove all the "show" from any older click
    var t0 = document.getElementsByClassName("option_chat_container");
    //Goes through and removes the "show" class
    for (var i = 0; i < t0.length; i++) {
   	 var t1 = t0[i];
   	 t1.classList.remove('show');    
    }  
	document.getElementById(element_id).classList.add("show");  // it was a toggle, but it didnt work propperly
}
/*****************************************************/
// Close the menu if the user clicks outside of it
window.onclick = function(event) {
    //Variable to hold the menu elements
    var dropdowns;
	if (!event.target.matches('.user_on')) { //this is when I click outside any user_on to make dissapear the little menu
    	dropdowns = document.getElementsByClassName("option_user_container");
    	//if(dropdowns.length==0) alert(dropdowns.length);
   	 
    	for (var i = 0; i < dropdowns.length; i++) {
        	var open_my_p_msg = dropdowns[i];
        	var temp1 = open_my_p_msg.classList.item(0);
        	if (open_my_p_msg.classList.contains('show')) {
            	open_my_p_msg.classList.remove('show');
        	}
    	}
	}
    //Hide the chatroom menu if they didn't click a chatroom
    //If it's not a chatroom
    if (!event.target.matches('.chat_on')) {
   	 //Get the list of chatroom options
   	 dropdowns = document.getElementsByClassName("option_chat_container");
    	//if(dropdowns.length==0) alert(dropdowns.length);
   	 
   	 //For each item in the menu
    	for (var i = 0; i < dropdowns.length; i++) {
        	//If it contains the "show" class
   		 if (dropdowns[i].classList.contains('show')) {
   			 //Remove it (i.e. hide it)
            	dropdowns[i].classList.remove('show');
        	}
    	}
    }
}  
/*****************************************************/
//Sends a chat message to the server
function sendMessage(){
	//Get the message from the input box
	var input=document.getElementById("userMessage");
	var textLength = input.value.length;
    var room="";
    
    //alert(input.value);	 
	if (input.value!= null && input.value != "" ){
    	var tab_id="";    
    	for(var i=0;i<tabs.length;i++){    
        	if (tabs[i].tab_status== true){
            	tab_id= tabs[i].id_name;
            	break;
        	}
    	}
    	if(tab_id!=""){     	 
        	//getting the name of the tab
        	for(var i=0;i<tabs.length;i++){    
            	if (tabs[i].id_name == tab_id ){
                	var tab_name= tabs[i].tab_name;
                	break;
            	}
        	}
    	}    

        if(tab_name!=null){
        	var recipient=finding_name(tab_name);
   			 
            //Flag for whther or not a tab is a room
            var room_flag=false;
   			 
            //Check to see if it is a room
            for(var i=0;i<chatrooms.length;i++){
                //If we have a match
                if(tab_name==chatrooms[i]){
                    room=chatrooms[i];   					 
                    //Set the flag
                    room_flag=true;
                    break; //And break out of the loop
                }
            }
   			 
        	//if is a private message
            if(!room_flag){
                console.log("sending pm: "+ellipse(input.value, max_valor_msg));   	 
                socket.emit("newPrivateMessage", {message:ellipse(input.value, max_valor_msg), user:recipient});
                //WARNING am I cheating???
                write_in_chat("6",recipient,username,ellipse(input.value, max_valor_msg));
                //If it is a chat room
            } else {
                console.log("sending "+input.value+" to "+room);
                //Send it to the server as a message
                socket.emit("messageToServer", {message:ellipse(input.value, max_valor_msg), room:room});  
            }
    	}
	}
	//Clear out the text
	input.value="";
}
/*****************************************************/
//Sends the server an updated username
function updateName(){
	var input=document.getElementById("userid");
	var textLength = input.value.length;
	if (input.value!= null && input.value != "" ){
    	if(textLength>max_valor_username){
        	alert("Error: Name exceeds " + max_valor_username + " characters long");
        	input.value=input.value.substring(0,max_valor_username);
    	}else{
        	//Display what we're sending to the log
        	console.log("New name "+input.value);
        	//Send our emssage to the server
        	socket.emit("newName", {updatedName:input.value});   
    	}
	}
}
/*****************************************************/
function ellipse(str, max){
	return str.length > (max - 3) ? str.substring(0,max-3) + '...' : str;
}
/*****************************************************/   
function finding_name(my_str) {
	var the_user_name="";
	var pos = my_str.indexOf("_");
	if ( my_str.substring(0,pos)==username){
    	the_user_name=my_str.substring(pos+1,my_str.length);
	}else{
    	the_user_name=my_str.substring(0,pos);   	 
	}
	return the_user_name;
}
/*****************************************************/   
function finding_tab_byname(the_tab_name){
	var pos = -1;
	for(var i=0;i<tabs.length;i++){    
    	if(the_tab_name==chatrooms[i]){
        	if (tabs[i].tab_name == the_tab_name){
            	pos=i;
            	break;
        	}	 
   	 }else if (finding_name(tabs[i].tab_name) == the_tab_name && the_tab_name!=username){
            	pos=i;
            	break;
    	}
    }
	return pos;
}
/*****************************************************/   
function refreshing_modal(i){
	//alert(tabs[i]);
	if(tabs[i]!=null){
    	var chatbox=document.getElementById("myModal"); //chatbox is the <p>   
    	chatbox.innerHTML= tabs[i].tab_log;
    	chatbox.scrollTop = chatbox.scrollHeight; //Scroll to the bottom    
	}
}
/*****************************************************/   
function write_in_chat(type,msg1,msg2,msg3){
	//So here we must to feed the logs and refresh the chatbox depening of the actual tab kind
	// and find where (which tab) put the message, and wich tab refresh (actual tab)
	if(type=="0"){ //message by user
    	//could be on general or could be on private  msg
    	var tab_i= finding_tab_byname(msg3);
    	//alert(msg1 +" "+tab_i);       	 
    	if(tab_i>=0){
            // using anchorme.js("text who might contains links") to make it clickable
        	tabs[tab_i].tab_log += "<br /><span class='userMsg'><span class='username'>"+msg1+":</span>  "+anchorme.js(msg2)+"</span>";
        	if (tabs[tab_i].tab_status== true){
            	refreshing_modal(tab_i);
        	} else {
   			 document.getElementById(tabs[tab_i].id_name).classList.add("newMsg");
   		 }
    	}
	}else if(type=="4"){ // system msg: user changed name
        console.log("Changed name\n");
    	var tab_i= finding_tab_byname("General");
    	if(tab_i>=0){ // updating general log
        	tabs[tab_i].tab_log += "<br /><span class='systemMsg'>"+msg1+" has changed their name to "+msg2+"</span>";
        	if (tabs[tab_i].tab_status== true){
            	refreshing_modal(tab_i);
        	}
    	}
    	var tab_i= finding_tab_byname(msg1);
        console.log("tab_i: "+tab_i);
    	if(tab_i>=0){ //updating private msg log
   		 tabs[tab_i].tab_log += "<br /><span class='systemMsg'>"+msg1+" has changed their name to "+msg2+"</span>";
   		 if (tabs[tab_i].tab_status== true){
   			 refreshing_modal(tab_i);
   		 } else {
   			 document.getElementById(tabs[tab_i].id_name).classList.add("newMsg");
   		 }   		 
        	//and refresh the new name on the tab name as well
        	tabs[tab_i].tab_name=tabs[tab_i].tab_name.replace(msg1,msg2);
        	var refreshed_tab= document.getElementById(tabs[tab_i].id_name).innerHTML;
   		 var replacing_nametab= refreshed_tab.replace(msg1,msg2);
        	document.getElementById(tabs[tab_i].id_name).innerHTML= replacing_nametab;
   		 //Get the tab's ID number (e.g. Tab_2 will return 2)
   		 var id=tabs[tab_i].id_name.substr(4);
   		 //And add the destroy functionality back to it
   		 var closing_x = document.getElementById("Cls_"+id);
   		 //Add the onclick listener with destroy_me_Click
   		 closing_x.addEventListener('click', destroy_me_Click);  
    	}
	}else if(type=="2"){ // system msg: new user connected
    	var tab_i= finding_tab_byname("General");
    	if(tab_i>=0){
        	tabs[tab_i].tab_log +=  "<br /><span class='systemMsg'>"+msg1+" has connected.</span>";
        	if (tabs[tab_i].tab_status== true){
            	refreshing_modal(tab_i);
        	}
    	}    
	}else if(type=="5"){ // system msg: private msg
    	//write_in_chat(typeReceived,data["sender"],data["recipient"],data["message"]);  	 
    	//must find the sender and the tab, if it doesnt exist must create it
   	 
    	var tab_i= finding_tab_byname(msg1);
    	//alert(msg1 +" "+tab_i);   	 
    	if(tab_i>=0){ //updating private msg log
        	tabs[tab_i].tab_log += "<br /><span class='userMsg'><span class='username'>"+msg1+":</span>  "+anchorme.js(msg3)+"</span>";
        	if (tabs[tab_i].tab_status== true){
            	refreshing_modal(tab_i);
        	} else {
   			 document.getElementById(tabs[tab_i].id_name).classList.add("newMsg");
   		 }
    	}else{ //creating the new tab for priv. msg
        	btn_add_me_Click(msg1);
        	tab_i= finding_tab_byname(msg1);
        	//alert(msg1 +" "+tab_i);
        	tabs[tab_i].tab_log += "<br /><span class='userMsg'><span class='username'>"+msg1+":</span>  "+anchorme.js(msg3)+"</span>";
        	if (tabs[tab_i].tab_status== true){
            	refreshing_modal(tab_i);
        	}
    	}   	 
	}else if(type=="6"){
    	var tab_i= finding_tab_byname(msg1);
    	//alert(msg2 +" "+tab_i);
    	tabs[tab_i].tab_log += "<br /><span class='userMsg'><span class='username'>"+msg2+":</span>  "+anchorme.js(msg3)+"</span>";
    	refreshing_modal(tab_i);   	 
	}    
}

/*****************************************************/  	 
function testing(event){
	socket.emit("newChatRoom", {name:"testRoom", users:username});
}
/*****************************************************/
function destroy_me_Click(event) {
    //with this i get the id name of the X object im clicking
	var my_id=this.getAttribute("id");
	//alert (my_id);
	var temp_tabs=[];
	//with this for i get the info from the tabs manager  
	for(var i=0;i<tabs.length;i++){   	 
   	 //When it is found
    	if(my_id==tabs[i].clsx_name){  
        	var a_tab = document.getElementById(tabs[i].id_name);
        	var the_tab_holder = document.getElementById("tab_holder");    	 
        	//alert(my_id +", " + tabs[i].id_name);
        	if(the_tab_holder.childElementCount > 0){
                	//with this we remove the event "on click" just before the tab deleting
                	a_tab.removeAttribute("onclick","dialog_on_click('"+tabs[i].id_name+"')");             	 
            	the_tab_holder.removeChild(a_tab);
        	}
        	//now i must delete the info from the tabs
        	tabs.splice(i,1);
            //Now set the focus on the next tab
            //Swap to one to the right or to the left most if none are to the right
            //Start by making sure there are tabs left
            if(tabs.length>0){
                //Case where we deleted the right most tab
                if(tabs.length==i){
                    //Swap the tab to the left
                    dialog_on_click(tabs[i-1].id_name);
                    //Case where we did not delete the right most tab
                } else {
                    //Swap to the next tab
                    dialog_on_click(tabs[i].id_name);
                }
            //If there are no tabs left, clear the chat area
            } else {
                //Get the chat area
                var chatArea=document.getElementById("myModal");
                //Remove the conversation history
                chatArea.innerHTML="";
            }
        	break; //And exit the loop
        }    
    }    	 
}
/*****************************************************/  	 
function add_me_chatroom(chat_name){
	//alert(chat_name);
	//First check that this chatroom doesn't already have a tab
	//If not, create a tab
	var flag_tab = false;
	for(var i=0;i<tabs.length;i++){    
    	if (tabs[i].tab_name== chat_name){
        	var old_tab_id_name = tabs[i].id_name;
        	//alert("already exists");
        	flag_tab = true;
   		 console.log("Tab found");
        	break;
    	}
	}
	if (!flag_tab){
    	//if we do, we just focus the required tab
    	tab_total_count+=1;
    	var new_tab = {
        	tab_name : chat_name,
        	id_name : "Tab_"+tab_total_count,
        	clsx_name: "Cls_"+tab_total_count,
        	tab_log : "WELCOME to -MY CHAT- American Server! :)<br />",
        	tab_status : true
    	};
   	 //Join the chatroom
   	 socket.emit("newChatRoom", {room:chat_name, user:username});
   	 
   	 console.log("Joining chat room");
   	 
    	tabs.push(new_tab);

    	var the_tab_holder = document.getElementById("tab_holder");

    	var tab = document.createElement("aside");
    	//this text should change to a user2 name (the user that is actually talking to you)
   	 var text_id_tab = document.createTextNode(chat_name);
   	 tab.appendChild(text_id_tab);
    	tab.setAttribute("id",new_tab.id_name);
    	tab.setAttribute("class","mytab");
    	tab.setAttribute("onclick","dialog_on_click('"+new_tab.id_name+"')");  
   	 
    	the_tab_holder.appendChild(tab);
   	 
    	var closing_x = document.createElement("span");
    	var text_symbol_close = document.createTextNode('x');
    	closing_x.appendChild(text_symbol_close);
    	closing_x.setAttribute("class","close-x");
    	closing_x.setAttribute("id",new_tab.clsx_name);
    	tab.appendChild(closing_x);
    	closing_x.addEventListener('click', destroy_me_Click);  
   	 
    	dialog_on_click(new_tab.id_name); // adds the focus to the lastest created (or just the new one)
	}else{
    	dialog_on_click(old_tab_id_name); // adds the focus to the tab that has the user we want to talk and was created before
	}
}
/*****************************************************/  	 
function btn_add_me_Click(the_user_name){
	//alert(the_user_name);
	//first we must check that we dont have a priv. msg (or prev tab)
	//with this person, if we dont, we created a tab and everything
	var flag_tab = false;
	for(var i=0;i<tabs.length;i++){    
    	if (tabs[i].tab_name== username+"_"+the_user_name){
        	var old_tab_id_name = tabs[i].id_name;
        	//alert("already exists");
        	flag_tab = true;
        	break;
    	}
	}
	if (!flag_tab){
    	//if we do, we just focus the required tab
    	tab_total_count+=1;
    	var new_tab = {
        	tab_name : username+"_"+the_user_name,
        	id_name : "Tab_"+tab_total_count,
        	clsx_name: "Cls_"+tab_total_count,
        	tab_log : "",
        	tab_status : false
    	};
    	tabs.push(new_tab);

    	var the_tab_holder = document.getElementById("tab_holder");

    	var tab = document.createElement("aside");
    	// this text should change to a user2 name (the user that actually is talking to you)  	 
        	var text_id_tab = document.createTextNode(the_user_name);
        	tab.appendChild(text_id_tab);
    	tab.setAttribute("id",new_tab.id_name);
    	tab.setAttribute("class","mytab");
    	tab.setAttribute("onclick","dialog_on_click('"+new_tab.id_name+"')");  
   	 
    	the_tab_holder.appendChild(tab);
    	//<!--	<span  class="close-x" onclick="destroy_me_Click()"></span> -->
    	var closing_x = document.createElement("span");
    	var text_symbol_close = document.createTextNode('x');
    	closing_x.appendChild(text_symbol_close);
    	closing_x.setAttribute("class","close-x");
    	closing_x.setAttribute("id",new_tab.clsx_name);
    	tab.appendChild(closing_x);
    	closing_x.addEventListener('click', destroy_me_Click);  
   	 
    	document.getElementById(new_tab.id_name).focus;

    	dialog_on_click(new_tab.id_name); // adds the focus to the lastest created (or just the new one)
	}else{
    	dialog_on_click(old_tab_id_name); // adds the focus to the tab that has the user we want to talk and was created before
	}
}    
/*****************************************************/    
function dialog_on_click(tab_id){

	//alert(tab_id);
    	var temp_list = document.getElementsByClassName("mytab"); // New List with all tabs
    	for(var k=0; k< temp_list.length; k++){  //starting to check all the tabs
        	var temp = temp_list[k];
        	var t3= temp.getAttribute("id"); // a tab
        	if (temp.classList.contains('mytab2') && tab_id!=t3) {
            	temp.classList.remove('mytab2');
        	}   	 
    	}    
	if (document.getElementById(tab_id)!=null){
    	//alert("aqui-> "+tab_id);
    	document.getElementById(tab_id).classList.add("mytab2");
    	for(var i=0;i<tabs.length;i++){    
        	if (tabs[i].id_name== tab_id){
            	tabs[i].tab_status = true;
   			 //If the tab contains had a newMsg notification
   			 //Remove it when it is clicked upon selecting it
   			 var current_tab=document.getElementById(tab_id);
   			 //If it has the newMsg class
   			 if (current_tab.classList.contains('newMsg')) {
   				 //Remove it
   				 current_tab.classList.remove('newMsg');
   			 }
            	refreshing_modal(i);           	 
        	}else{
            	tabs[i].tab_status = false;
        	}    
    	}    	 
	}
}
/*****************************************************/    
//Asks the server to join a chat room
function join_chatroom(){
//Sends a message to the server to add a user to a chatroom
    var my_id=this.getAttribute("id");
    
    //Get everything after the first letter
    var chatName=my_id.substring(1);
    
    //If we aren't already part of the chat
    if(-1==finding_tab_byname(chatName) ){
   	 //send a request to the server to join it
   	 socket.emit("newChatRoom", {name:chatName, password:""});
   	 
    }
}
/*****************************************************/
