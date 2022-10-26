const puppeteer = require('puppeteer');
const fs = require('fs');
const pdfMerger = require('pdf-merger-js');
import { pdfFormat } from './pdfFormat';

var merger = new pdfMerger();
const myA = ["John Doe", "12", "29th Feb 2000", "Male", "ABC", "DEF", "+1-999999999", "parent@gmail.com", "#ABC, 123 LANE, QWERTY"];
const myB = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."]
const myarr = [myA, myB];
const separator  = ["!a!"];

function searchValue(submitData, question){
    var i, j;
    var q = submitData.questions;
    for(i=0; i<q.length; i++){
        for(j=0; j<q[i].length; j++){
            if(question===q[i][j].input){
                return q[i][j].val;
            }
        }
    }
}

export function makePDF(submitData){
        try{
            //makePdf(data, "examplepdf.pdf");
            var content = pdfFormat;
            var myfile;
            var submyfile = [];
            var k;
            console.log(content);
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
                var question;
                for(i=0; i<submyfile.length; i++){
                    if(submyfile[i][0].includes('"placeholderA"')){
                        var first = submyfile[i][0].indexOf(">");
                        var second = first;
                        while(submyfile[i][0][second]!="<"){
                            second++;
                        }
                        question = submyfile[i][0].substring(first+1, second);
                        //console.log(question);
                    }
                    if(submyfile[i].length===2 && submyfile[i][0].includes("td")){
                        submyfile[i].splice(1, 0, searchValue(submitData, question));
                        submyfile[i] = submyfile[i].join("");
                        j++;
                    }
                    if(submyfile[i][0].includes("input")){
                        submyfile[i][0] = submyfile[i][0].replace(">", " checked>");
                        //console.log(submyfile[i][0]);
                    }
                }
                submyfile = submyfile.join("\n");
                content = submyfile.toString();
            }
            
            // for(i=0; i<submyfile.length; i++){
            //     console.log("-->"+submyfile[i]+"<--");
            // }
            var htmlContent = submyfile.toString();
            //makePdf(htmlContent, "1.pdf");

            // (async()=>{
            //     await merger.add('mypdf.pdf');
            //     await merger.add('examplepdf.pdf');
            //     await merger.save('merged.pdf');
            // })();

        } catch(err) {
            console.log("FILE READ ERROR: ", err);
        }

        return makePdf(htmlContent, "1.pdf");
}

export async function makerPdf(htmlContent, filename){
    try{

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        console.log(htmlContent);
        await page.setContent(htmlContent);
        await page.emulateMediaType('screen');
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        console.log("PDF GENERATION DONE");
        await browser.close();
        //process.exit();

        return pdfBuffer;
    
    } catch(e) {
        console.log("PDF GENERATION ERROR: ", e);
        process.exit();
    }
}