// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
var Sessionapp = {};
Sessionapp.Charts = {};
Sessionapp.ChartData = {};
current_node_id="801_jb";
function split_data(){
  children=[];
  jbClc={"id": Sessionapp.ChartData["infovis"].id,
        "name" : Sessionapp.ChartData["infovis"].name,
        "children":[],
        "data":Sessionapp.ChartData["infovis"].data}
  
  $.each(Sessionapp.ChartData["infovis"].children, function(index, value) {
      child={"id":value.id,
             "name":value.name,
             "data":value.data,
             "children":[]}
      children_1 = [];
      children_1[0] = jbClc;
      $.each(value.children, function(idx, val) {
          child_1={"id": val.id,
            "name" : val.name,
            "children":val.children,//todo
            "data":val.data}
          children_1_1=[];
            $.each(val.children,function(i,v){
              child_1_1 = {"id": v.id,
                    "name" : v.name,
                    "children":[],
                    "data":v.data}
              children_1_1[i] = child_1_1;
            });
            Sessionapp.ChartData[val.id]={
              "id":val.id,
              "name" : val.name,
            "children":children_1_1,
            "data":val.data};
          children_1[idx+1]=child_1;
      });
      Sessionapp.ChartData[value.id]={
        "id":value.id,
        "name" : value.name,
      "children":children_1,
      "data":value.data};
      children[index] = child;
    });
    Sessionapp.ChartData["801_jb"]={"id": Sessionapp.ChartData["infovis"].id,
      "name" : Sessionapp.ChartData["infovis"].name,
      "children":children,
      "data":Sessionapp.ChartData["infovis"].data}
      
}

Sessionapp.showPanel = function () {
w = 600;
h= 600;
split_data();

  var ht = new $jit.Hypertree({  
    //id of the visualization container  
    injectInto: 'infovis',  
    //canvas width and height  
    width: w,  
    height: h,  
    levelsToShow : 2,
    //Change node and edge styles such as  
    //color, width and dimensions.  
    Node: {  
        //dim: 40,  
        //color: "#f00",
        overridable: true,
          type: 'star',
          color: '#ccb',
          lineWidth: 1,
          height: 5,
          width: 5,
          dim: 40,
          transform: true    
    },  
    Edge: {  
        lineWidth: 2,  
        color: "#088"  ,
        overridable: false,
          type: 'hyperline',
        //  color: '#ccb',
          //lineWidth: 1
    },
    duration: 700,
    fps: 30,
    //transition: Trans.Quart.easeInOut,
    clearCanvas: true,
    withLabels: true,  
    onBeforePlotNode:function(node) {
        
        if(node.selected) {  
          //node.setData('color', '#f00');  
        } else {  
          //node.setData('color','#ccb');  
        }  
    },
    onBeforeCompute: function(node){  
    },  
    //Attach event handlers and add text to the  
    //labels. This method is only triggered on label  
    //creation  
    onCreateLabel: function(domElement, node){  
        domElement.innerHTML = node.name;  
        

        $jit.util.addEvent(domElement, 'click', function () {  
          
        
            ht.onClick(node.id, {  
                onComplete: function() {  
                    ht.controller.onComplete();  
                }  
            });  
        });  
    },  
    //Change node styles when labels are placed  
    //or moved.  
    onPlaceLabel: function(domElement, node){  
        var style = domElement.style;  
        style.display = '';  
        style.cursor = 'pointer';  
        if (node._depth <= 1) {  
            style.fontSize = "1em";  
            style.color = "#1a1a1a";
        } else if(node._depth == 2){ 
            style.fontSize = "0.8em";  
            style.color = "#555";  
    
        } else {  
            style.display = 'none';  
        }  
    
        var left = parseInt(style.left);  
        var w = domElement.offsetWidth;  
        style.left = (left - w / 2) + 'px';  
    },  
      
    onComplete: function(){  
          
        //Build the right column relations list.  
        //This is done by collecting the information (stored in the data property)   
        //for all the nodes adjacent to the centered node.  
        var node = ht.graph.getClosestNodeToOrigin("current");  
        var html = "<h4>" + node.name + "</h4><b>Connections:</b>";  
        html += "<ul>";  
        node.eachAdjacency(function(adj){  
            var child = adj.nodeTo;  
            if (child.data) {  
                var rel = (child.data.band == node.name) ? child.data.relation : node.data.relation;  
                html += "<li>" + child.name + " " + "<div class=\"relation\">(relation: " + rel + ")</div></li>";  
                
            }
            
        });  
        html += "</ul>";  
        //$jit.id('inner-details').innerHTML = html;  
        
        current_node_id = node.id;
        if (node.data.subdomain != 'city'){
          url = '/auth/'+node.data.subdomain;
          //$(location).attr('href',url);
          document.location.replace(url);
        }
        else
        {
          ht.loadJSON(Sessionapp.ChartData[current_node_id], 1);  
          ht.refresh(); 
        }
          
    }  
  }
  );  
  //load JSON data.  
  
  ht.loadJSON(Sessionapp.ChartData[current_node_id], 1);  
  //compute positions and plot.  
  ht.refresh(); 
 }
