const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const pdfMerger = require('pdf-merger-js');

var merger = new pdfMerger();
const myA = ["John Doe", "12", "29th Feb 2000", "Male", "ABC", "DEF", "+1-999999999", "parent@gmail.com", "#ABC, 123 LANE, QWERTY"];
const myB = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."]
const myarr = [myA, myB];
const separator  = ["!a!"];

fs.readFile('lsh_form.html', 'utf-8', function (err, data){
    try{
        //makePdf(data, "examplepdf.pdf");
        var content = data;
        var myfile;
        var submyfile = [];

        for(k=0; k<separator.length; k++){
            myfile = content.split("\n");
            submyfile = [];
            var i, j;
            console.log(myfile.length);
            for(i=0; i<myfile.length; i++){
                submyfile.push(myfile[i].split(separator[k].toString()));
                //console.log(submyfile[i]);
            }
            j=0;
            for(i=0; i<submyfile.length; i++){
                if(submyfile[i].length===2 && submyfile[i][0].includes("td")){
                    submyfile[i].splice(1, 0, myarr[k][j]);
                    submyfile[i] = submyfile[i].join("");
                    j++;
                }
                if(submyfile[i][0].includes("input")){
                    submyfile[i][0] = submyfile[i][0].replace(">", " checked>");
                    console.log(submyfile[i][0]);
                }
            }
            submyfile = submyfile.join("\n");
            content = submyfile.toString();
        }
        
        // for(i=0; i<submyfile.length; i++){
        //     console.log("-->"+submyfile[i]+"<--");
        // }
        var htmlContent = submyfile.toString();
        makePdf(htmlContent, "1.pdf");

        // (async()=>{
        //     await merger.add('mypdf.pdf');
        //     await merger.add('examplepdf.pdf');
        //     await merger.save('merged.pdf');
        // })();

    } catch(err) {
        console.log("FILE READ ERROR: ", err);
    }
});

async function makePdf(htmlContent, filename){
    try{

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        //console.log(htmlContent);
        await page.setContent(htmlContent);
        await page.emulateMediaType('screen');
        await page.pdf({
            path: filename,
            format: 'A4',
            printBackground: true,
        });

        console.log("PDF GENERATION DONE");
        await browser.close();
        process.exit();
    
    } catch(e) {
        console.log("PDF GENERATION ERROR: ", e);
        process.exit();
    }
}