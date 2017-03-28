
/*****************************
* add HTML code for a RAM
******************************/
function addRam(ram_id)
{
      console.log("=======> addRam =====");  
      var main_div = document.getElementById("main_id");
           //<table style="width: 808px; height: 212px;" border="1" id="RAM_EC12345">
           var ram_table = document.createElement("table");
               ram_table.setAttribute("style", "width: 808px; height: 212px;");
               ram_table.setAttribute("id", ram_id);
               ram_table.setAttribute("border", "1");
             //<tbody>
             var tbody = document.createElement("tbody");
                 
//ROW1
             //<tr>
             var tr_1 = document.createElement("tr");
             //<td style="width: 800px;" rowspan="5" id="td_canvas">
             var td_canvas = document.createElement("td");  
                 td_canvas.setAttribute("style","width: 800px;"); 
                 td_canvas.setAttribute("id","td_canvas");
                 td_canvas.setAttribute("rowspan","5");
                 
            //<canvas id="canvas_RAM_EC12345" width="800" height="200"></canvas><br><br>
            var ram_canvas = document.createElement("canvas"); 
                ram_canvas.setAttribute("id","canvas_"+ram_id);
                ram_canvas.setAttribute("width","800px");
                ram_canvas.setAttribute("height","200px");


             //<td style="width: 406px;" colspan="3" id="td_ram_name" align="center"> RAM_EC12345 - 34,5C</td>
             var td_title = document.createElement("td");
                 td_title.setAttribute("width","406px");
                 td_title.setAttribute("colspan","3");
                 td_title.setAttribute("id","td_ram_name");
                 td_title.setAttribute("align","center");
                 td_title.innerHTML = ram_id;
//ROW2  X           
             //<tr> 
             var tr_2 = document.createElement("tr");
             //<td style="width: 10px;">X</td>
             var td_x = document.createElement("td");
                 td_x.setAttribute("style","10px");
                 td_x.innerHTML = "X";
             //<td style="width: 198px;">
             var td_setX = document.createElement("td");
                 td_setX.setAttribute("style","width: 198px");
             //<input type="number" name="setX" size="6" id="RAM_1234_setX">
             var td_setX_input = document.createElement("input");
                 td_setX_input.setAttribute("type","number");
                 td_setX_input.setAttribute("name","setX");
                 td_setX_input.setAttribute("size","6");
                 td_setX_input.setAttribute("id",ram_id + "_setX");
             //<td style="width: 198px;">
             var td_valueX = document.createElement("td");
                 td_valueX.setAttribute("style","width: 198px;");                 
             //<input type="number" name="valX" readonly>
             var td_viewX_input = document.createElement("input");
                 td_viewX_input.setAttribute("type", "number");
                 td_viewX_input.setAttribute("name", "valX");
                 td_viewX_input.setAttribute("readonly", "true");

//ROW3  Y           
             //<tr> 
             var tr_3 = document.createElement("tr");
             //<td style="width: 10px;">Y</td>
             var td_y = document.createElement("td");
                 td_y.setAttribute("style","10px");
                 td_y.innerHTML = "Y";
             //<td style="width: 198px;">
             var td_setY = document.createElement("td");
                 td_setY.setAttribute("style","width: 198px");
             //<input type="number" name="setY" size="6" id="RAM_1234_setY">
             var td_setY_input = document.createElement("input");
                 td_setY_input.setAttribute("type","number");
                 td_setY_input.setAttribute("name","setY");
                 td_setY_input.setAttribute("size","6");
                 td_setY_input.setAttribute("id",ram_id + "_setY");
             //<td style="width: 198px;">
             var td_valueY = document.createElement("td");
                 td_valueY.setAttribute("style","width: 198px;");                 
             //<input type="number" name="valX" readonly>
             var td_viewY_input = document.createElement("input");
                 td_viewY_input.setAttribute("type", "number");
                 td_viewY_input.setAttribute("name", "valY");
                 td_viewY_input.setAttribute("readonly", "true");

//ROW4  Z           
             //<tr> 
             var tr_4 = document.createElement("tr");
             //<td style="width: 10px;">Z</td>
             var td_z = document.createElement("td");
                 td_z.setAttribute("style","10px");
                 td_z.innerHTML = "Z";
             //<td style="width: 198px;">
             var td_setZ = document.createElement("td");
                 td_setZ.setAttribute("style","width: 198px");
             //<input type="number" name="setZ" size="6" id="RAM_1234_setY">
             var td_setZ_input = document.createElement("input");
                 td_setZ_input.setAttribute("type","number");
                 td_setZ_input.setAttribute("name","setZ");
                 td_setZ_input.setAttribute("size","6");
                 td_setZ_input.setAttribute("id",ram_id + "_setZ");
             //<td style="width: 198px;">
             var td_valueZ = document.createElement("td");
                 td_valueZ.setAttribute("style","width: 198px;");                 
             //<input type="number" name="valX" readonly>
             var td_viewZ_input = document.createElement("input");
                 td_viewZ_input.setAttribute("type", "number");
                 td_viewZ_input.setAttribute("name", "valY");
                 td_viewZ_input.setAttribute("readonly", "true");
             
            
            //<tr>
            var tr_5 = document.createElement("tr");
            //<td style="width: 406px;" colspan="3" align="center">
            var td_submit = document.createElement("td");
                td_submit.setAttribute("style","width: 406px;");
                td_submit.setAttribute("colspan","3");
                td_submit.setAttribute("align","center");
            //<form>
            var td_submit_form = document.createElement("form");
                td_submit_form.setAttribute("action","");
                td_submit_form.setAttribute("method","post");
                td_submit_form.setAttribute("enctype","multipart/form-data");
            //<button type="submit">
            var td_submit_form_button = document.createElement("button");
                td_submit_form_button.setAttribute("type","submit");
                td_submit_form_button.setAttribute("name","apply");
                td_submit_form_button.innerHTML = "Apply"
            

            //tr1,2,3,4
            tr_1.appendChild(td_canvas); td_canvas.appendChild(ram_canvas);
            tr_1.appendChild(td_title);
            tbody.appendChild(tr_1);

            tr_2.appendChild(td_x);
            tr_2.appendChild(td_setX); 
              td_setX.appendChild(td_setX_input);
              td_setX.appendChild(td_setX_input);
            tr_2.appendChild(td_valueX);
              td_valueX.appendChild(td_viewX_input);
            tbody.appendChild(tr_2);

            tr_3.appendChild(td_y);
            tr_3.appendChild(td_setY); 
              td_setY.appendChild(td_setY_input);
              td_setY.appendChild(td_setY_input);
            tr_3.appendChild(td_valueY);
              td_valueY.appendChild(td_viewY_input);
            tbody.appendChild(tr_3);
            
            tr_4.appendChild(td_z);
            tr_4.appendChild(td_setZ); 
              td_setZ.appendChild(td_setZ_input);
              td_setZ.appendChild(td_setZ_input);
            tr_4.appendChild(td_valueZ);
              td_valueZ.appendChild(td_viewZ_input);
            tbody.appendChild(tr_4);
            
            td_submit_form.appendChild(td_submit_form_button);
            td_submit.appendChild(td_submit_form);
            tr_5.appendChild(td_submit);
            tbody.appendChild(tr_5);


            ram_table.appendChild(tbody);
            main_div.appendChild(ram_table);

         var smoothie = new SmoothieChart({
              /*grid: { strokeStyle:'rgb(125, 0, 0)', fillStyle:'rgb(60, 0, 0)', lineWidth: 1, millisPerLine: 250, verticalSections: 6, },
               labels: { fillStyle:'rgb(60, 0, 0)' },*/
               millisPerPixel:speed, /* how fast is going to be 67 */
                maxValue:32767,minValue:-32768,  timestampFormatter:SmoothieChart.timeFormatter
         });

         var axeX = new TimeSeries();
         var axeY = new TimeSeries();
         var axeZ = new TimeSeries();

         smoothie.streamTo(document.getElementById("canvas_"+ram_id), 1000 /*delay*/);
         
         smoothie.addTimeSeries(axeX, {  strokeStyle:'green', lineWidth:2}  );
         smoothie.addTimeSeries(axeY, {  strokeStyle:'red',   lineWidth:2}  );
         smoothie.addTimeSeries(axeZ, {  strokeStyle:'brown', lineWidth:2 } );
         
         var obj = new Object();
         obj.smoothie = smoothie;
         obj.axeX = axeX;
         obj.axeY = axeY;
         obj.axeZ = axeZ; 
         obj.ram_id = ram_id;

         ram_collection.push(obj);

    }//end addRAM
