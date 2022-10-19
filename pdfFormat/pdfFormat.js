export const pdfFormat = `<html>
<body>
    <div class="form">
        <div class="header">
            <div class="top-heading">Linguaphile Skills Hub</div>
            <div class="bottom-heading">Individual Education Plan</div>
        </div>

        <div class="line"></div>
    
        <div class="student-details">
            <div class="student-left">
            
            </div>
            <div class="student-right">
                <div class="student-details">Student Details</div>
                <table cellspacing="0">
                    <tr>
                        <td class="placeholder">Surname</td>
                        <td class="xwidth" style="padding-right: 90px">Lorem ipsum dolor sit amet</td>
                        <td rowspan=6 id="photo" class="photo-width"></td>
                    </tr>
                    <tr>
                        <td class="placeholder">Given Name(s)</td>
                        <td class="xwidth">Lorem ipsum dolor sit amet</td>
                    </tr>
                    <tr>
                        <td class="placeholder">Date of Birth</td>
                        <td class="xwidth">1st January 2000</td>
                    </tr>
                    <tr>
                        <td class="placeholder">Chronic Problems</td>
                        <td class="xwidth">No Problems</td>
                    </tr>
                    <tr>
                        <td class="placeholder">Ethnic Origin</td>
                        <td class="xwidth">Asian Hindu</td>
                    </tr>
                    <tr>
                        <td class="placeholder">Languages Spoken</td>
                        <td class="xwidth">English, Hindi</td>
                    </tr>
                    <tr>
                        <td class="placeholder">Placement Type</td>
                        <td colspan=2 class="xwidth">
                            <div class="placement-type">
                                <div>
                                    <input type="checkbox">
                                    <label>Kinship Care</label>
                                </div>
                                <div>
                                    <input type="checkbox">
                                    <label>Foster Care</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked>
                                    <label>Residential Care</label>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="placeholder">Court Orders Given</td>
                        <td colspan=2 class="xwidth">
                            <div class="placement-type">
                                <div>
                                    <input type="checkbox">
                                    <label>Yes</label>
                                </div>
                                <div>
                                    <input type="checkbox" checked>
                                    <label>No</label>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="placeholder">Current placement Address</td>
                        <td colspan=2 class="xwidth" style="padding: 20px 0px 20px 10px;">#123, XYZ street, Sector 45, Utopia</td>
                    </tr>
                </table>
            </div>
        </div>
</div>
</body>

<style>
    .header{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .top-heading{
        font-size: 32px;
        font-weight: 700;
        color:blue;
    }
    .bottom-heading{
        font-size: 22px;
        font-weight: 700;
        color: grey;
    }
    table{
        margin-left: 10px;
    }
    .line{
        width: 100%;
        height: 3px;
        margin-top: 10px;
        margin-bottom: 10px; 
        background:black;
    }
    .student-details{
        font-size: 20px;
        font-weight: 700;
        color: blue;
        margin-bottom: 15px;
        margin-left: 5px;
    }
    .xwidth{
        border: 1px solid black;
        padding: 5px 180px 5px 5px;
    }
    .photo-width{
        border: 1px solid black;
        padding: 100px 75px;
    }
    .placeholder{
        padding-right: 25px;
    }
    .placement-type{
        display: flex;
        flex-direction: row;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .placement-type>div{
        margin-right: 10px;
    }
</style>
</html>`;
