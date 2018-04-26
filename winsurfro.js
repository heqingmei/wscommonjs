function use(deps,callback){
	if(deps.length === 0){ callback}
	
	var params = [];
	var depsLen = deps.length;

	for(var i=0;i<depsLen;i++){
		(function(i){
			loadMod(deps[i], function(){
				depsLen--;
				params.push(deps[i]); //i=0,1  params=["a", "b"]
				//console.log(params,deps[i]);
				if( depsLen === 0){ // null ---window
					callback.apply(null, params); //传参，类似结构赋值
				}
			})
		})(i)
	}
}

//script 注入
function loadScript(name,callback){
	var doc = document;
	var node = doc.createElement("script");
	node.src = name + ".js";
	doc.body.appendChild(node);
	node.onload = function(){
		console.log(mapMod[name])
		var param = mapMod[name].callback;
		callback(param);
	}
}

function loadMod(name, callback){
	loadScript(name, callback);
}

var mapMod = []; //mapMod对象，依托的对象 mapMod.a.callbak
function define(name, callback){
	mapMod[name] = {};
	mapMod[name].callback = callback;

	//mapMod[name].callback();
}



